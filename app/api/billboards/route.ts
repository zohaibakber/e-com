import { getAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req: Request, params: { billboardId: string }) {
  const session = await getAuthSession();
  if (!session) return NextResponse.redirect("/sign-in");
  const userId = session?.user.id;

  const data = db.billboard.create({
    data: {
      id: params.billboardId,
    },
  });
}
