import { loadLatestSnapshot } from "../../lib/market-turso";
import { dashboardData } from "./data";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

function Nav() {
  return <nav className={styles.sectionNav} aria-label="SWE market sections">
    <a href="/ai-dashboard">Overview</a>
    <a href="/ai-dashboard/personal-risk">Personal risk</a>
    <a href="/ai-dashboard/labor-market">Labor market</a>
    <a href="/ai-dashboard/ai-replacement">AI replacement</a>
    <a href="/ai-dashboard/career-response">Career response</a>
  </nav>;
}

export default async function AiDashboardPage() {
  const d = await loadLatestSnapshot(dashboardData);
  const o = d.overview;

  const scoreboard = [
    { label: "~5 YOE risk", value: o.personalRisk, note: `${o.personalRiskTrend} · ${o.personalRiskConfidence} confidence`, tone: "neutral" },
    { label: "SWE hiring", value: o.hiring, note: `Trend: ${o.hiringTrend}`, tone: "down" },
    { label: "Experienced AI replacement", value: o.aiReplacement, note: o.aiReplacementTrend, tone: "warning" },
    { label: "Mid-level demand", value: o.midLevel, note: "Latest comparable seniority baseline", tone: "down" },
    { label: "Senior demand", value: o.senior, note: "Senior-heavy recovery remains visible", tone: "up" },
    { label: "NYC SWE demand", value: d.linkedin.countLabel, note: o.nycDemand, tone: "neutral" },
  ];

  return <main className={styles.page}>
    <header className={styles.top}>
      <div>
        <span className={styles.topKicker}>SWE / AI market monitor</span>
        <h1 className={styles.title}>Quick read</h1>
        <p className={styles.dek}>The dashboard answers three things separately: whether SWE hiring is worsening, whether AI is replacing experienced engineers, and whether a competent engineer around 5 YOE is becoming materially harder to employ.</p>
      </div>
      <dl className={styles.stamp}>
        <div><dt>Data through</dt><dd>{d.updatedAt}</dd></div>
        <div><dt>Next refresh</dt><dd>{d.nextRefresh}</dd></div>
      </dl>
    </header>

    <Nav />

    <section className={styles.readout}>
      <div>
        <span>Recommendation</span>
        <h2>{o.pivot}</h2>
        <p>{d.currentRead}</p>
      </div>
      <dl>
        <div><dt>Pivot threshold</dt><dd>{o.pivotDistance}</dd></div>
      </dl>
    </section>

    <section className={styles.section}>
      <header className={styles.sectionHead}><div><span>01</span><h2>Scoreboard</h2></div><p>Current state first. Detail lives on the four focused pages.</p></header>
      <div className={styles.metricGrid}>
        {scoreboard.map((item) => <article className={styles[item.tone]} key={item.label}>
          <span>{item.label}</span><strong>{item.value}</strong><p>{item.note}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.section}>
      <header className={styles.sectionHead}><div><span>02</span><h2>What changed</h2></div><p>Only material changes since the prior snapshot.</p></header>
      <div className={styles.evidenceList}>
        {o.changed.map((change, index) => <article className={styles.neutral} key={change}>
          <div><span>{String(index + 1).padStart(2, "0")}</span><strong>{change}</strong></div>
        </article>)}
      </div>
    </section>

    <section className={styles.section}>
      <header className={styles.sectionHead}><div><span>03</span><h2>Current directional read</h2></div><p>Weak level is not the same as worsening direction.</p></header>
      <div className={styles.signalStrip}>
        <article><span>Indeed SWE · 2 weeks</span><strong className={styles.positive}>+{d.trends.swe.twoWeekPct}%</strong><p>Small improvement from a weak base</p></article>
        <article><span>Indeed SWE · 4 weeks</span><strong className={styles.negative}>{d.trends.swe.fourWeekPct}%</strong><p>Essentially flat/noisy</p></article>
        <article><span>SWE gap vs overall</span><strong className={styles.negative}>{d.trends.relativeGapPoints.toFixed(2)} pts</strong><p>Structural weakness remains</p></article>
      </div>
    </section>
  </main>;
}
