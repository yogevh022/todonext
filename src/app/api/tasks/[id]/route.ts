import { NextRequest, NextResponse } from 'next/server';
import Database from '@/database/db';
import TaskData from '@/types/task';

// this route doesnt use the ID path parameter, so it shouldnt be in this file
export async function PUT(request: NextRequest) {
    const taskToUpdate: TaskData = await request.json();
    Database.getInstance().updateTask(taskToUpdate);
    return NextResponse.json({taskToUpdate});
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const taskId = (await params).id;
    Database.getInstance().deleteTask(taskId);
    return NextResponse.json({_id: taskId});
}