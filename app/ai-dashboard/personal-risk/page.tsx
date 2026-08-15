import Link from "next/link";
import { loadLatestSnapshot } from "../../../lib/market-turso";
import { dashboardData } from "../data";
import { DashboardNav } from "../dashboard-nav";
import styles from "../page.module.css";

export const dynamic = "force-dynamic";

export default async function PersonalRiskPage() {
  const d = await loadLatestSnapshot(dashboardData);
  return (
    <main className={styles.page}>
      <header className={styles.subTop}>
        <div><div className={styles.kicker}>Personal risk · ~5 YOE</div><h1 className={styles.subTitle}>Are jobs you can realistically get becoming harder to find?</h1><p className={styles.dek}>This page separates true mid-level demand from senior demand and tracks qualification pressure, compensation and NYC market depth.</p></div>
        <aside className={styles.stamp}><span>Last research pass</span><strong>{d.updatedAt}</strong><span>Next refresh</span><strong>{d.nextRefresh}</strong></aside>
      </header>
      <DashboardNav active="personal" />

      <section className={styles.callout}><span>Current read</span><strong>LOW–MODERATE RISK · TREND BASELINE FORMING</strong><p>No comparable experienced-worker employment decline is visible yet, but software hiring is unusually senior-heavy. The next refresh begins the explicit YOE series.</p></section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>YOE demand bands</h2><p>Job-description requirements will be parsed separately from broad platform seniority labels.</p></div>
        <div className={styles.riskGrid}>
          {[
            ["0–2 YOE", "CANARY", "Lower-weight early-career reference."],
            ["3–4 YOE", "BASELINE NEXT REFRESH", "True mid-level entry point."],
            ["5–6 YOE", "BASELINE NEXT REFRESH", "Most directly relevant accessibility band."],
            ["7–9 YOE", "BASELINE NEXT REFRESH", "Mid-senior comparison."],
            ["10+ YOE", "BASELINE NEXT REFRESH", "Senior/staff comparison group."],
            ["5-YOE accessibility", "BASELINE NEXT REFRESH", "Share of sampled roles where ~5 YOE meets the stated minimum."],
            ["Median minimum YOE", "BASELINE NEXT REFRESH", "Detects experience inflation over time."],
            ["Employer breadth", "BASELINE NEXT REFRESH", "Distinct employers hiring at each experience band."],
          ].map(([label, value, note]) => <article className={styles.riskCard} key={label}><span className={styles.riskLabel}>{label}</span><strong className={styles.pending}>{value}</strong><p>{note}</p></article>)}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>LinkedIn seniority pulse</h2><p>Useful but not literal YOE. LinkedIn's “Mid-Senior” bucket is too broad, so it is a secondary layer.</p></div>
        <div className={styles.statStrip}>
          <div><span>Entry level</span><strong>525</strong><small>Public Software Developer · NYC metro filter</small></div>
          <div><span>Associate</span><strong>159</strong><small>LinkedIn-defined bucket</small></div>
          <div><span>Mid-Senior</span><strong>3,490</strong><small>Too broad to proxy ~5 YOE</small></div>
          <div><span>Any time</span><strong>4,978</strong><small>Same public Software Developer page</small></div>
        </div>
        <div className={styles.noteBox}><strong>Freshness baseline:</strong> 3,986 past month · 1,489 past week · 370 past 24 hours. These are a separate LinkedIn series from the existing Software Engineer headline query and will be repeated consistently.</div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Experience inflation & compensation</h2><p>The useful question is not just “how many jobs?” but whether the bar to qualify is moving away from you.</p></div>
        <div className={styles.twoCol}>
          <article className={styles.panel}><h3>Experience pressure</h3><div className={styles.signalList}><p><b>Share requiring 5+ YOE</b><span>Baseline next refresh</span></p><p><b>Share requiring 7+ YOE</b><span>Baseline next refresh</span></p><p><b>Share requiring 10+ YOE</b><span>Baseline next refresh</span></p><p><b>Mid → senior title drift</b><span>Baseline next refresh</span></p></div></article>
          <article className={styles.panel}><h3>Compensation & competition</h3><div className={styles.signalList}><p><b>Median comp · 3–6 YOE</b><span>Baseline next refresh</span></p><p><b>Median comp · 7+ YOE</b><span>Baseline next refresh</span></p><p><b>Fresh posting velocity</b><span>Baseline next refresh</span></p><p><b>Posting persistence/reposts</b><span>Baseline next refresh</span></p></div></article>
        </div>
      </section>

      <footer className={styles.footer}>Interpretation rule: a senior-heavy market is not automatically healthy for a ~5 YOE engineer. The dashboard will treat mid-level accessibility separately from senior demand.</footer>
      <Link className={styles.back} href="/">← Career gameplan</Link>
    </main>
  );
}
