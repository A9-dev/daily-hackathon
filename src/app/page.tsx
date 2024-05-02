"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <>
      <div className="font-extrabold text-6xl text-center m-10 glow">Prompt goes here.</div>

      <div className="flex justify-center h-screen">
        <div className="w-1/4 p-4 border rounded-lg h-5/6">
          <p className="text-center">Left Column</p>
        </div>

        <div className="w-1/2 p-4 border rounded-lg mx-1 h-5/6">
          <div className="text-center">
            <p className="mb-4">Main Content</p>
            {user && <p className="mb-4">Signed in as {user.email}!</p>}
          </div>
        </div>

        <div className="w-1/4 p-4 h-5/6 border rounded-lg">
          <p className="text-center">Right Column</p>
        </div>
      </div>
    </>
  );
}
