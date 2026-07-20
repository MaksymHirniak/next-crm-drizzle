import { defineConfig } from 'drizzle-kit';
import { NextResponse } from "next/server";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
 
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = 10; 
  const offset = (page - 1) * limit;

  try {
    const data = await db
      .select()
      .from(users)
      .where(eq(users.isDeleted, false)) 
      .orderBy(desc(users.createdAt)) 
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ data, page });
  } catch (error) {
    return NextResponse.json({ error: "Eror fetching users" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await db
      .update(users)
      .set({ isDeleted: true }) 
      .where(eq(users.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erorr deleting user" }, { status: 500 });
  }
}