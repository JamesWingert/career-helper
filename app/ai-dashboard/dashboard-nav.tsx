import Link from "next/link";
import styles from "./page.module.css";

const links = [
  ["overview", "/ai-dashboard", "Overview"],
  ["personal", "/ai-dashboard/personal-risk", "Personal risk"],
  ["labor", "/ai-dashboard/labor-market", "Labor market"],
  ["replacement", "/ai-dashboard/ai-replacement", "AI replacement"],
  ["response", "/ai-dashboard/career-response", "Career response"],
] as const;

export function DashboardNav({ active }: { active: string }) {
  return (
    <nav className={styles.dashboardNav} aria-label="AI dashboard sections">
      {links.map(([id, href, label]) => (
        <Link key={id} href={href} className={active === id ? styles.dashboardNavActive : undefined}>{label}</Link>
      ))}
    </nav>
  );
}
