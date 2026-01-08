import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DB, Property, Lifestyle } from '@/types';

const DB_PATH = path.join(process.cwd(), 'src/data/db.json');

function readDb(): DB {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
}

function writeDb(data: DB) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const db = readDb();
        const item = [...db.properties, ...db.lifestyle].find(
            (i: Property | Lifestyle) => i.id === params.id
        );

        if (!item) {
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
        }

        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch listing' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const db = readDb();

        let found = false;

        // Search in properties
        const propIndex = db.properties.findIndex((i: Property) => i.id === params.id);
        if (propIndex !== -1) {
            db.properties[propIndex] = { ...db.properties[propIndex], ...body };
            found = true;
        }

        // Search in lifestyle if not found in properties
        if (!found) {
            const lifeIndex = db.lifestyle.findIndex((i: Lifestyle) => i.id === params.id);
            if (lifeIndex !== -1) {
                db.lifestyle[lifeIndex] = { ...db.lifestyle[lifeIndex], ...body };
                found = true;
            }
        }

        if (!found) {
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
        }

        writeDb(db);
        return NextResponse.json({ message: 'Listing updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update listing' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const db = readDb();

        const initialPropCount = db.properties.length;
        db.properties = db.properties.filter((i: Property) => i.id !== params.id);

        const initialLifeCount = db.lifestyle.length;
        db.lifestyle = db.lifestyle.filter((i: Lifestyle) => i.id !== params.id);

        if (db.properties.length === initialPropCount && db.lifestyle.length === initialLifeCount) {
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
        }

        writeDb(db);
        return NextResponse.json({ message: 'Listing deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
    }
}

