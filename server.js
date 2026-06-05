const express = require('express');
const next = require('next');
const multer = require('multer');
const path = require('path');
const admin = require('firebase-admin');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

// Initialize Firebase Admin (matching src/lib/firebase-admin.ts)
const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'gen-lang-client-0792008363.appspot.com';

if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: bucketName
      });
    } else {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        storageBucket: bucketName
      });
    }
    console.log(`> Firebase Admin initialized successfully for custom server (bucket: ${bucketName}).`);
  } catch (error) {
    console.error('Firebase admin initialization error in custom server', error);
  }
}

// Set up Multer in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024 // 15MB file size limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed (jpeg, jpg, png, webp, gif).'));
  }
});

app.prepare().then(() => {
  const server = express();

  // Middleware for body parsing
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // API upload route using Multer and Firebase Storage GCS
  server.post('/api/upload', (req, res) => {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error('> Multer Error:', err);
        return res.status(400).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      try {
        const bucket = admin.storage().bucket();
        const timestamp = Date.now();
        const safeName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const fileName = `listings/${timestamp}_${safeName}`;
        const fileRef = bucket.file(fileName);

        console.log(`> Uploading to bucket: ${bucket.name}, path: ${fileName}`);

        const stream = fileRef.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
            metadata: {
              firebaseStorageDownloadTokens: timestamp.toString()
            }
          }
        });

        stream.on('error', (uploadErr) => {
          console.error('> Firebase GCS upload error:', uploadErr);
          res.status(500).json({ error: 'Failed to upload to cloud storage.' });
        });

        stream.on('finish', async () => {
          try {
            // Make the GCS object public so it can be viewed directly
            await fileRef.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;
            console.log(`> Upload completed: ${publicUrl}`);
            res.status(200).json({ url: publicUrl });
          } catch (makePublicErr) {
            console.error('> Failed to make object public, attempting fallback URL:', makePublicErr);
            // Fallback public url format (sometimes makePublic fails if permissions are restricted, but Firebase SDK can still fetch it)
            const fallbackUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileRef.name)}?alt=media`;
            res.status(200).json({ url: fallbackUrl });
          }
        });

        stream.end(req.file.buffer);
      } catch (uploadException) {
        console.error('> Unexpected error during cloud upload:', uploadException);
        res.status(500).json({ error: 'An unexpected upload error occurred.' });
      }
    });
  });

  // Handle all other routes using Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
