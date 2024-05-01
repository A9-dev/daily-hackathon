"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
export default function Home() {
  const router = useRouter();

  const [user] = useAuthState(auth);
  const userSession = sessionStorage.getItem("user");
  // useEffect(() => {
  //   if (!user && !userSession) {
  //     router.push("/sign-in");
  //   }
  // }, [user, router, userSession]);

  console.log({ user });
  return (
    <main>
      <div className="font-extrabold text-6xl text-center m-10 glow">Prompt goes here.</div>
      {user && (
        <div className="w-2/3 text-center bg-card text-card-foreground border mx-auto p-5 m-5 rounded-lg">
          <p className="mb-4">Hello {user?.email}!</p>
        </div>
      )}
    </main>
  );
}
