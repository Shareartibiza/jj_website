import * as admin from 'firebase-admin';
import { properties, lifestyleItems } from '../data/listings';

// To run this script:
// 1. Ensure you have FIREBASE_SERVICE_ACCOUNT environment variable set
// 2. Run: npx ts-node src/scripts/migrate-to-firestore.ts

if (!admin.apps.length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } else {
        console.warn('FIREBASE_SERVICE_ACCOUNT not found, attempting to use application default credentials.');
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        });
    }
}

const db = admin.firestore();

async function migrate() {
    console.log('--- Starting Firestore Migration ---');

    // Migrate properties
    console.log(`\nMigrating ${properties.length} properties...`);
    for (const item of properties) {
        const { id: _, ...data } = item;
        // Using original ID to maintain consistency
        await db.collection('properties').doc(item.id).set({
            ...data,
            updatedAt: new Date().toISOString()
        });
        console.log(`  [✓] Property: ${item.title} (ID: ${item.id})`);
    }

    // Migrate lifestyle
    console.log(`\nMigrating ${lifestyleItems.length} lifestyle items...`);
    for (const item of lifestyleItems) {
        const { id: _, ...data } = item;
        await db.collection('lifestyle').doc(item.id).set({
            ...data,
            updatedAt: new Date().toISOString()
        });
        console.log(`  [✓] Lifestyle: ${item.title} (ID: ${item.id})`);
    }

    console.log('\n--- Migration Completed Successfully ---');
}

migrate().catch(err => {
    console.error('\n[X] Migration failed:', err);
    process.exit(1);
});
