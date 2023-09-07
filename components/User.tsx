"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

const User = () => {
  return (
    <div>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
};

export default User;
