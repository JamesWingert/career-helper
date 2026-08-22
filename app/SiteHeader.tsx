"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Career paths" },
  { href: "/ai-dashboard", label: "SWE market" },
  { href: "/controls-scada", label: "Controls / SCADA" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("career-gameplan-theme");
      const next = saved === "dark" || saved === "light"
        ? saved
        : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    } catch {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const current = theme ?? (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("career-gameplan-theme", next); } catch {}
    setTheme(next);
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="site-name" href="/">Jimmy&apos;s career plan</Link>
        <nav aria-label="Primary navigation">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return <Link className={active ? "current" : ""} href={link.href} key={link.href}>{link.label}</Link>;
          })}
        </nav>
        <button className="theme-button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          {theme === "dark" ? "Light" : theme === "light" ? "Dark" : "Theme"}
        </button>
      </div>
    </header>
  );
}
