import Link from "next/link";
import { loadLatestSnapshot } from "../../lib/market-turso";
import { dashboardData } from "./data";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function AiDashboardPage() {
  const d = await loadLatestSnapshot(dashboardData);
  const maxTrueupTrend = Math.max(...d.trueup.categories.map((x) => x.trendPct));
  const maxBenchmark = Math.max(...d.benchmarks.map((x) => x.score));

  return (
    <main className={styles.page}>
      <header className={styles.top}>
        <div>
          <div className={styles.kicker}>SWE / AI labor market monitor</div>
          <h1 className={styles.title}>Is software engineering actually getting automated away?</h1>
          <p className={styles.dek}>
            A biweekly evidence dashboard tracking hiring, displacement, frontier coding capability,
            NYC openings and adjacent career paths. The point is to detect sustained changes early,
            not react to model launches or executive predictions.
          </p>
          <div className={styles.read}>{d.currentRead}</div>
          <Link className={styles.back} href="/">← Career gameplan</Link>
        </div>
        <aside className={styles.stamp}>
          <span>Last research pass</span>
          <strong>{d.updatedAt}</strong>
          <span>Next scheduled refresh</span>
          <strong>{d.nextRefresh}</strong>
          <span>Cadence</span>
          <strong>{d.cadence}</strong>
        </aside>
      </header>

      <section className={styles.metrics} aria-label="Headline indicators">
        {d.metrics.map((m) => (
          <article className={styles.metric} key={m.label}>
            <span className={styles.metricLabel}>{m.label}</span>
            <strong className={styles.metricValue}>{m.value}</strong>
            <span className={styles.metricNote}>{m.note}</span>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Hiring market</h2>
          <p>Separate sources are kept separate. FRED/Indeed covers the broader U.S. posting index; TrueUp focuses on tech companies; LinkedIn gives a noisy but useful NYC pulse.</p>
        </div>
        <div className={styles.twoCol}>
          <article className={styles.panel}>
            <h3>TrueUp job-category momentum</h3>
            <div className={styles.panelMeta}>As of {d.trueup.asOf} · {d.trueup.methodology}</div>
            {d.trueup.categories.map((item) => (
              <div className={styles.row} key={item.name}>
                <span className={styles.rowName}>{item.name}</span>
                <span className={styles.barTrack} aria-hidden="true">
                  <i className={styles.bar} style={{ width: `${Math.max(5, (item.trendPct / maxTrueupTrend) * 100)}%` }} />
                </span>
                <span className={styles.rowVal}>+{item.trendPct}%</span>
              </div>
            ))}
            <a className={styles.linkCard} href={d.trueup.source} target="_blank" rel="noreferrer">
              <span><strong>Open the live TrueUp category chart</strong><br /><span>{d.trueup.softwareJobs.toLocaleString()} software jobs in the latest stored snapshot</span></span>
              <b className={styles.linkArrow}>↗</b>
            </a>
          </article>

          <article className={styles.panel}>
            <h3>NYC software pulse</h3>
            <div className={styles.panelMeta}>Same public queries are repeated every two weeks so directional changes are comparable.</div>
            <a className={styles.linkCard} href={d.linkedin.source} target="_blank" rel="noreferrer">
              <span><strong>LinkedIn · {d.linkedin.query}</strong><br /><span>{d.linkedin.countLabel} results · {d.linkedin.note}</span></span>
              <b className={styles.linkArrow}>↗</b>
            </a>
            <a className={styles.linkCard} href={d.trueup.chartSource} target="_blank" rel="noreferrer">
              <span><strong>TrueUp Tech Trends</strong><br /><span>Source for the widely shared open-tech-jobs graphics; this dashboard records the data instead of depending on screenshots.</span></span>
              <b className={styles.linkArrow}>↗</b>
            </a>
            <div className={styles.history}>
              <strong>Trend history starts here</strong>
              <p>First normalized snapshot: {d.history[0].date}. After several cycles this panel can show 4-week, 12-week and year-over-year direction for each source rather than one-off counts.</p>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Observed labor effects</h2>
          <p>Employment evidence gets more weight than predictions from labs, CEOs or social-media posts.</p>
        </div>
        <div className={styles.signalGrid}>
          {d.signals.map((s) => (
            <article className={styles.signal} key={s.signal}>
              <div className={styles.signalTop}>
                <h3>{s.signal}</h3>
                <span className={styles.badge}>{s.direction}</span>
              </div>
              <div className={styles.signalReading}>{s.reading}</div>
              <p>{s.interpretation}</p>
              <a href={s.source} target="_blank" rel="noreferrer">source ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Frontier coding capability</h2>
          <p>Harder agent benchmarks and long-horizon evaluations are more relevant here than isolated code-generation benchmarks.</p>
        </div>
        <table className={styles.benchmark}>
          <thead><tr><th>Model</th><th>DeepSWE</th><th>Reported cost</th><th>Evaluation</th></tr></thead>
          <tbody>
            {d.benchmarks.map((b) => (
              <tr key={b.model}>
                <td>{b.model}</td>
                <td><div className={styles.scoreWrap}><div className={styles.scoreBar}><i style={{ width: `${(b.score / maxBenchmark) * 100}%` }} /></div><strong>{b.score}%</strong></div></td>
                <td>{b.cost}</td>
                <td>{b.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Pivot radar</h2>
          <p>These are not recommendations based on hype. Each category is tracked for sustained posting growth, NYC depth, compensation, employer breadth and transferability from software engineering.</p>
        </div>
        <div className={styles.radar}>
          {d.pivotRadar.map((r) => (
            <article className={styles.radarItem} key={r.area}>
              <h3>{r.area}</h3>
              <span className={styles.radarStatus}>{r.status}</span>
              <p><strong>Evidence:</strong> {r.evidence}<br /><strong>Biweekly track:</strong> {r.track}</p>
              <span className={styles.radarFit}>Fit: {r.fit}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Current NYC role sample</h2>
          <p>A small high-signal sample, not a giant scrape. It intentionally mixes core SWE with systems, AI infrastructure, quant and electronic-trading paths.</p>
        </div>
        <div className={styles.jobs}>
          {d.jobs.map((j) => (
            <a className={styles.job} href={j.url} target="_blank" rel="noreferrer" key={`${j.company}-${j.role}`}>
              <div className={styles.jobTop}><span className={styles.jobCat}>{j.category}</span><span className={styles.jobComp}>{j.comp}</span></div>
              <h3>{j.role}</h3>
              <p>{j.company} · {j.location}</p>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Source stack</h2>
          <p>Every refresh should preserve the same core sources, record their dates, and flag methodology changes instead of silently splicing incompatible series.</p>
        </div>
        <div className={styles.sourceGrid}>
          {d.sources.map(([metric, source, url]) => (
            <a className={styles.source} href={url} target="_blank" rel="noreferrer" key={metric}>
              <b>{metric}</b><span>{source} ↗</span>
            </a>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        Counts from public job boards are imperfect and can be rounded, duplicated or indexed late. The useful signal is repeated movement under a stable query. The dashboard should only escalate a pivot category after several consistent snapshots or corroboration across independent sources.
      </footer>
    </main>
  );
}
