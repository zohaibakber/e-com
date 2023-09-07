"use client"

import { Button } from "@/components/ui/button";
import { SidebarIcon } from "lucide-react";
import { signIn } from 'next-auth/react'
import { useState } from "react";

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const loginWithGoogle = async () => {
        setIsLoading(true)
    
        try {
          await signIn('google')
        } catch (error) {
            console.error(error)
        } finally {
          setIsLoading(false)
        }
      }
  return (
    <div>
      <h1>Sign In</h1>
      <Button
       type='button'
       size='sm'
       className='w-full'
       onClick={loginWithGoogle}
       disabled={isLoading}>
       {isLoading ? null : <SidebarIcon className='h-4 w-4 mr-2' />}
        Sign in with Google
      </Button>
    </div>
  );
}