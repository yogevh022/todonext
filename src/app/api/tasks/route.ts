import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/db";
import TaskData from "@/types/task";

export async function GET() {
    return NextResponse.json(Database.getInstance().tasks);
}

export async function POST(request: NextRequest) {
    const newTask: TaskData = Database.getInstance().addTask((await request.json()) as TaskData);
    return NextResponse.json(newTask);
}