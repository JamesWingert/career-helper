import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Career Gameplan — Jimmy Wingert",
  description: "A focused career plan for production AI systems, deployment, and trading engineering optionality.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
