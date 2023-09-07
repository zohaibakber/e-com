import { getAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export default async function SetupLayout({children}: {children: React.ReactNode}) {
    const session = await getAuthSession();
    const id = session?.user.id;
    const store = await db.store.findFirst({
        where: {
            userId: id,
        }
    });

    if (!session) {
        redirect("/sign-in");
    }

    if (store) {
        redirect(`/${store.id}`)
    }
    return(
        <>
        {children}
        </>
    )
 
}