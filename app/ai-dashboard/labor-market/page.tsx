import Link from "next/link";
import { loadLatestSnapshot } from "../../../lib/market-turso";
import { dashboardData } from "../data";
import { DashboardNav } from "../dashboard-nav";
import styles from "../page.module.css";

export const dynamic = "force-dynamic";

export default async function LaborMarketPage() {
  const d = await loadLatestSnapshot(dashboardData);
  const maxTrueupTrend = Math.max(...d.trueup.categories.map((x) => x.trendPct));
  return (
    <main className={styles.page}>
      <header className={styles.subTop}>
        <div><div className={styles.kicker}>Labor market & causality</div><h1 className={styles.subTitle}>Is SWE weak, and is it getting better or worse?</h1><p className={styles.dek}>Levels, direction, velocity and control groups are kept separate so a weak-but-recovering market does not look the same as a weak-and-deteriorating one.</p></div>
        <aside className={styles.stamp}><span>Last research pass</span><strong>{d.updatedAt}</strong><span>Next refresh</span><strong>{d.nextRefresh}</strong></aside>
      </header>
      <DashboardNav active="labor" />

      <section className={styles.callout}><span>Current read</span><strong>SOFTWARE REMAINS UNUSUALLY WEAK VS. THE OVERALL MARKET</strong><p>Indeed/FRED software development was 74.56 in the stored snapshot while overall U.S. postings later reached 102.09. The next refresh will calculate 2w/4w/12w/YoY direction and acceleration from preserved observations.</p></section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Control-group view</h2><p>The raw series remain separate; relative weakness is an interpretation, not a fake composite index.</p></div>
        <div className={styles.statStrip}>
          <div><span>SWE postings</span><strong>{d.metrics[0].value}</strong><small>Indeed/FRED · Feb 2020=100</small></div>
          <div><span>Overall postings</span><strong>102.09</strong><small>Indeed/FRED · Jul 24, 2026</small></div>
          <div><span>Current gap</span><strong>-26.61</strong><small>SWE index points vs overall</small></div>
          <div><span>Confidence</span><strong>HIGH</strong><small>Stable official series</small></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Direction & velocity framework</h2><p>Each repeatable series will carry both level and momentum.</p></div>
        <div className={styles.riskGrid}>
          {[
            ["2-week", "BASELINE FORMING", "Fast change / shock detection"],
            ["4-week", "BASELINE FORMING", "Short-term direction"],
            ["12-week", "BASELINE FORMING", "Meaningful hiring trend"],
            ["Year-over-year", "BASELINE FORMING", "Structural direction"],
            ["Velocity", "BASELINE FORMING", "Accelerating vs decelerating"],
            ["Structural break", "NONE FLAGGED", "Unusually large move vs recent range"],
            ["NYC vs national", "SEPARATE", "Do not substitute one for the other"],
            ["Evidence quality", "PER-SIGNAL", "High / medium / low confidence"],
          ].map(([label, value, note]) => <article className={styles.riskCard} key={label}><span className={styles.riskLabel}>{label}</span><strong className={styles.pending}>{value}</strong><p>{note}</p></article>)}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Tech-category momentum</h2><p>TrueUp is useful for within-tech direction, but it is not the whole U.S. labor market.</p></div>
        <article className={styles.panel}>
          <h3>TrueUp job-category momentum</h3>
          <div className={styles.panelMeta}>As of {d.trueup.asOf} · {d.trueup.methodology}</div>
          {d.trueup.categories.map((item) => <div className={styles.row} key={item.name}><span className={styles.rowName}>{item.name}</span><span className={styles.barTrack}><i className={styles.bar} style={{width:`${Math.max(5,(item.trendPct/maxTrueupTrend)*100)}%`}} /></span><span className={styles.rowVal}>+{item.trendPct}%</span></div>)}
        </article>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>What could be causing weakness?</h2><p>AI attribution is only one hypothesis and must beat competing explanations.</p></div>
        <div className={styles.signalGrid}>
          <article className={styles.signal}><div className={styles.signalTop}><h3>AI substitution</h3><span className={styles.badge}>WATCH</span></div><div className={styles.signalReading}>Not proven broadly</div><p>Strongest labor evidence remains concentrated lower in the experience distribution.</p></article>
          <article className={styles.signal}><div className={styles.signalTop}><h3>Post-2021 correction</h3><span className={styles.badge}>MATERIAL</span></div><div className={styles.signalReading}>Still relevant</div><p>Tech hiring has not returned to the 2021–22 expansion regime.</p></article>
          <article className={styles.signal}><div className={styles.signalTop}><h3>General white-collar weakness</h3><span className={styles.badge}>CONTROL</span></div><div className={styles.signalReading}>Compare explicitly</div><p>Professional hiring controls will show whether software is uniquely weak.</p></article>
          <article className={styles.signal}><div className={styles.signalTop}><h3>Seniority tilt</h3><span className={styles.badge}>HIGH CONF.</span></div><div className={styles.signalReading}>69.3% senior</div><p>Software development had the highest senior share in Indeed's Q1 2026 analysis.</p></article>
          <article className={styles.signal}><div className={styles.signalTop}><h3>Mid-level direction</h3><span className={styles.badge}>NEGATIVE</span></div><div className={styles.signalReading}>-6.7%</div><p>Indeed mid-level postings were down from January 2025 in the July 2026 seniority analysis.</p></article>
          <article className={styles.signal}><div className={styles.signalTop}><h3>Senior direction</h3><span className={styles.badge}>POSITIVE</span></div><div className={styles.signalReading}>+13.5%</div><p>Senior postings rose from January 2025, reinforcing the need to separate senior from mid-level demand.</p></article>
        </div>
      </section>

      <footer className={styles.footer}>Primary question: not just whether SWE is below baseline, but whether it is rising, falling or flat; whether that movement is accelerating; and whether it differs materially from comparable white-collar demand.</footer>
      <Link className={styles.back} href="/">← Career gameplan</Link>
    </main>
  );
}
