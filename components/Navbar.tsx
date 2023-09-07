import React from "react";
import { getAuthSession } from "@/lib/auth";
import User from "./User";
import StoreSwitcher from "./StoreSwitcher";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import MainNav from "./MainNav";

const Navbar = async () => {
  const session = await getAuthSession();
  const id = session?.user.id;

  if (!id) {
    redirect("sign-in");
  }

  const store = await db.store.findMany({
    where: {
      userId: id,
    },
  });

  if (session) {
    return (
      <div className="border-b-2">
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="space-x-3 flex">
            <StoreSwitcher items={store} />
            <MainNav />
          </div>
          <div className="flex gap-x-2 items-center">
            <span>Signed in as {session?.user.name}</span>
            <User />
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
