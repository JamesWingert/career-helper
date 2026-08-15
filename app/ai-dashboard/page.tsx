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
          <div className={styles.kicker}>SWE / AI labor market monitor</div>
          <h1 className={styles.title}>Software engineering risk dashboard</h1>
          <p className={styles.dek}>Built around one question: is AI making a competent ~5 YOE engineer materially harder to employ, or mainly changing what that engineer does?</p>
          <Link className={styles.back} href="/">← Career gameplan</Link>
        </div>
        <aside className={styles.stamp}><span>Last research pass</span><strong>{d.updatedAt}</strong><span>Next refresh</span><strong>{d.nextRefresh}</strong></aside>
      </header>

      <DashboardNav active="overview" />

      <section className={shell.heroDecision}>
        <div><span className={styles.kicker}>Bottom line</span><h2>Stay in SWE. Risk is low–moderate, not zero.</h2><p>The market is weak and increasingly senior-heavy, but current evidence still points more toward AI changing experienced SWE work than broadly replacing experienced engineers.</p></div>
        <aside><span>Pivot signal</span><strong>NO</strong><small>Trend: unchanged</small></aside>
      </section>

      <section className={shell.changeGrid} aria-label="What changed">
        <article><span>Mid-level demand</span><strong>WATCH</strong><p>Indeed's latest seniority analysis shows mid-level postings down while senior postings rose.</p></article>
        <article><span>Senior demand</span><strong>RISING</strong><p>Software development remains unusually senior-heavy.</p></article>
        <article><span>Experienced replacement</span><strong>WEAK EVIDENCE</strong><p>{experiencedSignal?.reading ?? "No comparable experienced decline"}</p></article>
        <article><span>NYC opportunity set</span><strong>{d.linkedin.countLabel}</strong><p>Headline LinkedIn SWE query; direction becomes more useful as history accumulates.</p></article>
        <article><span>SWE vs overall market</span><strong>WORSE</strong><p>SWE postings remain far below the overall U.S. Indeed index.</p></article>
        <article className={styles.canaryCard}><span>Early-career canary</span><strong>{earlyCareerSignal?.reading ?? "Weak"}</strong><p>Important leading indicator, lower weight for your own risk.</p></article>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>What changed since the last refresh?</h2><p>This becomes the primary biweekly delta view once the repeated YOE and control-group series have enough history.</p></div>
        <div className={shell.deltaList}>
          <p><b>Personal risk:</b><span>Unchanged · low–moderate</span></p>
          <p><b>Mid-level hiring:</b><span>Negative relative to senior hiring · confidence high</span></p>
          <p><b>Experienced AI displacement:</b><span>No material strengthening · confidence medium</span></p>
          <p><b>Agent capability:</b><span>Improving, but still separate from labor replacement</span></p>
          <p><b>Career response:</b><span>Favor systems/domain-heavy SWE before any exit from SWE</span></p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Distance from the pivot threshold</h2><p>A serious pivot requires several independent conditions to turn at the same time.</p></div>
        <div className={shell.thresholdGrid}>
          <article><span>4–10 YOE deterioration vs controls</span><strong>NOT MET</strong></article>
          <article><span>Credible AI-driven experienced headcount cuts</span><strong>NOT MET</strong></article>
          <article><span>Reliable realistic multi-day production autonomy</span><strong>NOT MET</strong></article>
          <article><span>Clearly stronger adjacent market</span><strong>NOT MET</strong></article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Go deeper</h2><p>The long analysis is split into dedicated pages instead of one monotonous scroll.</p></div>
        <div className={shell.deepLinks}>
          <Link href="/ai-dashboard/personal-risk"><span>01</span><strong>Personal risk</strong><p>YOE bands, accessibility, experience inflation, compensation, NYC depth.</p></Link>
          <Link href="/ai-dashboard/labor-market"><span>02</span><strong>Labor market</strong><p>Levels, 2w/4w/12w/YoY trends, controls and causality.</p></Link>
          <Link href="/ai-dashboard/ai-replacement"><span>03</span><strong>AI replacement</strong><p>Backfills, headcount, output, attribution and realistic autonomy.</p></Link>
          <Link href="/ai-dashboard/career-response"><span>04</span><strong>Career response</strong><p>Skill migration and whether an adjacent path is actually stronger.</p></Link>
        </div>
      </section>

      <footer className={styles.footer}>Overview intentionally stays short. Raw sources, benchmark detail, role samples and methodology live on the dedicated pages.</footer>
    </main>
  );
}
