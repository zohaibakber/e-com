import { getAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { FC } from "react";
import SettingForm from "./components/SettingForm";

interface SettingPageProps {
  params: {
    storeId: string;
  };
}

const SettingPage: FC<SettingPageProps> = async () => {
  const session = await getAuthSession();
  if (!session) {
    redirect("/sign-in");
  }
  const store = await db.store.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingPage;
