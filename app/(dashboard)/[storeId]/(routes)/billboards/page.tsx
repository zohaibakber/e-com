import { getAuthSession } from "@/lib/auth";
import BillboardClient from "./components/client";
import { utapi } from "uploadthing/server";

const BillboardsPage = async () => {
  const session = await getAuthSession();
  const userId = session?.user?.id;

  const files = await utapi.listFiles();
  console.log(files);

  const imageUrl = files.find((file) => file.id === userId);
  console.log(imageUrl);
  return (
    <>
      <div className="flex-col p-6">
        <BillboardClient />
        {/* <Image src={imageUrl?.url} /> */}
      </div>
    </>
  );
};

export default BillboardsPage;
