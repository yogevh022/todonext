import { NextRequest, NextResponse } from "next/server";
import {database} from "@/db";

type RouteParams = Promise<{id: string}>;

export async function DELETE(request: NextRequest, { params }: {params: RouteParams}) {
  const id = (await params).id as string;
  database.getInstance().deleteTask(id);
  return NextResponse.json({ id: id });
}

export const PUT = async (request: NextRequest, { params }: {params: RouteParams}) => {
  const {id} = await params;
  const requestData = await request.json();
  database.getInstance().editTask(id, requestData);
  return NextResponse.json({task: requestData})
}