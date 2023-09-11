import React from "react";
import BillBoardForm from "./components/BillboardForm";
import db from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  const session = await getAuthSession();
  const userId = session?.user?.id || "";
  return (
    <div className="p-6">
      <BillBoardForm initialData={billboard} userId={userId} />
    </div>
  );
};

export default BillboardPage;
