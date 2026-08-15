import type { Metadata, Viewport } from "next";
import "./globals.css";
import DashboardShortcut from "./DashboardShortcut";

export const metadata: Metadata = {
  title: "Career Gameplan — Jimmy Wingert",
  description: "A focused career plan for production AI systems, deployment, and trading engineering optionality.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5ee" },
    { media: "(prefers-color-scheme: dark)", color: "#171912" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("career-gameplan-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}',
          }}
        />
        <DashboardShortcut />
        {children}
      </body>
    </html>
  );
}
