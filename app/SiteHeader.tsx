"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Career paths", tone: "career" },
  { href: "/ai-dashboard", label: "SWE market", tone: "market" },
  { href: "/controls-scada", label: "Controls / SCADA", tone: "controls" },
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
        <Link className="site-name" href="/">
          <span className="site-mark" aria-hidden="true">JW</span>
          <span>Career gameplan</span>
        </Link>
        <nav aria-label="Primary navigation">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return <Link aria-current={active ? "page" : undefined} className={active ? "current" : ""} data-tone={link.tone} href={link.href} key={link.href}>{link.label}</Link>;
          })}
        </nav>
        <button className="theme-button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          <span aria-hidden="true">{theme === "dark" ? "☀" : "◐"}</span>
          <span>{theme === "dark" ? "Light" : theme === "light" ? "Dark" : "Theme"}</span>
        </button>
      </div>
    </header>
  );
}
