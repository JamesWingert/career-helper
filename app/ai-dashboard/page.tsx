import Link from "next/link";
import { loadLatestSnapshot } from "../../lib/market-turso";
import { dashboardData } from "./data";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function AiDashboardPage() {
  const d = await loadLatestSnapshot(dashboardData);
  const maxTrueupTrend = Math.max(...d.trueup.categories.map((x) => x.trendPct));
  const maxBenchmark = Math.max(...d.benchmarks.map((x) => x.score));

  const experiencedSignal = d.signals.find((s) => s.signal === "Experienced-worker employment");
  const earlyCareerSignal = d.signals.find((s) => s.signal === "Early-career SWE employment");

  return (
    <main className={styles.page}>
      <header className={styles.top}>
        <div>
          <div className={styles.kicker}>SWE / AI labor market monitor</div>
          <h1 className={styles.title}>Software engineering risk dashboard</h1>
          <p className={styles.dek}>Built around the question that matters most for a roughly 5 YOE engineer: is AI making experienced software engineers harder to employ, or mainly changing how they work?</p>
          <Link className={styles.back} href="/">← Career gameplan</Link>
        </div>
        <aside className={styles.stamp}>
          <span>Last research pass</span>
          <strong>{d.updatedAt}</strong>
          <span>Next refresh</span>
          <strong>{d.nextRefresh}</strong>
        </aside>
      </header>

      <section className={styles.glance} aria-label="Quick glance scoreboard">
        <div className={styles.glanceHead}>
          <span>TL;DR · current read</span>
          <strong>NO PIVOT SIGNAL</strong>
        </div>
        <div className={styles.scoreboard}>
          <article className={styles.scoreCard}>
            <span className={styles.scoreLabel}>Your ~5 YOE risk</span>
            <strong className={styles.scoreValue}>LOW–MODERATE</strong>
            <p>{experiencedSignal?.reading ?? "Experienced workers stable"}</p>
          </article>
          <article className={styles.scoreCard}>
            <span className={styles.scoreLabel}>Mid-level hiring</span>
            <strong className={styles.scoreValue}>WATCH</strong>
            <p>Dedicated 3–5 and 5–8 YOE history begins next refresh.</p>
          </article>
          <article className={styles.scoreCard}>
            <span className={styles.scoreLabel}>Experienced AI replacement</span>
            <strong className={styles.scoreValue}>WEAK EVIDENCE</strong>
            <p>No broad experienced-worker displacement signal yet.</p>
          </article>
          <article className={styles.scoreCard}>
            <span className={styles.scoreLabel}>NYC demand</span>
            <strong className={styles.scoreValue}>{d.linkedin.countLabel}</strong>
            <p>LinkedIn SWE results · directional, not a clean census.</p>
          </article>
          <article className={`${styles.scoreCard} ${styles.canaryCard}`}>
            <span className={styles.scoreLabel}>Early-career canary</span>
            <strong className={styles.scoreValue}>{earlyCareerSignal?.reading ?? "Weak"}</strong>
            <p>Useful leading indicator; lower weight for your own job risk.</p>
          </article>
        </div>
        <div className={styles.oneLine}><b>Bottom line:</b> stay in SWE for now. The dashboard will only move toward a serious pivot signal if experienced hiring/employment weakens, AI-linked headcount substitution becomes credible, realistic production autonomy improves sharply, and an adjacent path has better risk-adjusted demand.</div>
      </section>

      <section className={styles.framework} aria-label="Dashboard framework">
        <article><span>01</span><strong>Personal risk</strong><p>3–5, 5–8 and 8+ YOE demand, compensation, seniority mix and experience inflation.</p></article>
        <article><span>02</span><strong>Labor causality</strong><p>SWE versus the broader white-collar market, separating AI from the hiring cycle.</p></article>
        <article><span>03</span><strong>AI substitution</strong><p>Real production ownership, intervention rate, reliability and experienced-headcount evidence.</p></article>
        <article><span>04</span><strong>Career response</strong><p>Where SWE demand is migrating and whether an adjacent path is actually stronger.</p></article>
      </section>

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
          <h2>1 · Personal risk for ~5 YOE SWE</h2>
          <p>Mid-level and experienced demand now carries more weight than aggregate SWE counts or new-grad weakness.</p>
        </div>
        <div className={styles.riskGrid}>
          <article className={styles.riskCard}><span className={styles.riskLabel}>3–5 YOE demand</span><strong className={styles.pending}>BASELINE NEXT REFRESH</strong><p>Track posting volume, employer breadth, compensation and time-to-hire.</p></article>
          <article className={styles.riskCard}><span className={styles.riskLabel}>5–8 YOE demand</span><strong className={styles.pending}>BASELINE NEXT REFRESH</strong><p>Separates healthy senior demand from a possible squeeze on true mid-level roles.</p></article>
          <article className={styles.riskCard}><span className={styles.riskLabel}>8+ YOE / senior demand</span><strong className={styles.pending}>BASELINE NEXT REFRESH</strong><p>Used as a comparison group, not as a proxy for your own market.</p></article>
          <article className={styles.riskCard}><span className={styles.riskLabel}>Experience inflation</span><strong className={styles.pending}>BASELINE NEXT REFRESH</strong><p>Watch 2–5 YOE jobs drift toward 5–8+ YOE requirements.</p></article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>2 · Hiring market and causality</h2>
          <p>Separate sources stay separate. The new control-group layer will show whether SWE is uniquely weak or moving with the broader professional market.</p>
        </div>
        <div className={styles.controlStrip}>
          <div><span>Software hiring</span><strong>FRED {d.metrics[0].value}</strong><small>Feb 2020 = 100</small></div>
          <div><span>Overall postings control</span><strong className={styles.pending}>BASELINE NEXT REFRESH</strong><small>Indeed/FRED overall U.S. postings</small></div>
          <div><span>White-collar controls</span><strong className={styles.pending}>BASELINE NEXT REFRESH</strong><small>Comparable high-pay professional categories</small></div>
          <div><span>SWE relative weakness</span><strong className={styles.pending}>BASELINE NEXT REFRESH</strong><small>Interpretation only; raw series remain separate</small></div>
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
              <span><strong>TrueUp Tech Trends</strong><br /><span>Recorded separately from LinkedIn and FRED rather than blended into a fake composite.</span></span>
              <b className={styles.linkArrow}>↗</b>
            </a>
            <div className={styles.history}>
              <strong>Trend history starts here</strong>
              <p>First normalized snapshot: {d.history[0].date}. Repeated measurements will support 4-week, 12-week and year-over-year direction.</p>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Experienced-SWE replacement evidence</h2>
          <p>This is deliberately separate from coding benchmarks. A model getting better at tasks is not the same thing as firms replacing experienced engineers.</p>
        </div>
        <div className={styles.replacementPanel}>
          <div className={styles.replacementHeadline}><span className={styles.replacementDot} /> <strong>CURRENT READ: WEAK EVIDENCE OF EXPERIENCED REPLACEMENT</strong></div>
          <div className={styles.replacementGrid}>
            <article><span>Mid-level hiring deterioration</span><strong>WATCH</strong><p>Dedicated seniority history begins next refresh.</p></article>
            <article><span>Reduced backfills</span><strong>NOT BASELINED</strong><p>Track whether firms stop replacing departing experienced engineers.</p></article>
            <article><span>Experienced headcount cuts attributed to AI</span><strong>WEAK</strong><p>Require credible attribution plus actual headcount evidence.</p></article>
            <article><span>Output maintained with fewer engineers</span><strong>WEAK</strong><p>Require measurable output or productivity data, not executive anecdotes.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Observed labor effects</h2>
          <p>Experienced-worker evidence comes first. Early-career weakness remains a canary, not the main personal-risk signal.</p>
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
          <h2>3 · AI substitution capability</h2>
          <p>Benchmarks are treated as capability evidence. Realistic task duration, reliability, intervention rate, cost and messy production ownership matter more than headline scores.</p>
        </div>
        <div className={styles.capabilityNote}><strong>What would materially change the risk read:</strong> agents reliably handling architecture, debugging, incidents, migrations, cross-service integration, security, performance and sustained multi-day production ownership with low human intervention.</div>
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
          <h2>4 · Skill migration and career response</h2>
          <p>Track where engineering demand is moving rather than treating “software engineer” as one homogeneous job.</p>
        </div>
        <div className={styles.skillGrid}>
          {[
            ["Backend / application", "CORE BASELINE"],
            ["Platform / distributed systems", "TRACKING"],
            ["AI / ML infrastructure", "TRACKING"],
            ["Data / ML infrastructure", "START NEXT REFRESH"],
            ["Security", "START NEXT REFRESH"],
            ["Developer productivity", "START NEXT REFRESH"],
            ["FDE / Sales Engineering", "TRACKING"],
            ["Quant / eTrading / market data", "TRACKING"],
            ["Hardware / AI compute software", "TRACKING"],
          ].map(([name, status]) => <article key={name}><strong>{name}</strong><span>{status}</span></article>)}
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
          <p>A small high-signal sample mixing core SWE with systems, AI infrastructure, quant and electronic-trading paths.</p>
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
          <p>Core sources stay stable across refreshes. New sources are added only when they improve seniority, causality, replacement or skill-migration evidence.</p>
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
        Decision rule: do not recommend a serious pivot from SWE unless multiple signals corroborate each other—sustained 4–10 YOE deterioration relative to the broader market, credible AI-linked experienced-headcount substitution, reliable realistic multi-day production autonomy, and a stronger adjacent market that is actually accessible from your experience.
      </footer>
    </main>
  );
}
