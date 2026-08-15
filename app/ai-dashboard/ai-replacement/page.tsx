import Link from "next/link";
import { loadLatestSnapshot } from "../../../lib/market-turso";
import { dashboardData } from "../data";
import { DashboardNav } from "../dashboard-nav";
import styles from "../page.module.css";

export const dynamic = "force-dynamic";

export default async function AiReplacementPage() {
  const d = await loadLatestSnapshot(dashboardData);
  const maxBenchmark = Math.max(...d.benchmarks.map((x) => x.score));
  return (
    <main className={styles.page}>
      <header className={styles.subTop}>
        <div><div className={styles.kicker}>AI replacement evidence</div><h1 className={styles.subTitle}>Is AI actually replacing experienced engineers?</h1><p className={styles.dek}>Real headcount substitution comes first. Model capability sits below it and cannot substitute for labor-market evidence.</p></div>
        <aside className={styles.stamp}><span>Last research pass</span><strong>{d.updatedAt}</strong><span>Next refresh</span><strong>{d.nextRefresh}</strong></aside>
      </header>
      <DashboardNav active="replacement" />

      <section className={styles.callout}><span>Current read</span><strong>WEAK EVIDENCE OF EXPERIENCED-SWE REPLACEMENT</strong><p>AI is clearly changing execution workflows, but the evidence is not yet strong that firms are broadly making competent mid-level engineers unemployable.</p></section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Experienced replacement signal</h2><p>Red/yellow/green evidence, deliberately not a fake precise score.</p></div>
        <div className={styles.replacementPanel}>
          <div className={styles.replacementHeadline}><span className={styles.replacementDot} /><strong>CURRENT SIGNAL: YELLOW / WATCH</strong></div>
          <div className={styles.replacementGrid}>
            <article><span>Mid-level hiring deterioration</span><strong>YELLOW</strong><p>Needs sustained deterioration relative to controls, not just a weak market.</p></article>
            <article><span>Experienced backfills</span><strong>NOT BASELINED</strong><p>Track whether firms stop replacing experienced departures.</p></article>
            <article><span>Experienced headcount cuts attributed to AI</span><strong>WEAK</strong><p>Require explicit attribution plus actual headcount evidence.</p></article>
            <article><span>Output maintained with fewer engineers</span><strong>WEAK</strong><p>Require measurable team output or productivity, not anecdotes.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>What would move this toward red?</h2><p>The standard is intentionally high because coding benchmarks are not employment statistics.</p></div>
        <div className={styles.riskGrid}>
          {[
            ["Backfills", "DECLINING", "Repeated evidence that experienced roles are not being replaced."],
            ["Headcount", "AI-ATTRIBUTED CUTS", "Experienced SWE reductions explicitly tied to AI."],
            ["Output", "STABLE / RISING", "Same or more engineering output with materially fewer engineers."],
            ["Relative hiring", "4–10 YOE DOWN", "Experienced hiring deteriorates versus broader professional controls."],
            ["Production autonomy", "MULTI-DAY", "Agents own realistic projects with low intervention."],
            ["Reliability", "HIGH", "Architecture/debugging/incidents/migrations work without constant rescue."],
            ["Economics", "CHEAPER", "Agent cost is materially below equivalent human effort."],
            ["Corroboration", "MULTIPLE SOURCES", "No promotion to red from a single company quote or viral chart."],
          ].map(([label, value, note]) => <article className={styles.riskCard} key={label}><span className={styles.riskLabel}>{label}</span><strong>{value}</strong><p>{note}</p></article>)}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Observed labor effects</h2><p>Experience-specific labor evidence stays above benchmark evidence.</p></div>
        <div className={styles.signalGrid}>{d.signals.map((s) => <article className={styles.signal} key={s.signal}><div className={styles.signalTop}><h3>{s.signal}</h3><span className={styles.badge}>{s.direction}</span></div><div className={styles.signalReading}>{s.reading}</div><p>{s.interpretation}</p><a href={s.source} target="_blank" rel="noreferrer">source ↗</a></article>)}</div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Capability, not replacement</h2><p>Useful for forecasting what could happen next, but lower weight than actual experienced-worker outcomes.</p></div>
        <div className={styles.capabilityNote}><strong>Most important capability threshold:</strong> reliable ownership of messy production work across architecture, debugging, incidents, migrations, cross-service integration, security and performance with low human intervention.</div>
        <table className={styles.benchmark}><thead><tr><th>Model</th><th>DeepSWE</th><th>Reported cost</th><th>Evaluation</th></tr></thead><tbody>{d.benchmarks.slice(0,5).map((b)=><tr key={b.model}><td>{b.model}</td><td><div className={styles.scoreWrap}><div className={styles.scoreBar}><i style={{width:`${(b.score/maxBenchmark)*100}%`}}/></div><strong>{b.score}%</strong></div></td><td>{b.cost}</td><td>{b.note}</td></tr>)}</tbody></table>
      </section>

      <footer className={styles.footer}>Benchmark progress can raise future risk without proving present displacement. The replacement signal only strengthens when experienced labor outcomes move with it.</footer>
      <Link className={styles.back} href="/">← Career gameplan</Link>
    </main>
  );
}
