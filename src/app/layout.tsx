"use client";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "@/components/sign-in";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user] = useAuthState(auth);
  const userSession = sessionStorage.getItem("user");
  const router = useRouter();

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="p-5 sticky top-0 w-full bg-background  flex justify-between overflow-hidden items-center border-dashed border-b-2 h-28">
              <h1 className="text-5xl font-extrabold">Daily Hackathons</h1>
              <nav className=" float-right">
                <Button className="mx-1" variant={"outline"} onClick={() => router.push("/")}>
                  Home
                </Button>
                <Button
                  className="mx-1"
                  variant={"outline"}
                  onClick={() => router.push("/archive")}
                >
                  Archive
                </Button>
                {user || userSession ? (
                  <Button
                    className="mx-1"
                    variant={"outline"}
                    onClick={(e) => {
                      auth.signOut();
                      sessionStorage.removeItem("user");
                    }}
                  >
                    Sign out
                  </Button>
                ) : (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="mx-1" variant={"outline"}>
                        Sign in
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <SignIn />
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </nav>
            </div>
            {children}
            <div className="p-5  flex items-center bg-secondary justify-center left-0 bottom-0 w-full border-dashed border-t-2 h-16 min-h-1/6 text-center">
              <i>Made by Henry Pearson and Connor Brook</i>
              <a href="https://github.com/A9-dev/daily-hackathon" target="_blank">
                <Button variant={"outline"} className="mx-5 align-middle">
                  <FaGithub className="mr-2 h-4 w-4" /> Code
                </Button>
              </a>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
