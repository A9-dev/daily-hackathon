"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      sessionStorage.setItem("user", JSON.stringify(res?.user));
      console.log({ res });
      router.push("/");
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <div className="w-1/3 p-5 mx-auto rounded my-5 border ">
      <h1 className="scroll-m-20 mb-5 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Sign In
      </h1>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full mb-4 p-2 border rounded"
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full mb-4 p-2 border rounded"
      />
      <Button onClick={handleSubmit} className="block mx-auto mb-4 border w-1/2">
        Sign In
      </Button>

      <Button
        onClick={() => router.push("/sign-up")}
        className="block bg-secondary text-secondary-foreground  mx-auto border w-1/2"
      >
        Not a user? Sign up.
      </Button>
    </div>
  );
}
