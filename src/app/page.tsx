"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const userSession = sessionStorage.getItem("user");
  useEffect(() => {
    if (!user && !userSession) {
      router.push("/sign-in");
    }
  }, [user, router, userSession]);

  console.log({ user });
  return (
    <main>
      Hello {user?.email}
      <Button
        onClick={() => {
          auth.signOut();
          router.push("/sign-in");
          sessionStorage.removeItem("user");
        }}
        className="block mx-auto mb-4 border w-1/2"
      >
        Log out
      </Button>
    </main>
  );
}
