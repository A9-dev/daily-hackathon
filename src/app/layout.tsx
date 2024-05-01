import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <div className="p-5 flex justify-between overflow-hidden items-center border-dashed border-b-2 h-28">
              <p>Daily hackathons</p>
              <nav className=" float-right">
                <Button className="mx-1" variant={"outline"}>
                  Button 1
                </Button>
                <Button className="mx-1" variant={"outline"}>
                  Button 2
                </Button>
                <Button className="mx-1" variant={"outline"}>
                  Button 3
                </Button>
              </nav>
            </div>
            {children}
            <div className="p-5 fixed flex items-center justify-center left-0 bottom-0 w-full border-dashed border-t-2 h-16 min-h-1/6 text-center">
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
