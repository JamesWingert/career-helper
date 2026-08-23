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

  return (
    <main className={styles.page}>
      <header className={styles.top}>
        <div>
          <h1 className={styles.title}>SWE market</h1>
          <p className={styles.dek}>Current hiring, experience-level demand, AI displacement evidence, and adjacent technical markets.</p>
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
          <p>Values are kept separate; no composite risk score.</p>
        </header>
        <div className={styles.tableWrap}>
          <table className={styles.dataTable}>
            <thead><tr><th>Measure</th><th>Current</th><th>Comparison</th><th>As of</th><th>Source</th></tr></thead>
            <tbody>
              <tr><td>U.S. software-development postings</td><td className={styles.value}>{sweIndex.toFixed(2)}</td><td>{signed(sweIndex - 100)} vs. Feb. 2020</td><td>{d.metrics[0].note.split(" · ")[0]}</td><td><a href={d.sources[0][2]} target="_blank" rel="noreferrer">FRED / Indeed ↗</a></td></tr>
              <tr><td>Overall U.S. postings</td><td className={styles.value}>{overallIndex.toFixed(2)}</td><td>{signed(overallIndex - 100)} vs. Feb. 2020</td><td>{details.overallPostings.asOf}</td><td><a href="https://fred.stlouisfed.org/series/IHLIDXUS" target="_blank" rel="noreferrer">FRED / Indeed ↗</a></td></tr>
              <tr><td>SWE relative to overall postings</td><td className={styles.value}>{signed(relativeGap)}</td><td>{(sweIndex - overallIndex).toFixed(2)} index points</td><td>{details.overallPostings.asOf}</td><td>Calculated from the two series above</td></tr>
              <tr><td>TrueUp software openings</td><td className={styles.value}>{d.trueup.softwareJobs.toLocaleString()}</td><td>{signed(d.trueup.softwareTrendPct)} TrueUp trend</td><td>{d.trueup.asOf}</td><td><a href={d.trueup.source} target="_blank" rel="noreferrer">TrueUp ↗</a></td></tr>
              <tr><td>NYC LinkedIn software-engineer search</td><td className={styles.value}>{d.linkedin.countLabel}</td><td>Repeatable public query; rounded count</td><td>{d.linkedin.asOf}</td><td><a href={d.linkedin.source} target="_blank" rel="noreferrer">LinkedIn ↗</a></td></tr>
              <tr><td>BLS software-developer projection</td><td className={styles.value}>+{details.bls.growthPct}%</td><td>+{details.bls.jobsAdded.toLocaleString()} jobs, {details.bls.period}</td><td>2026 release</td><td><a href={details.bls.source} target="_blank" rel="noreferrer">BLS ↗</a></td></tr>
            </tbody>
          </table>
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
        <div className={styles.tableWrap}>
          <table className={styles.dataTable}>
            <thead><tr><th>Indeed seniority measure</th><th>Current</th><th>Comparison window</th><th>What it says</th></tr></thead>
            <tbody>
              <tr><td>Mid-level postings</td><td className={styles.value}>{signed(details.seniority.midChangePct)}</td><td>{details.seniority.comparison}</td><td>Demand deteriorated.</td></tr>
              <tr><td>Senior postings</td><td className={styles.value}>{signed(details.seniority.seniorChangePct)}</td><td>{details.seniority.comparison}</td><td>Demand improved.</td></tr>
              <tr><td>Senior share of software-development postings</td><td className={styles.value}>{details.seniority.seniorSharePct}%</td><td>Q1 2026</td><td>The market is heavily senior-weighted.</td></tr>
            </tbody>
          </table>
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
        <div className={styles.tableWrap}>
          <table className={styles.dataTable}>
            <thead><tr><th>Measure</th><th>Current evidence</th><th>Scope</th><th>Source</th></tr></thead>
            <tbody>
              <tr><td>Early-career SWE employment</td><td className={styles.value}>{earlyCareer?.reading ?? "Nearly -20% vs. 2024"}</td><td>Ages 22–25; strongest negative labor signal</td><td><a href={earlyCareer?.source} target="_blank" rel="noreferrer">Stanford ↗</a></td></tr>
              <tr><td>Experienced-worker employment</td><td className={styles.value}>{experienced?.reading ?? "No comparable decline"}</td><td>Expansion remains visible in older groups</td><td><a href={experienced?.source} target="_blank" rel="noreferrer">Stanford ↗</a></td></tr>
              <tr><td>Experienced-SWE company substitution</td><td className={styles.value}>No qualifying observation stored</td><td>Requires experienced headcount or backfill reduction, stable/rising output, and explicit AI attribution</td><td><a href="https://www.sec.gov/edgar/search/" target="_blank" rel="noreferrer">SEC / company disclosures ↗</a></td></tr>
              <tr><td>AI-agent deployment in business functions</td><td className={styles.value}>{businessAgents?.reading ?? "Single digits"}</td><td>Adoption remains early</td><td><a href={businessAgents?.source} target="_blank" rel="noreferrer">Stanford AI Index ↗</a></td></tr>
              <tr><td>Frontier autonomous task horizon</td><td className={styles.value}>{d.metrics[5].value}</td><td>50% success horizon; not a workday-equivalent claim</td><td><a href={d.sources[6][2]} target="_blank" rel="noreferrer">METR ↗</a></td></tr>
              <tr><td>Top DeepSWE score</td><td className={styles.value}>{d.benchmarks[0].score}%</td><td>{d.benchmarks[0].model} · {d.benchmarks[0].note}</td><td><a href={d.sources[7][2]} target="_blank" rel="noreferrer">DeepSWE ↗</a></td></tr>
              <tr><td>SWE-Bench Pro reliability warning</td><td className={styles.value}>{benchmarkReliability?.reading ?? "~30% estimated broken"}</td><td>Benchmark-quality caveat</td><td><a href={benchmarkReliability?.source} target="_blank" rel="noreferrer">Analysis ↗</a></td></tr>
            </tbody>
          </table>
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
        <div className={styles.tableWrap}>
          <table className={styles.dataTable}>
            <thead><tr><th>Area</th><th>Available market evidence</th><th>Résumé fit</th></tr></thead>
            <tbody>{d.pivotRadar.map((row) => <tr key={row.area}><td>{row.area}</td><td>{row.evidence}</td><td className={styles.value}>{row.fit}</td></tr>)}</tbody>
          </table>
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
