import * as admin from 'firebase-admin';

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
            // Fallback for local development or Google Cloud environments with default credentials
            admin.initializeApp({
                credential: admin.credential.applicationDefault(),
                storageBucket: bucketName
            });
        }
    } catch (error) {
        console.error('Firebase admin initialization error', error);
    }
}

const db = admin.firestore();
export { db };

