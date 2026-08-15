"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardShortcut() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <Link className="dashboard-shortcut" href="/ai-dashboard">
      SWE / AI Market Dashboard
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
