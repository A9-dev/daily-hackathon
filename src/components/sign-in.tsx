"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { set } from "firebase/database";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const [error, setError] = useState("");

  const [loginOrSignUp, setLoginOrSignUp] = useState<"signin" | "signup">("signin");

  async function handleSignIn(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (!res) {
        console.log("User not found");
        setError("Email and password do not match. Please try again.");
        return;
      }
      setEmail("");
      setPassword("");
      setError("");
      sessionStorage.setItem("user", JSON.stringify(res?.user));
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async function handleSignUp(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (password !== password2) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);
      if (!res) {
        console.error(res);
        setError("An error occurred. Please try again.");
        return;
      }
      setEmail("");
      setPassword("");
      setPassword2("");
      setError("");
      sessionStorage.setItem("user", JSON.stringify(res?.user));
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <>
      <div className="space-y-2">
        <h4 className="font-medium leading-none">
          {loginOrSignUp === "signin" ? "Sign in" : "Sign up"}
        </h4>
      </div>
      {loginOrSignUp === "signin" ? (
        <>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-1 p-2 border rounded"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-1 p-2 border rounded"
          />
          <Button onClick={handleSignIn} className="block mx-auto mb-1 border w-2/3">
            Sign In
          </Button>

          <Button
            onClick={() => setLoginOrSignUp("signup")}
            className="block bg-secondary text-secondary-foreground  mx-auto border w-2/3"
          >
            Not a user? Sign up.
          </Button>
        </>
      ) : (
        <>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-1 p-2 border rounded"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-1 p-2 border rounded"
          />
          <Input
            type="password"
            name="password"
            placeholder="Type password again"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            className="w-full mb-1 p-2 border rounded"
          />
          <Button onClick={handleSignUp} className="block mx-auto mb-1 border w-11/12">
            Sign Up
          </Button>

          <Button
            onClick={() => setLoginOrSignUp("signin")}
            className="block bg-secondary text-secondary-foreground  mx-auto border w-11/12"
          >
            Already have an account? Sign in.
          </Button>
        </>
      )}
    </>
  );
}
