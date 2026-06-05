import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { db } from '@/lib/firebase-admin'; // imports file to ensure initialization

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Use initialized admin storage bucket
        const bucket = admin.storage().bucket();
        
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const fileName = `listings/${timestamp}_${safeName}`;
        const fileRef = bucket.file(fileName);

        console.log(`> Uploading to bucket: ${bucket.name}, path: ${fileName}`);

        // Save the file buffer to GCS
        await fileRef.save(buffer, {
            metadata: {
                contentType: file.type,
                metadata: {
                    firebaseStorageDownloadTokens: timestamp.toString()
                }
            }
        });

        let publicUrl = '';
        try {
            // Make the GCS object public
            await fileRef.makePublic();
            publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;
            console.log(`> Upload completed: ${publicUrl}`);
        } catch (makePublicErr) {
            console.error('> Failed to make object public, attempting fallback URL:', makePublicErr);
            // Fallback public url format (using firebasestorage domain)
            publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileRef.name)}?alt=media`;
        }

        return NextResponse.json({ url: publicUrl });
    } catch (error: any) {
        console.error('> Unexpected error during cloud upload:', error);
        return NextResponse.json({ error: error.message || 'An unexpected upload error occurred.' }, { status: 500 });
    }
}
