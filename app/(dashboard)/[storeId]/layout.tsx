import { ReactNode } from "react";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import Navbar from "@/components/Navbar";


export default async function DashboardLayout({
    children,
    params
}: {
    children: ReactNode,
    params: {storeId: string}
}) {
    const session = await getAuthSession();
    const id = session?.user.id;
    if (!session) {
        redirect("/sign-in")
    }
    const store = db.store.findFirst({
        where: {
            id: params.storeId,
            userId: id
        }
    });

    if (!store) {
        redirect("/")
    }
    return(
        <>
        <Navbar />
        {children}
        </>
    )
}