import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { Property, Lifestyle } from '@/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category'); // 'property' or 'lifestyle'

        if (category === 'property') {
            const snapshot = await db.collection('properties').get();
            const properties = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return NextResponse.json(properties);
        } else if (category === 'lifestyle') {
            const snapshot = await db.collection('lifestyle').get();
            const lifestyle = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return NextResponse.json(lifestyle);
        }

        // Fetch both if no category specified
        const [propSnap, lifeSnap] = await Promise.all([
            db.collection('properties').get(),
            db.collection('lifestyle').get()
        ]);

        return NextResponse.json({
            properties: propSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            lifestyle: lifeSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        });
    } catch (error) {
        console.error('Listings GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, ...item } = body; // type is 'property' or 'lifestyle'

        if (type === 'property') {
            const docRef = await db.collection('properties').add(item);
            return NextResponse.json({ id: docRef.id, ...item });
        } else if (type === 'lifestyle') {
            const docRef = await db.collection('lifestyle').add(item);
            return NextResponse.json({ id: docRef.id, ...item });
        }

        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    } catch (error) {
        console.error('Listings POST error:', error);
        return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
    }
}
