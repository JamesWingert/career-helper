import Link from "next/link";
import { loadLatestSnapshot } from "../../lib/market-turso";
import { dashboardData } from "./data";
import { DashboardNav } from "./dashboard-nav";
import styles from "./page.module.css";
import shell from "./shell.module.css";

export const dynamic = "force-dynamic";

export default async function AiDashboardPage() {
  const d = await loadLatestSnapshot(dashboardData);
  const experiencedSignal = d.signals.find((s) => s.signal === "Experienced-worker employment");
  const earlyCareerSignal = d.signals.find((s) => s.signal === "Early-career SWE employment");

  return (
    <main className={styles.page}>
      <header className={styles.top}>
        <div>
          <h1 className={styles.title}>SWE market outlook</h1>
          <p className={styles.dek}>Evidence relevant to an experienced engineer deciding whether to stay, specialize, or pivot.</p>
        </div>
        <aside className={styles.stamp}><span>Last research pass</span><strong>{d.updatedAt}</strong><span>Next refresh</span><strong>{d.nextRefresh}</strong></aside>
      </header>

      <DashboardNav active="overview" />

      <section className={shell.heroDecision}>
        <div><h2>Stay in SWE—for now.</h2><p>The market is weak and senior-heavy. Evidence still points to changing work, not broad replacement of experienced engineers.</p></div>
        <aside><span>Pivot signal</span><strong>NO</strong><small>Trend: unchanged</small></aside>
      </section>

      <section className={shell.changeGrid} aria-label="What changed">
        <article><span>Mid-level demand</span><strong>WATCH</strong><p>Mid-level postings are down relative to senior roles.</p></article>
        <article><span>Senior demand</span><strong>STRONGER</strong><p>Hiring remains unusually senior-heavy.</p></article>
        <article><span>Experienced replacement</span><strong>WEAK EVIDENCE</strong><p>{experiencedSignal?.reading ?? "No comparable experienced decline"}</p></article>
        <article><span>NYC listings</span><strong>{d.linkedin.countLabel}</strong><p>Useful directionally as history accumulates.</p></article>
        <article><span>SWE market</span><strong>BELOW BASELINE</strong><p>Postings remain well below the overall U.S. market.</p></article>
        <article className={styles.canaryCard}><span>Early-career signal</span><strong>{earlyCareerSignal?.reading ?? "Weak"}</strong><p>Leading indicator; lower weight for your risk.</p></article>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Since the last refresh</h2><p>The view becomes more useful as the series gains history.</p></div>
        <div className={shell.deltaList}>
          <p><b>Personal risk:</b><span>Unchanged · low–moderate</span></p>
          <p><b>Mid-level hiring:</b><span>Negative relative to senior hiring · confidence high</span></p>
          <p><b>Experienced AI displacement:</b><span>No material strengthening · confidence medium</span></p>
          <p><b>Agent capability:</b><span>Improving, but still separate from labor replacement</span></p>
          <p><b>Career response:</b><span>Favor systems/domain-heavy SWE before any exit from SWE</span></p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Pivot threshold</h2><p>Several independent conditions should turn before leaving SWE.</p></div>
        <div className={shell.thresholdGrid}>
          <article><span>4–10 YOE deterioration vs controls</span><strong>NOT MET</strong></article>
          <article><span>Credible AI-driven experienced headcount cuts</span><strong>NOT MET</strong></article>
          <article><span>Reliable realistic multi-day production autonomy</span><strong>NOT MET</strong></article>
          <article><span>Clearly stronger adjacent market</span><strong>NOT MET</strong></article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Detailed analysis</h2></div>
        <div className={shell.deepLinks}>
          <Link href="/ai-dashboard/personal-risk"><span>01</span><strong>Personal risk</strong><p>YOE bands, accessibility, experience inflation, compensation, NYC depth.</p></Link>
          <Link href="/ai-dashboard/labor-market"><span>02</span><strong>Labor market</strong><p>Levels, 2w/4w/12w/YoY trends, controls and causality.</p></Link>
          <Link href="/ai-dashboard/ai-replacement"><span>03</span><strong>AI replacement</strong><p>Backfills, headcount, output, attribution and realistic autonomy.</p></Link>
          <Link href="/ai-dashboard/career-response"><span>04</span><strong>Career response</strong><p>Skill migration and whether an adjacent path is actually stronger.</p></Link>
        </div>
      </section>

      <footer className={styles.footer}>Sources, benchmarks, role samples, and methodology are on the detailed pages.</footer>
    </main>
  );
}
