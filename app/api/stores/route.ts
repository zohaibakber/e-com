import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.redirect("sign-in");
    const id = session?.user.id;
    const body = await req.json();
    const name = body.name;
    const data = await db.store.create({
      data: {
        name: name,
        userId: id,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
