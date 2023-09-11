"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { LoadingButton } from "./ui/loading-button";

const User = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div>
      <LoadingButton
        action={() => {
          signOut();
        }}
        loading={loading}
        setLoading={setLoading}
      >
        Signout
      </LoadingButton>
    </div>
  );
};

export default User;
