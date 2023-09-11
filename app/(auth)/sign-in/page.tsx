"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { Donut } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="grid min-h-screen place-items-center">
      <LoadingButton
        action={() => {
          loginWithGoogle();
        }}
        loading={isLoading}
        setLoading={setIsLoading}
        className="flex gap-x-2"
      >
        <Donut className="h-4 w-5" />
        Sign in with Google
      </LoadingButton>
    </div>
  );
}
