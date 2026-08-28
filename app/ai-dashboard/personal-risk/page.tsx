import { loadLatestSnapshot } from "../../../lib/market-turso";
import { dashboardData } from "../data";
import styles from "../page.module.css";

export const dynamic = "force-dynamic";

export default async function PersonalRiskPage() {
  const d = await loadLatestSnapshot(dashboardData);
  const r = d.personalRisk;
  return <main className={styles.page}>
    <header className={styles.top}><div><span className={styles.topKicker}>Personal risk</span><h1 className={styles.title}>~5 YOE employability</h1><p className={styles.dek}>Literal experience requirements are kept separate from LinkedIn seniority labels. This is the page that matters most for the personal risk read.</p></div><dl className={styles.stamp}><div><dt>Risk</dt><dd>{r.level}</dd></div><div><dt>Trend</dt><dd>{r.trend}</dd></div></dl></header>
    <nav className={styles.sectionNav}><a href="/ai-dashboard">Overview</a><a href="/ai-dashboard/personal-risk">Personal risk</a><a href="/ai-dashboard/labor-market">Labor market</a><a href="/ai-dashboard/ai-replacement">AI replacement</a><a href="/ai-dashboard/career-response">Career response</a></nav>
    <section className={styles.readout}><div><span>Current conclusion</span><h2>No evidence of a new ~5 YOE cliff.</h2><p>{r.caveat}</p></div></section>
    <section className={styles.section}><header className={styles.sectionHead}><div><span>01</span><h2>Explicit-YOE baseline</h2></div><p>First reproducible sample; trend begins here.</p></header><div className={styles.metricGrid}>
      <article className={styles.neutral}><span>5-YOE accessibility</span><strong>{r.accessibilityRatePct}%</strong><p>{Math.round(r.sampleSize*r.accessibilityRatePct/100)} of {r.sampleSize} sampled roles</p></article>
      <article className={styles.neutral}><span>Median minimum</span><strong>{r.medianMinimumYoe} years</strong><p>Across explicit-YOE descriptions</p></article>
      <article className={styles.warning}><span>Require 7+ years</span><strong>{r.shareMin7PlusPct}%</strong><p>2 of 9 sampled roles</p></article>
      <article className={styles.neutral}><span>Employer breadth</span><strong>{r.uniqueEmployers}</strong><p>Unique employers in n={r.sampleSize}</p></article>
    </div></section>
    <section className={styles.section}><header className={styles.sectionHead}><div><span>02</span><h2>Minimum YOE bands</h2></div><p>{r.experienceInflation}</p></header><div className={styles.signalStrip}>{r.bands.map(b=><article key={b.band}><span>{b.band} YOE minimum</span><strong>{b.count}</strong><p>sampled postings</p></article>)}</div></section>
    <section className={styles.section}><header className={styles.sectionHead}><div><span>03</span><h2>Sample</h2></div><p>Only postings where an explicit minimum could be inspected.</p></header><div className={styles.tableWrap}><table className={styles.dataTable}><thead><tr><th>Company</th><th>Role</th><th>Min YOE</th><th>Specialty</th><th>Comp</th></tr></thead><tbody>{r.sample.map(x=><tr key={`${x.company}-${x.role}`}><td><a href={x.source} target="_blank" rel="noreferrer">{x.company} ↗</a></td><td>{x.role}</td><td className={styles.value}>{x.minYoe}</td><td>{x.specialty}</td><td>{x.comp}</td></tr>)}</tbody></table></div></section>
    <section className={styles.section}><header className={styles.sectionHead}><div><span>04</span><h2>Seniority context</h2></div><p>The latest comparable Indeed baseline remains senior-heavy; no newer matching release was found.</p></header><div className={styles.signalStrip}><article><span>Mid-level since Jan. 2025</span><strong className={styles.negative}>{d.marketDetails.seniority.midChangePct}%</strong></article><article><span>Senior since Jan. 2025</span><strong className={styles.positive}>+{d.marketDetails.seniority.seniorChangePct}%</strong></article><article><span>Senior share</span><strong>{d.marketDetails.seniority.seniorSharePct}%</strong></article></div></section>
  </main>;
}
