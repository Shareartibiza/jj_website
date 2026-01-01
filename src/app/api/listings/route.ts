import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/db.json');

function readDb() {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
}

function writeDb(data: any) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category'); // 'property' or 'lifestyle'

        const db = readDb();

        if (category === 'property') {
            return NextResponse.json(db.properties);
        } else if (category === 'lifestyle') {
            return NextResponse.json(db.lifestyle);
        }

        return NextResponse.json(db);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, ...item } = body; // type is 'property' or 'lifestyle'

        const db = readDb();

        if (type === 'property') {
            const newItem = { ...item, id: Date.now().toString() };
            db.properties.push(newItem);
            writeDb(db);
            return NextResponse.json(newItem);
        } else if (type === 'lifestyle') {
            const newItem = { ...item, id: Date.now().toString() };
            db.lifestyle.push(newItem);
            writeDb(db);
            return NextResponse.json(newItem);
        }

        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
    }
}
