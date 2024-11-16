import { NextResponse, NextRequest } from 'next/server';
import {database} from '@/db';

export async function GET() {
    return NextResponse.json({ tasks: database.getInstance().getTasks() });
}

export async function POST(request: NextRequest) {
    const requestData = await request.json();
    const newTaskId: string = database.getInstance().addTask(requestData);
    return NextResponse.json({id: newTaskId})
}