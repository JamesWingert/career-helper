import { loadLatestSnapshot } from "../../lib/market-turso";
import { dashboardData, longitudinalMethod, sourceArchitecture } from "./data";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

function signed(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export default async function AiDashboardPage() {
  const d = await loadLatestSnapshot(dashboardData);
  const details = d.marketDetails ?? dashboardData.marketDetails;
  const revelio = d.revelio ?? dashboardData.revelio;
  const sweIndex = Number(d.metrics[0].value);
  const overallIndex = details.overallPostings.value;
  const relativeGap = ((sweIndex - overallIndex) / overallIndex) * 100;
  const experienced = d.signals.find((signal) => signal.signal === "Experienced-worker employment");
  const earlyCareer = d.signals.find((signal) => signal.signal === "Early-career SWE employment");
  const businessAgents = d.signals.find((signal) => signal.signal === "AI agents in business");
  const benchmarkReliability = d.signals.find((signal) => signal.signal === "Benchmark reliability");
  const snapshotMetrics = [
    { label: "U.S. software postings", value: sweIndex.toFixed(2), comparison: `${signed(sweIndex - 100)} vs. Feb. 2020`, asOf: d.metrics[0].note.split(" · ")[0], source: "FRED / Indeed", href: d.sources[0][2], tone: "down" },
    { label: "Overall U.S. postings", value: overallIndex.toFixed(2), comparison: `${signed(overallIndex - 100)} vs. Feb. 2020`, asOf: details.overallPostings.asOf, source: "FRED / Indeed", href: "https://fred.stlouisfed.org/series/IHLIDXUS", tone: "neutral" },
    { label: "SWE gap vs. overall", value: signed(relativeGap), comparison: `${(sweIndex - overallIndex).toFixed(2)} index points`, asOf: details.overallPostings.asOf, source: "Calculated from FRED series", tone: "down" },
    { label: "TrueUp software openings", value: d.trueup.softwareJobs.toLocaleString(), comparison: `${signed(d.trueup.softwareTrendPct)} TrueUp trend`, asOf: d.trueup.asOf, source: "TrueUp", href: d.trueup.source, tone: "up" },
    { label: "NYC LinkedIn search", value: d.linkedin.countLabel, comparison: "Rounded public result count", asOf: d.linkedin.asOf, source: "LinkedIn", href: d.linkedin.source, tone: "neutral" },
    { label: "BLS 10-year projection", value: `+${details.bls.growthPct}%`, comparison: `+${details.bls.jobsAdded.toLocaleString()} jobs, ${details.bls.period}`, asOf: "2026 release", source: "BLS", href: details.bls.source, tone: "up" },
  ];
  const aiEvidence = [
    { label: "Early-career SWE employment", value: earlyCareer?.reading ?? "Nearly -20% vs. 2024", scope: "Ages 22–25; strongest negative labor signal", source: "Stanford", href: earlyCareer?.source, tone: "warning" },
    { label: "Experienced-worker employment", value: experienced?.reading ?? "No comparable decline", scope: "Expansion remains visible in older groups", source: "Stanford", href: experienced?.source, tone: "steady" },
    { label: "Experienced-SWE substitution", value: "No qualifying observation stored", scope: "Requires headcount reduction, stable output, and explicit AI attribution", source: "Company disclosures", href: "https://www.sec.gov/edgar/search/", tone: "steady" },
    { label: "AI agents in business functions", value: businessAgents?.reading ?? "Single digits", scope: "Adoption remains early", source: "Stanford AI Index", href: businessAgents?.source, tone: "steady" },
    { label: "Autonomous task horizon", value: d.metrics[5].value, scope: "50% success horizon; not a workday-equivalent claim", source: "METR", href: d.sources[6][2], tone: "capability" },
    { label: "Top DeepSWE score", value: `${d.benchmarks[0].score}%`, scope: `${d.benchmarks[0].model} · ${d.benchmarks[0].note}`, source: "DeepSWE", href: d.sources[7][2], tone: "capability" },
    { label: "SWE-Bench Pro caveat", value: benchmarkReliability?.reading ?? "~30% estimated broken", scope: "Benchmark-quality warning", source: "Analysis", href: benchmarkReliability?.source, tone: "warning" },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.top}>
        <div>
          <span className={styles.topKicker}>Evidence dashboard</span>
          <h1 className={styles.title}>SWE market</h1>
          <p className={styles.dek}>Hiring demand, experience-level shifts, AI displacement evidence, and technical paths—kept separate so one noisy signal does not tell the whole story.</p>
        </div>
        <dl className={styles.stamp}>
          <div><dt>Data through</dt><dd>{d.updatedAt}</dd></div>
          <div><dt>Refresh</dt><dd>{d.cadence}</dd></div>
        </dl>
      </header>

      <nav className={styles.sectionNav} aria-label="SWE market sections">
        <a href="#snapshot">Snapshot</a>
        <a href="#experience">Experience</a>
        <a href="#ai-impact">AI impact</a>
        <a href="#paths">Technical paths</a>
        <a href="#sources">Sources &amp; method</a>
      </nav>

      <section className={styles.readout}>
        <div>
          <span>Current read</span>
          <h2>Weak hiring. Strong senior tilt. No broad experienced-SWE displacement yet.</h2>
        </div>
        <dl>
          <div><dt>SWE vs. 2020</dt><dd>{signed(sweIndex - 100)}</dd></div>
          <div><dt>Mid-level since Jan. 2025</dt><dd>{signed(details.seniority.midChangePct)}</dd></div>
          <div><dt>Senior since Jan. 2025</dt><dd>{signed(details.seniority.seniorChangePct)}</dd></div>
          <div><dt>Senior share</dt><dd>{details.seniority.seniorSharePct}%</dd></div>
        </dl>
      </section>

      <section className={styles.section} id="snapshot">
        <header className={styles.sectionHead}>
          <div><span>01</span><h2>Market snapshot</h2></div>
          <p>Six signals, each with its own scope and date.</p>
        </header>
        <div className={styles.metricGrid}>
          {snapshotMetrics.map((metric) => <article className={styles[metric.tone]} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.comparison}</p>
            <footer><time>{metric.asOf}</time>{metric.href ? <a href={metric.href} target="_blank" rel="noreferrer">{metric.source} ↗</a> : <span>{metric.source}</span>}</footer>
          </article>)}
        </div>
        <details className={styles.details}>
          <summary>Revelio actual-worker baseline · {revelio.occupation}</summary>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead><tr><th>Measure</th><th>Current</th><th>Month over month</th><th>Year over year</th><th>Availability / scope</th></tr></thead>
              <tbody>
                <tr><td>Estimated employment</td><td className={styles.value}>{revelio.employmentThousands.toLocaleString()}k</td><td>{revelio.employmentChangeMomThousands.toFixed(1)}k</td><td>{revelio.employmentChangeYoyThousands.toFixed(1)}k</td><td>Public monthly series · {revelio.asOf}</td></tr>
                <tr><td>Active job openings</td><td className={styles.value}>{revelio.jobOpenings.toLocaleString()}</td><td>{signed(revelio.jobOpeningsMomPct)}</td><td>{signed(revelio.jobOpeningsYoyPct)}</td><td>Public monthly series · {revelio.asOf}</td></tr>
                <tr><td>Hiring rate</td><td className={styles.value}>{revelio.hiringRatePct.toFixed(1)}%</td><td>{revelio.hiringChangeMomPp > 0 ? "+" : ""}{revelio.hiringChangeMomPp.toFixed(1)} pp</td><td>{revelio.hiringChangeYoyPp.toFixed(1)} pp</td><td>Annualized worker-flow rate · {revelio.asOf}</td></tr>
                <tr><td>Attrition rate</td><td className={styles.value}>{revelio.attritionRatePct.toFixed(1)}%</td><td>{revelio.attritionChangeMomPp.toFixed(1)} pp</td><td>{revelio.attritionChangeYoyPp.toFixed(1)} pp</td><td>Annualized worker-flow rate · {revelio.asOf}</td></tr>
                <tr><td>Salary in new postings</td><td className={styles.value}>${revelio.newPostingSalary.toLocaleString()}</td><td>{signed(revelio.salaryChangeMomPct)}</td><td>{signed(revelio.salaryChangeYoyPct)}</td><td>Posted-salary measure · {revelio.asOf}</td></tr>
              </tbody>
            </table>
          </div>
          <p className={styles.detailNote}>{revelio.note} <a href={revelio.source} target="_blank" rel="noreferrer">Revelio release and downloads ↗</a></p>
        </details>
      </section>

      <section className={styles.section} id="experience">
        <header className={styles.sectionHead}>
          <div><span>02</span><h2>Experience-level demand</h2></div>
          <p>LinkedIn buckets are platform labels, not literal years of experience.</p>
        </header>
        <div className={styles.splitTables}>
          <article>
            <h3>LinkedIn seniority pulse</h3>
            <table className={styles.compactTable}>
              <tbody>
                <tr><th>Entry level</th><td>{details.linkedinSeniority.entry.toLocaleString()}</td><td>Public Software Developer · NYC</td></tr>
                <tr><th>Associate</th><td>{details.linkedinSeniority.associate.toLocaleString()}</td><td>LinkedIn-defined bucket</td></tr>
                <tr><th>Mid-Senior</th><td>{details.linkedinSeniority.midSenior.toLocaleString()}</td><td>Too broad to proxy ~5 YOE</td></tr>
                <tr><th>Any time</th><td>{details.linkedinSeniority.anyTime.toLocaleString()}</td><td>Same public search</td></tr>
              </tbody>
            </table>
          </article>
          <article>
            <h3>Posting freshness</h3>
            <table className={styles.compactTable}>
              <tbody>
                <tr><th>Past 24 hours</th><td>{details.linkedinSeniority.pastDay.toLocaleString()}</td><td>{((details.linkedinSeniority.pastDay / details.linkedinSeniority.anyTime) * 100).toFixed(1)}% of indexed results</td></tr>
                <tr><th>Past week</th><td>{details.linkedinSeniority.pastWeek.toLocaleString()}</td><td>{((details.linkedinSeniority.pastWeek / details.linkedinSeniority.anyTime) * 100).toFixed(1)}%</td></tr>
                <tr><th>Past month</th><td>{details.linkedinSeniority.pastMonth.toLocaleString()}</td><td>{((details.linkedinSeniority.pastMonth / details.linkedinSeniority.anyTime) * 100).toFixed(1)}%</td></tr>
                <tr><th>Snapshot date</th><td colSpan={2}>{details.linkedinSeniority.asOf}</td></tr>
              </tbody>
            </table>
          </article>
        </div>
        <div className={styles.signalStrip}>
          <article><span>Mid-level postings</span><strong className={styles.negative}>{signed(details.seniority.midChangePct)}</strong><p>{details.seniority.comparison} · demand deteriorated</p></article>
          <article><span>Senior postings</span><strong className={styles.positive}>{signed(details.seniority.seniorChangePct)}</strong><p>{details.seniority.comparison} · demand improved</p></article>
          <article><span>Senior share</span><strong>{details.seniority.seniorSharePct}%</strong><p>Q1 2026 · heavily senior-weighted</p></article>
        </div>
        <details className={styles.details}>
          <summary>Granular YOE, skills, salary, and posting-persistence layer</summary>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead><tr><th>Source</th><th>Priority</th><th>Availability</th><th>Planned use</th><th>Confidence</th></tr></thead>
              <tbody>
                <tr><td><a href="https://docs.lightcast.io/data/docs/job-posting-analytics-jpa-methodology" target="_blank" rel="noreferrer">Lightcast ↗</a></td><td className={styles.value}>High-priority optional</td><td>Public/free-access data only unless credentials become available</td><td>Deduplicated YOE bands, 5-YOE accessibility, skills, salary, employer breadth, freshness, and persistence</td><td>No dashboard microdata loaded; no values inferred</td></tr>
                <tr><td>Repeated description sample</td><td className={styles.value}>Core fallback</td><td>Public postings where descriptions can be inspected consistently</td><td>Literal minimum YOE and title classification, kept separate from LinkedIn seniority labels</td><td>Medium; report sample size and missingness</td></tr>
              </tbody>
            </table>
          </div>
        </details>
      </section>

      <section className={styles.section} id="ai-impact">
        <header className={styles.sectionHead}>
          <div><span>03</span><h2>AI impact</h2></div>
          <p>Observed labor outcomes first; model capability second.</p>
        </header>
        <div className={styles.evidenceList}>
          {aiEvidence.map((item) => <article className={styles[item.tone]} key={item.label}>
            <div><span>{item.label}</span><strong>{item.value}</strong></div>
            <p>{item.scope}</p>
            <a href={item.href} target="_blank" rel="noreferrer">{item.source} ↗</a>
          </article>)}
        </div>
        <details className={styles.details}>
          <summary>Model benchmark detail</summary>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead><tr><th>Model</th><th>DeepSWE</th><th>Reported cost</th><th>Evaluation</th></tr></thead>
              <tbody>{d.benchmarks.map((benchmark) => <tr key={benchmark.model}><td>{benchmark.model}</td><td className={styles.value}>{benchmark.score}%</td><td>{benchmark.cost}</td><td>{benchmark.note}</td></tr>)}</tbody>
            </table>
          </div>
        </details>
      </section>

      <section className={styles.section} id="paths">
        <header className={styles.sectionHead}>
          <div><span>04</span><h2>Technical paths</h2></div>
          <p>Current demand evidence and NYC role examples—not a ranking.</p>
        </header>
        <div className={styles.pathCards}>
          {d.pivotRadar.map((row, index) => <article key={row.area}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{row.area}</h3>
            <p>{row.evidence}</p>
            <strong>{row.fit}</strong>
          </article>)}
        </div>
        <details className={styles.details}>
          <summary>TrueUp technology-category data</summary>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead><tr><th>Category</th><th>Open jobs</th><th>TrueUp trend</th></tr></thead>
              <tbody>{d.trueup.categories.map((category) => <tr key={category.name}><td>{category.name}</td><td>{category.jobs.toLocaleString()}</td><td className={styles.value}>{signed(category.trendPct)}</td></tr>)}</tbody>
            </table>
          </div>
        </details>
        <details className={styles.details}>
          <summary>Current NYC role sample ({d.jobs.filter((job) => job.category !== "Core SWE").length})</summary>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead><tr><th>Area</th><th>Company</th><th>Role</th><th>Listed compensation</th></tr></thead>
              <tbody>{d.jobs.filter((job) => job.category !== "Core SWE").map((job) => <tr key={`${job.company}-${job.role}`}><td>{job.category}</td><td>{job.company}</td><td><a href={job.url} target="_blank" rel="noreferrer">{job.role} ↗</a></td><td className={styles.value}>{job.comp}</td></tr>)}</tbody>
            </table>
          </div>
        </details>
      </section>

      <section className={styles.section} id="sources">
        <header className={styles.sectionHead}>
          <div><span>05</span><h2>Sources &amp; methodology</h2></div>
          <p>Availability and confidence are explicit; unavailable data never becomes an invented value.</p>
        </header>
        <div className={styles.tableWrap}>
          <table className={styles.dataTable}>
            <thead><tr><th>Source / role</th><th>Availability</th><th>Confidence</th><th>What it adds</th><th>Guardrail</th></tr></thead>
            <tbody>
              {sourceArchitecture.map((source) => <tr key={source.source}><td><a href={source.url} target="_blank" rel="noreferrer">{source.source} ↗</a><br />{source.role}</td><td>{source.availability}</td><td>{source.confidence}</td><td>{source.use}</td><td>{source.limit}</td></tr>)}
            </tbody>
          </table>
        </div>
        <details className={styles.details}>
          <summary>Longitudinal collection rules</summary>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <tbody>{longitudinalMethod.map((rule, index) => <tr key={rule}><td className={styles.value}>{String(index + 1).padStart(2, "0")}</td><td>{rule}</td></tr>)}</tbody>
            </table>
          </div>
        </details>
        <ul className={styles.sources}>
          {d.sources.map(([label, provider, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer"><strong>{label}</strong><span>{provider} ↗</span></a></li>)}
        </ul>
      </section>

      <footer className={styles.footer}>Counts from public job-search pages are directional and may include duplicates or indexing lag. Each value is shown with its scope and date.</footer>
    </main>
  );
}
