import Link from "next/link";
import { loadLatestSnapshot } from "../../../lib/market-turso";
import { dashboardData } from "../data";
import { DashboardNav } from "../dashboard-nav";
import styles from "../page.module.css";

export const dynamic = "force-dynamic";

export default async function CareerResponsePage() {
  const d = await loadLatestSnapshot(dashboardData);
  return (
    <main className={styles.page}>
      <header className={styles.subTop}>
        <div><div className={styles.kicker}>Career response</div><h1 className={styles.subTitle}>Where is software demand moving?</h1><p className={styles.dek}>This page tracks which engineering specialties are strengthening, weakening or becoming more senior-heavy, and whether any adjacent path is actually better than staying in SWE.</p></div>
        <aside className={styles.stamp}><span>Last research pass</span><strong>{d.updatedAt}</strong><span>Next refresh</span><strong>{d.nextRefresh}</strong></aside>
      </header>
      <DashboardNav active="response" />

      <section className={styles.callout}><span>Current read</span><strong>MOVE WITHIN SWE BEFORE MOVING OUT OF SWE</strong><p>Current evidence favors systems/domain-heavy engineering, AI/ML infrastructure, distributed systems and trading infrastructure over generic implementation-heavy work.</p></section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Skill-migration tracker</h2><p>Every category will accumulate repeated NYC counts, employer breadth, YOE requirements, compensation and seniority mix.</p></div>
        <div className={styles.skillGrid}>
          {[
            ["Backend / application", "CORE BASELINE"],
            ["Platform / distributed systems", "TRACKING"],
            ["Cloud infrastructure", "TRACKING"],
            ["Developer productivity", "BASELINE NEXT REFRESH"],
            ["AI / ML infrastructure", "TRACKING"],
            ["Data / ML infrastructure", "BASELINE NEXT REFRESH"],
            ["Security", "BASELINE NEXT REFRESH"],
            ["FDE / Sales Engineering", "TRACKING"],
            ["Quant / eTrading / market data", "TRACKING"],
            ["Hardware / AI compute software", "TRACKING"],
          ].map(([name,status])=><article key={name}><strong>{name}</strong><span>{status}</span></article>)}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Current pivot radar</h2><p>Status is provisional until repeated trend history is deep enough to show 4w/12w/YoY movement.</p></div>
        <div className={styles.radar}>{d.pivotRadar.map((r)=><article className={styles.radarItem} key={r.area}><h3>{r.area}</h3><span className={styles.radarStatus}>{r.status}</span><p><strong>Evidence:</strong> {r.evidence}<br/><strong>Track:</strong> {r.track}</p><span className={styles.radarFit}>Fit: {r.fit}</span></article>)}</div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Decision hierarchy</h2><p>The dashboard should prefer the least disruptive response that actually improves risk.</p></div>
        <div className={styles.riskGrid}>
          <article className={styles.riskCard}><span className={styles.riskLabel}>1 · Stay put</span><strong>IF MID-LEVEL STABLE</strong><p>Keep building ownership and agent leverage while the market remains employable.</p></article>
          <article className={styles.riskCard}><span className={styles.riskLabel}>2 · Move within SWE</span><strong>FIRST DEFENSE</strong><p>Shift toward systems, infra, domain depth, performance, reliability or integration.</p></article>
          <article className={styles.riskCard}><span className={styles.riskLabel}>3 · Adjacent technical path</span><strong>ONLY IF STRONGER</strong><p>FDE, AI infra, quant/eTrading or similar paths need better demand and realistic accessibility.</p></article>
          <article className={styles.riskCard}><span className={styles.riskLabel}>4 · Leave SWE</span><strong>HIGH THRESHOLD</strong><p>Requires corroborated experienced displacement plus a clearly superior alternative.</p></article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2>Current NYC role sample</h2><p>Examples only. Trend conclusions come from repeated category data, not individual postings.</p></div>
        <div className={styles.jobs}>{d.jobs.filter((j)=>j.category !== "Core SWE").map((j)=><a className={styles.job} href={j.url} target="_blank" rel="noreferrer" key={`${j.company}-${j.role}`}><div className={styles.jobTop}><span className={styles.jobCat}>{j.category}</span><span className={styles.jobComp}>{j.comp}</span></div><h3>{j.role}</h3><p>{j.company} · {j.location}</p></a>)}</div>
      </section>

      <footer className={styles.footer}>The question is not which role sounds most AI-proof. It is which path has sustained demand, accessible entry requirements, strong compensation, useful skill overlap and lower replacement risk than your current path.</footer>
      <Link className={styles.back} href="/">← Career gameplan</Link>
    </main>
  );
}
