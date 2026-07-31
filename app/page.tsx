"use client";

import { useEffect, useMemo, useState } from "react";

type Item = { id: string; title: string; detail: string; output?: string };
type Branch = { id: string; name: string; eyebrow: string; fit: string; focus: string[]; targets: string[]; avoid: string[]; plan: Item[] };

const core: Item[] = [
  { id: "perf", title: "Performance engineering", detail: "Diagnose p99 regressions: profiler traces, GC, lock contention, queueing, TCP behavior, backpressure, and capacity limits.", output: "Write one incident-style performance memo: symptom → evidence → change → measured result." },
  { id: "eval", title: "Evaluation judgment", detail: "Move beyond LLM-as-a-judge: golden sets, failure taxonomies, human calibration, false accept/reject tradeoffs, launch thresholds, canaries, and rollback rules.", output: "Create an eval spec with metrics that actually gate a launch." },
  { id: "integrate", title: "Messy integrations", detail: "Work with uncooperative APIs, undocumented schemas, conflicting sources, auth boundaries, partial failures, migrations, and idempotent recovery.", output: "Ship or simulate one workflow spanning three systems you did not design." },
  { id: "tradeoffs", title: "Architecture under constraints", detail: "Make and defend choices across latency, cost, reliability, data quality, delivery speed, and organizational reality—not just idealized system design.", output: "Two-page design: alternatives considered, decision, risks, operating model." },
  { id: "discovery", title: "Requirements discovery", detail: "Turn vague asks into users, workflows, constraints, success metrics, unacceptable failures, approval boundaries, and a two-week smallest useful release.", output: "Run a written discovery exercise before implementation." },
  { id: "demo", title: "Technical trust", detail: "Explain a system clearly: what it does, why it is safe enough, what it cannot do, what breaks, and what you personally own.", output: "Record a 10-minute architecture and live-failure demo." },
  { id: "debug", title: "Cross-system debugging", detail: "Trace failures through model, data, API, queue, storage, cloud, and client boundaries; distinguish correlation from root cause.", output: "Create a failure drill and recovery runbook." },
];

const branches: Branch[] = [
  { id: "fde", name: "FDE / AI Deployment", eyebrow: "Primary bet", fit: "Best fit for your existing Amazon ML/GenAI + platform résumé; build the customer-delivery layer without a career reset.", focus: ["Ambiguous workflow → scoped prototype in days", "Customer-environment integration and data access", "Agent/tool guardrails, auditability, and escalation", "Demos, workshops, change requests, architecture defense"], targets: ["AI Deployment Engineer", "Forward Deployed Engineer", "Applied AI Engineer", "AI Solutions Engineer", "Technical Consultant — AI"], avoid: ["Prompt-only roles", "Sales roles with no meaningful implementation", "Generic solutions architect roles with no build ownership"], plan: [
    { id: "fde1", title: "Discovery reps", detail: "Take 3 vague business briefs and turn each into discovery questions, a success metric, constraints, and a two-week delivery plan." },
    { id: "fde2", title: "Actionable AI workflow", detail: "Build or extend one workflow with tools, permissions, approval gates, audit traces, failures, and an explicit ‘insufficient evidence’ behavior." },
    { id: "fde3", title: "Customer simulation", detail: "Give a 10-minute demo, then handle a surprise requirement: second data source, new permissions, or a hard latency/cost limit." },
  ]},
  { id: "platform", name: "AI / ML Platform", eyebrow: "Deepen the moat", fit: "You already have credible platform experience. Focus on making high-stakes technical judgment and ownership unmistakable.", focus: ["Evaluation systems tied to business outcomes", "Serving/inference cost, latency, and reliability tradeoffs", "Data quality, lineage, replay, and safe releases", "Platform product thinking: paved roads, adoption, failure modes"], targets: ["AI Platform Engineer", "ML Platform Engineer", "ML Infrastructure Engineer", "Inference Platform Engineer", "Staff-leaning Platform SWE"], avoid: ["Notebook-only ML work", "Vague ‘AI engineer’ roles without production ownership", "Feature teams where platform scope is only a label"], plan: [
    { id: "plat1", title: "Quality-control plane", detail: "Design an evaluation + release-gate system: dataset versioning, calibrated judges, drift signals, canary criteria, and rollback." },
    { id: "plat2", title: "Operating economics", detail: "Model and explain the cost/latency/quality curve of a real inference path. Identify the decision a team should make, not merely the metrics." },
    { id: "plat3", title: "Platform adoption", detail: "Write a short ‘paved road’ proposal: user problem, self-service interface, migration path, limits, and ownership model." },
  ]},
  { id: "genai", name: "GenAI / LLM / Evals", eyebrow: "Specialist branch", fit: "A focused path for reliable AI products—not generic chatbot work—and still compatible with platform or deployment roles.", focus: ["Human-calibrated evals and failure taxonomies", "Retrieval, tool use, structured outputs, and policy boundaries", "Prompt injection, unsafe actions, and evidence-backed answers", "Experiment design that maps model behavior to real outcomes"], targets: ["GenAI Engineer", "LLM Evaluation Engineer", "Applied AI Engineer", "AI Reliability Engineer", "AI Product Infrastructure Engineer"], avoid: ["Prompt-engineering-only titles", "Demo-driven agent projects with no evaluation", "Training-from-scratch roles unless you want research"], plan: [
    { id: "gen1", title: "Evaluation rigour", detail: "Build a representative dataset, label errors by type, calibrate automated scores to humans, and set thresholds for ship/hold/rollback." },
    { id: "gen2", title: "Reliable tool use", detail: "Test malformed outputs, unauthorized tool calls, stale retrieval, timeout chains, duplicates, and hallucinated certainty." },
    { id: "gen3", title: "Decision experiment", detail: "Run a small controlled experiment; document sample bias, confounders, uncertainty, and the business decision the result supports." },
  ]},
  { id: "quant", name: "Quant / Trading Engineering", eyebrow: "Optional branch", fit: "A real technical specialization if market work interests you. Target trading, execution, market data, pricing, or risk—not bank CRUD.", focus: ["Market structure, order books, execution, positions/P&L", "Java performance, concurrency, Linux, networking, profiling", "Probability/statistics, time-series leakage, simulation", "Real-time correctness, replay, sequencing, and failure recovery"], targets: ["Electronic Trading Developer", "Trading Systems Engineer", "Market Data Engineer", "Quantitative Developer", "Front-Office Developer", "Execution Engineer", "Quant Platform / Research Infrastructure Engineer"], avoid: ["Generic ‘markets technology’ without desk/execution/data scope", "Back-office workflow, portals, migrations, compliance form processing", "Generic bank CRUD framed as a quant developer role"], plan: [
    { id: "quant1", title: "Market structure", detail: "Learn matching, bid/ask, spreads, liquidity, order types, fills, slippage, market data, risk checks, and P&L." },
    { id: "quant2", title: "Trading-system core", detail: "Build a correct event-driven limit-order book with price-time priority, cancels, partial fills, sequencing, deterministic replay, and risk limits." },
    { id: "quant3", title: "Performance & probability", detail: "Profile throughput/tail latency; study queues, sockets, CPU/cache/GC behavior, expected value, variance, conditional probability, and time-series leakage." },
  ]},
];

const weeks = ["Baseline + benchmark", "Profiling and p99", "CPU/cache, GC, locks, TCP, queueing", "Experiment design + bias", "Calibration + error tradeoffs", "Launch thresholds + time-series leakage", "Unfamiliar API + auth", "Conflicting data + migrations", "Partial failures + recovery", "Requirements + scope", "Architecture + trust demo", "Surprise change request + branch decision"];

export default function Home() {
  const [branch, setBranch] = useState("fde");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState("");
  const [loaded, setLoaded] = useState(false);
  const selected = branches.find((b) => b.id === branch)!;
  useEffect(() => { const raw = localStorage.getItem("career-gameplan-v1"); if (raw) { const state = JSON.parse(raw); setDone(state.done ?? {}); setNotes(state.notes ?? ""); setBranch(state.branch ?? "fde"); } setLoaded(true); }, []);
  useEffect(() => { if (loaded) localStorage.setItem("career-gameplan-v1", JSON.stringify({ done, notes, branch })); }, [done, notes, branch, loaded]);
  const allItems = useMemo(() => [...core, ...selected.plan], [selected]);
  const completed = allItems.filter((i) => done[i.id]).length;
  const toggle = (id: string) => setDone((old) => ({ ...old, [id]: !old[id] }));
  return <main>
    <section className="hero"><div className="eyebrow">JIMMY WINGERT · CAREER GAMEPLAN</div><h1>Build the judgment<br/>AI won’t hand you.</h1><p>Shared preparation for production AI systems, deployment, and platform work—while keeping a real trading-engineering branch open.</p><div className="goal"><span>North star</span><strong>Maintain $200k+ optionality through senior technical ownership.</strong></div></section>
    <nav aria-label="Career branches">{branches.map((b) => <button className={branch === b.id ? "active" : ""} onClick={() => setBranch(b.id)} key={b.id}>{b.name}</button>)}</nav>
    <section className="status"><div><span className="eyebrow">CURRENT BRANCH</span><h2>{selected.name}</h2><p>{selected.fit}</p></div><div className="progress"><strong>{completed}<small> / {allItems.length}</small></strong><span>items complete</span><div><i style={{ width: `${(completed / allItems.length) * 100}%` }} /></div></div></section>
    <section className="grid top"><article><h3>Shared foundation</h3><p className="muted">This deliberately skips the things your résumé already proves: Python, AWS deployment, streaming, production ML/LLM systems, and distributed systems basics.</p><Checklist items={core} done={done} onToggle={toggle} /></article><article className="branch-card"><span className="eyebrow">{selected.eyebrow}</span><h3>What to deepen</h3><ul>{selected.focus.map((x) => <li key={x}>{x}</li>)}</ul><h4>Target titles</h4><div className="pills">{selected.targets.map((x) => <span key={x}>{x}</span>)}</div></article></section>
    <section className="roadmap"><div><span className="eyebrow">12-WEEK SHARED ROADMAP · ~5 HOURS/WEEK</span><h2>Do the common foundation first. Branch with evidence afterward.</h2><p className="muted">Weeks 1–6 overlap most with trading engineering. Weeks 7–12 overlap most with FDE. All four blocks deepen AI/ML platform work.</p></div><div className="phases"><span>01–03 Performance engineering</span><span>04–06 Statistical judgment</span><span>07–09 Messy integrations</span><span>10–12 FDE judgment</span></div><ol>{weeks.map((week, i) => <li key={week}><b>{String(i + 1).padStart(2, "0")}</b><span>{week}</span><input aria-label={`Mark week ${i + 1} complete`} type="checkbox" checked={!!done[`week-${i}`]} onChange={() => toggle(`week-${i}`)} /></li>)}</ol><div className="deliverables"><p><b>Weeks 1–3:</b> Benchmark and optimize one concurrent Java service; explain why each change worked.</p><p><b>Weeks 4–6:</b> Evaluation harness with human-calibrated metrics and explicit launch thresholds.</p><p><b>Weeks 7–9:</b> Integrate three unrelated systems into one workflow without redesigning them.</p><p><b>Weeks 10–12:</b> Vague brief → two-page design → prototype → 10-minute demo → change request.</p></div></section>
    <section className="grid"><article><span className="eyebrow">BRANCH SYLLABUS</span><h2>{selected.name}</h2><Checklist items={selected.plan} done={done} onToggle={toggle} /></article><article className="avoid"><span className="eyebrow">FILTER THE MARKET</span><h3>Walk away from</h3><ul>{selected.avoid.map((x) => <li key={x}>{x}</li>)}</ul><h4>Decision rule</h4><p>Use actual interviews, work you enjoy, and the kind of problems you want to own—not fear—to decide whether to double down.</p></article></section>
    <section className="notes"><div><span className="eyebrow">PRIVATE NOTES</span><h2>What I’m learning / evidence to capture</h2><p>Saved only in this browser.</p></div><textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Interview signals, projects to pursue at Amazon, examples of ambiguity handled, systems I can explain…" /></section>
    <footer>Built around your current Amazon ML/GenAI platform experience. Keep platform work as the fallback; use the branch as a six-month experiment, not an identity.</footer>
  </main>;
}

function Checklist({ items, done, onToggle }: { items: Item[]; done: Record<string, boolean>; onToggle: (id: string) => void }) {
  return <div className="checklist">{items.map((item) => <label className={done[item.id] ? "checked" : ""} key={item.id}><input type="checkbox" checked={!!done[item.id]} onChange={() => onToggle(item.id)} /><span><b>{item.title}</b><em>{item.detail}</em>{item.output && <small>Output: {item.output}</small>}</span></label>)}</div>;
}
