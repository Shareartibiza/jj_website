import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Try properties collection first
        let doc = await db.collection('properties').doc(params.id).get();
        if (doc.exists) {
            return NextResponse.json({ id: doc.id, ...doc.data() });
        }

        // Try lifestyle collection
        doc = await db.collection('lifestyle').doc(params.id).get();
        if (doc.exists) {
            return NextResponse.json({ id: doc.id, ...doc.data() });
        }

        return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    } catch (error) {
        console.error('Listing GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch listing' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();

        // Try properties
        let docRef = db.collection('properties').doc(params.id);
        let doc = await docRef.get();
        if (doc.exists) {
            await docRef.update(body);
            return NextResponse.json({ message: 'Listing updated successfully' });
        }

        // Try lifestyle
        docRef = db.collection('lifestyle').doc(params.id);
        doc = await docRef.get();
        if (doc.exists) {
            await docRef.update(body);
            return NextResponse.json({ message: 'Listing updated successfully' });
        }

        return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    } catch (error) {
        console.error('Listing PUT error:', error);
        return NextResponse.json({ error: 'Failed to update listing' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Try properties
        let docRef = db.collection('properties').doc(params.id);
        let doc = await docRef.get();
        if (doc.exists) {
            await docRef.delete();
            return NextResponse.json({ message: 'Listing deleted successfully' });
        }

        // Try lifestyle
        docRef = db.collection('lifestyle').doc(params.id);
        doc = await docRef.get();
        if (doc.exists) {
            await docRef.delete();
            return NextResponse.json({ message: 'Listing deleted successfully' });
        }

        return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    } catch (error) {
        console.error('Listing DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
    }
}
