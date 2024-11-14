import { NextResponse, NextRequest } from 'next/server';
import database from '@/db';

export async function GET(request: NextRequest) {
    return NextResponse.json({ database: database });
}