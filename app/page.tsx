"use client";

import { useEffect, useMemo, useState } from "react";
import { roleEvidence, studyResources } from "./study-resources";

type Module = {
  id: string;
  label: string;
  title: string;
  topics: string[];
  practice: string;
  proof: string;
};

type Branch = {
  id: string;
  name: string;
  eyebrow: string;
  fit: string;
  focus: string[];
  targets: string[];
  avoid: string[];
  modules: Module[];
};

const sharedPhases = [
  {
    title: "Statistical evaluation judgment",
    weeks: "Weeks 1–3",
    why: "Useful for LLM evals, ML launches, experimentation, and later quant work.",
    modules: [
      { id: "s4", label: "Week 01", title: "Experiments, samples, and uncertainty", topics: ["Hypotheses and decision-oriented metrics", "Sampling bias and representative datasets", "Confounders, randomization, and selection effects", "Confidence intervals and practical significance", "Power, sample size, and noisy measurements"], practice: "Design an experiment for a real model or system change.", proof: "Experiment plan stating the decision, assumptions, failure modes, and required evidence." },
      { id: "s5", label: "Week 02", title: "Human-calibrated evaluation", topics: ["Golden sets and failure taxonomies", "Labeling rubrics and inter-rater disagreement", "Confusion matrices, precision, recall, FPR, FNR", "Judge calibration against human ratings", "Slice analysis across users, languages, and edge cases"], practice: "Calibrate an automated evaluator against a small human-labeled set.", proof: "Error analysis showing where the evaluator can and cannot be trusted." },
      { id: "s6", label: "Week 03", title: "Launch decisions and temporal traps", topics: ["Offline/online metric mismatch", "Time-series leakage and non-stationarity", "Canaries, shadow traffic, and sequential monitoring", "Launch, hold, rollback, and escalation thresholds", "Cost-weighted errors and unacceptable failures"], practice: "Turn evaluation results into an explicit launch policy.", proof: "Ship/hold/rollback rules with owners, thresholds, and production signals." },
    ],
  },
  {
    title: "Discovery, architecture, and handoff",
    weeks: "Weeks 4–6",
    why: "Useful for FDE, platform and research-infrastructure ownership, and architecture interviews.",
    modules: [
      { id: "s10", label: "Week 04", title: "Discovery and ruthless scope", topics: ["Users, current workflow, and actual bottleneck", "Available data and system constraints", "Success metric and unacceptable failure", "Automation vs. human approval", "Two-week smallest useful release"], practice: "Start from a deliberately vague business request and run discovery.", proof: "One-page requirements brief with assumptions, exclusions, and measurable success." },
      { id: "s11", label: "Week 05", title: "Architecture under real constraints", topics: ["Cost, latency, reliability, and quality tradeoffs", "Build vs. buy and prototype vs. production", "Security, governance, and operational ownership", "Alternatives rejected and why", "Trust, limitations, and safe failure"], practice: "Design the system and demonstrate one failure path live.", proof: "Two-page design plus a 10-minute demo for both technical and business audiences." },
      { id: "s12", label: "Week 06", title: "Changing requirements and handoff", topics: ["Second data source or business unit", "New roles and permission boundaries", "Harder cost or latency limit", "What to build, defer, or reject", "Runbook, adoption, support, and ownership transfer"], practice: "Implement a surprise change request without hiding the tradeoffs.", proof: "Revised design, working change, and a clear branch decision for the next phase." },
    ],
  },  {
    title: "Performance engineering",
    weeks: "Weeks 7–9",
    why: "Useful for ML serving, platform work, deployment debugging, and trading systems.",
    modules: [
      { id: "s1", label: "Week 07", title: "Measurement before optimization", topics: ["Throughput vs. latency vs. utilization", "p50/p95/p99 and tail amplification", "Warm-up, JIT effects, measurement noise", "Coordinated omission and realistic load", "Baseline capacity and bottleneck hypotheses"], practice: "Load-test one concurrent Java service under a reproducible workload.", proof: "Baseline report with workload, percentiles, resource use, and three evidence-backed hypotheses." },
      { id: "s2", label: "Week 08", title: "CPU, memory, and JVM behavior", topics: ["Flame graphs and hot-path analysis", "Allocation rate, heap pressure, and object lifetime", "GC collectors, pause time, and safepoints", "CPU caches, locality, false sharing", "JFR, async-profiler, and allocation profiling", "Profiling beyond the JVM: perf, py-spy, and GPU utilization basics"], practice: "Find and fix one CPU or allocation bottleneck without changing behavior.", proof: "Before/after traces plus an explanation of why the change worked." },
      { id: "s3", label: "Week 09", title: "Concurrency, queues, and networks", topics: ["Locks, atomics, contention, and thread pools", "Queue depth, service time, and Little’s Law", "Backpressure, batching, and overload control", "TCP lifecycle, buffers, Nagle, and connection reuse", "Head-of-line blocking and timeout propagation"], practice: "Introduce contention and overload deliberately, then stabilize the service.", proof: "Measured p99 improvement with a short incident-style performance memo." },
    ],
  },
  {
    title: "Messy integration work",
    weeks: "Weeks 10–12",
    why: "Useful wherever the valuable work crosses systems you do not control—especially FDE.",
    modules: [
      { id: "s7", label: "Week 10", title: "Unknown APIs and identity boundaries", topics: ["Reading incomplete API contracts", "OAuth, service identities, scopes, and token lifecycles", "Pagination, rate limits, webhooks, and schema drift", "Contract tests and compatibility layers", "PII, authorization, and least privilege"], practice: "Integrate one unfamiliar API without wrapping it in idealized assumptions.", proof: "A working adapter with contract tests, auth boundaries, and documented limitations." },
      { id: "s8", label: "Week 11", title: "Conflicting data and migrations", topics: ["Source-of-truth decisions", "Entity identity and deduplication", "Reconciliation and conflict resolution", "Idempotency keys and replay", "Backfills, dual writes, cutovers, and rollback"], practice: "Combine two disagreeing data sources and migrate one schema safely.", proof: "Reconciliation rules, migration plan, validation queries, and rollback path." },
      { id: "s9", label: "Week 12", title: "Partial failure and recovery", topics: ["Timeout budgets and bounded retries", "Circuit breakers, DLQs, and poison messages", "Partial completion and compensating actions", "Dependency degradation and graceful fallback", "Audit trails, recovery tooling, and operator UX"], practice: "Break each dependency independently and recover without corrupting state.", proof: "Failure matrix and tested recovery runbook across three connected systems." },
    ],
  },
];

const sharedModules = sharedPhases.flatMap((phase) => phase.modules);

const branches: Branch[] = [
  {
    id: "fde", name: "FDE / AI Deployment", eyebrow: "1 · Primary fit",
    fit: "Adds customer delivery, rapid integration, and outcome ownership to the ML/GenAI platform experience already on your résumé.",
    focus: ["Open-ended customer problems", "Fast end-to-end implementation", "Production AI judgment", "Adoption and measurable outcomes"],
    targets: ["AI Deployment Engineer", "Forward Deployed Engineer — Applied AI", "Forward Deployed Software Engineer", "Forward Deployed AI Engineer", "Forward Deployed Infrastructure Engineer", "Forward Deployed Reliability Engineer", "Applied AI Engineer", "Applied AI Architect", "AI Solutions Engineer", "Customer Engineer — AI/ML", "Solutions Engineer — AI/ML", "AI Implementation Engineer", "Technical Consultant — AI", "GenAI Solutions Architect", "AI Deployment Engineer — Cyber", "Field Security Specialist (Cyber Solutions Engineer)"],
    avoid: ["Prompt-only roles", "Pre-sales jobs with no implementation ownership", "Generic solutions architecture with no production delivery", "‘AI transformation’ roles measured only by presentations"],
    modules: [
      { id: "fde1", label: "Module 01", title: "Customer discovery and workflow mapping", topics: ["Stakeholder map and decision owner", "Current workflow and failure cost", "Data availability and access blockers", "Adoption metric vs. demo metric", "Smallest production-worthy scope"], practice: "Run three discovery simulations from vague briefs.", proof: "Three one-page briefs with success criteria and rejected scope." },
      { id: "fde2", label: "Module 02", title: "Rapid unfamiliar-system integration", topics: ["New SaaS/API in hours, not weeks", "Schema inspection and data mapping", "SSO/SAML/OIDC, SCIM, and tenant boundaries", "Private networking, proxies, and data residency", "Legacy constraints and compatibility shims", "Prototype debt that must be removed"], practice: "Connect three systems you have never used into one workflow.", proof: "Working integration plus contract tests, identity/data-flow map, and an honest productionization gap list." },
      { id: "fde3", label: "Module 03", title: "Production AI workflow design", topics: ["Retrieval, tools, state, and structured outputs", "Model uncertainty and insufficient-evidence behavior", "Human approval for consequential actions", "Auditability and evidence provenance", "Latency, cost, privacy, and reliability decisions"], practice: "Build one AI-assisted workflow that can act safely, not just answer.", proof: "Evaluation results, permission tests, and explicit automation boundaries." },
      { id: "fde4", label: "Module 04", title: "Deployment and operational readiness", topics: ["Customer network and data constraints", "Data flow, retention, residency, and audit evidence", "Observability across browser, API, model, data, and tools", "Fallbacks, escalation, and support model", "Security/governance review", "Launch checklist and owner handoff"], practice: "Prepare the workflow for a hostile enterprise environment.", proof: "Readiness review with launch blockers, data-governance evidence, owners, SLOs, and rollback." },
      { id: "fde5", label: "Module 05", title: "Demo, objection, and change-request handling", topics: ["Executive problem framing", "Technical architecture defense", "Customer-visible UI and end-to-end debugging", "Live failure demonstration", "Handling contradictory stakeholder requests", "Separating immediate changes from roadmap work"], practice: "Run a demo, then accept a surprise requirement and an objection.", proof: "Recorded 10-minute demo, browser-to-model failure trace, and revised delivery plan." },
      { id: "fde6", label: "Module 06", title: "Outcome, adoption, and product feedback", topics: ["Usage and workflow completion", "Quality and human acceptance", "Time or revenue impact", "Rollout communication, training, and support cadence", "Reusable product vs. accelerator vs. customer-specific code", "Feedback that should change the core product"], practice: "Define how a deployment proves durable value after launch.", proof: "30/60/90-day adoption scorecard, productization decision, and product feedback memo." },
    ],
  },
  {
    id: "platform", name: "AI / ML Platform", eyebrow: "2 · Deep technical branch",
    fit: "Closest to your existing experience. The value is deeper serving, evaluation, platform-product, and infrastructure judgment—not relearning cloud basics.",
    focus: ["Model lifecycle and release control", "Serving and inference economics", "Distributed/GPU systems", "Platform adoption and multi-tenancy"],
    targets: ["AI Platform Engineer", "ML Platform Engineer", "ML Infrastructure Engineer", "AI Infrastructure Engineer", "Inference Platform Engineer", "Model Inference Engineer", "Inference Performance Engineer", "Cloud Inference Engineer", "Inference Runtime Engineer", "Model Serving Engineer", "LLM Infrastructure Engineer", "GenAI Platform Engineer", "ML Systems Engineer", "MLOps Platform Engineer", "Evaluation Platform Engineer", "Training Infrastructure Engineer", "Feature Platform Engineer", "Distributed Systems Engineer — ML", "AI Reliability Engineer"],
    avoid: ["Notebook-only ML work", "Generic data engineering relabeled as ML platform", "Feature teams with no platform users or interfaces", "MLOps roles limited to CI scripts and dashboards"],
    modules: [
      { id: "p1", label: "Module 01", title: "Platform boundaries and contracts", topics: ["Control plane vs. data plane", "Training, registry, serving, and evaluation boundaries", "Stable user-facing APIs", "Ownership and failure domains", "Build-vs.-buy decisions"], practice: "Map a complete ML lifecycle and choose explicit platform boundaries.", proof: "Architecture showing contracts, users, ownership, and failure isolation." },
      { id: "p2", label: "Module 02", title: "Data, features, and reproducibility", topics: ["Dataset and feature versioning", "Offline/online consistency", "Point-in-time correctness", "Lineage and deterministic replay", "Data quality gates and backfills"], practice: "Reproduce a historical inference or training run exactly.", proof: "Version manifest, replay test, and mismatch investigation." },
      { id: "p3", label: "Module 03", title: "Orchestration and safe execution", topics: ["DAG semantics and dependency contracts", "Idempotency and retry safety", "Checkpointing and resumability", "Resource isolation and quotas", "Backfill and failure-recovery design"], practice: "Design one workflow that survives retries, partial completion, and replay.", proof: "Failure-state model and tested recovery scenarios." },
      { id: "p4", label: "Module 04", title: "Online and batch inference", topics: ["Dynamic batching and request scheduling", "Autoscaling and cold starts", "Caching, routing, and fallbacks", "Throughput/latency/quality curves", "Real-time vs. asynchronous inference"], practice: "Benchmark two serving designs across load and model choices.", proof: "Recommendation grounded in p99, cost, capacity, and quality." },
      { id: "p5", label: "Module 05", title: "GPU and distributed inference fundamentals", topics: ["Prefill vs. decode; TTFT vs. TPOT", "HBM bandwidth, roofline analysis, and tokens/sec/GPU", "Quantization, KV-cache, and context-length economics", "CUDA/Triton kernels and Nsight profiling", "NCCL, NVLink/InfiniBand, and communication overhead", "Tensor, pipeline, data, expert, and context parallelism", "Admission control, scheduler fairness, and cost-to-serve"], practice: "Profile and model the resource plan for a large-model serving workload.", proof: "Capacity and cost model with hardware bottlenecks, scaling limits, and a measured serving recommendation." },
      { id: "p6", label: "Module 06", title: "Evaluation and release control plane", topics: ["Dataset/prompt/model version graph", "Offline gates and human calibration", "Shadow, canary, and rollback", "Slice regressions and policy checks", "Audit trail for why a version shipped"], practice: "Design a release system that can block a bad model or prompt.", proof: "Launch policy, lineage model, and rollback drill." },
      { id: "p7", label: "Module 07", title: "Monitoring and model-system failures", topics: ["Service health vs. model quality", "Input/output drift", "Silent data corruption", "Feature freshness and retrieval degradation", "Cost, latency, quality, and safety telemetry"], practice: "Create failure signals for one system whose HTTP metrics look healthy.", proof: "Dashboard and alert map tied to operator actions." },
      { id: "p8", label: "Module 08", title: "Platform as an internal product", topics: ["Developer experience and paved roads", "Self-service onboarding", "Multi-tenancy and quotas", "Migration and adoption incentives", "Deprecation, support, and success metrics"], practice: "Propose a platform capability to skeptical internal users.", proof: "RFC with user journey, adoption plan, limits, and ownership model." },
    ],
  },
  {
    id: "research", name: "Research / RL Infrastructure", eyebrow: "3 \u00b7 Frontier-lab systems branch",
    fit: "Builds the environments, graders, and data engines frontier labs train and evaluate models with\u2014systems engineering inside research organizations, no publication record required.",
    focus: ["RL environments and sandboxed execution", "Reward and grader integrity", "Human and synthetic data engines", "Evaluation harnesses and experiment infrastructure"],
    targets: ["Software Engineer \u2014 RL Data", "Environments Infrastructure Engineer", "Evals Infrastructure Engineer", "RL Training Infrastructure Engineer", "Research Tools Engineer", "Research Platform Engineer", "Human Data Engineer", "Research Developer Productivity Engineer", "Agent Environments Engineer", "Simulation Infrastructure Engineer"],
    avoid: ["Labeling-operations roles with no pipeline ownership", "Prompt-only eval tooling", "Research-scientist postings requiring publications", "Annotation vendor management with no systems work"],
    modules: [
      { id: "r1", label: "Module 01", title: "RL fundamentals for engineers", topics: ["Agents, environments, rewards, and episodes", "MDPs, policies, value functions, and returns", "Policy gradients: REINFORCE to PPO/GRPO at working depth", "RLHF, DPO, and verifiable-reward training (RLVR)", "Why RL amplifies infrastructure bugs: nonstationarity and feedback loops"], practice: "Train a small policy-gradient agent end to end and log every moving part.", proof: "Working training run plus a one-page map from each RL concept to the infrastructure it depends on." },
      { id: "r2", label: "Module 02", title: "Environments and sandboxed execution", topics: ["Environment APIs: reset/step semantics, seeding, determinism", "Task design: observation, action, and termination contracts", "Container isolation, syscall filtering, and resource limits", "Checkpointing, replay, and reproducible rollouts", "Scaling rollouts: parallel environments and failure isolation"], practice: "Build one non-trivial agent environment with deterministic replay and isolation boundaries.", proof: "Environment repo with seeded-replay tests and a documented escape/abuse surface." },
      { id: "r3", label: "Module 03", title: "Reward and grader integrity", topics: ["Verifiable rewards vs. model-graded rewards", "Reward-hacking taxonomies and detection", "Grader calibration against human judgment", "Anti-gaming: held-out graders, canaries, and audits", "When a high score means the metric broke"], practice: "Design a reward for a real task, then red-team it until it breaks.", proof: "Reward spec plus a documented exploit and the fix that closes it." },
      { id: "r4", label: "Module 04", title: "Human and synthetic data engines", topics: ["Human feedback pipelines: rubrics, sampling, and QA", "Synthetic generation, filtering, and deduplication", "Data mixing, decontamination, and provenance", "Quality metrics that predict downstream performance", "Batch pipelines vs. always-on data flywheels"], practice: "Build a small synthetic-data pipeline with quality gates and dedup.", proof: "Dataset with lineage metadata and a quality report tied to a downstream eval." },
      { id: "r5", label: "Module 05", title: "Evaluation harnesses at scale", topics: ["Task registries and versioned eval configs", "Deterministic scoring and transcript capture", "Agent evals: multi-turn, tools, and environment state", "Regression detection and slice reporting", "Cost, caching, and parallel execution"], practice: "Stand up an eval harness for one capability and wire it into a regression gate.", proof: "Harness run with versioned tasks, stored transcripts, and a regression report." },
      { id: "r6", label: "Module 06", title: "Experiment infrastructure and reproducibility", topics: ["Experiment tracking, artifacts, and lineage", "Distributed rollouts: tasks, actors, and queues", "GPU scheduling, preemption, and fair-share", "Deterministic seeds and config snapshots", "Research ergonomics: fast iteration without footguns"], practice: "Reproduce one of your own training runs exactly, one week later.", proof: "Two identical runs with tracked configs, seeds, data versions, and artifacts." },
    ],
  },
  {
    id: "quant", name: "Quant / Trading Engineering", eyebrow: "4 · Harder optional branch",
    fit: "A serious systems specialization. It preserves software-engineering leverage, but requires market-domain depth plus stronger performance, networking, and correctness work.",
    focus: ["Market and exchange mechanics", "Low-latency concurrent systems", "Linux, networking, and hardware awareness", "Probability, simulation, risk, and correctness"],
    targets: ["Quantitative Developer", "Quantitative Software Engineer", "Electronic Trading Developer", "Algorithmic Trading Developer", "Electronic Execution Engineer", "Smart Order Router Engineer", "Trading Systems Engineer", "Trading Platform Engineer", "Software Engineer — Trading Strategies", "Software Engineer — Automated Trading Systems", "Market Data Engineer", "Feed Handler Engineer", "Exchange Connectivity Engineer", "FIX Connectivity Engineer", "Execution Engineer", "OMS / Execution Platform Engineer", "Low-Latency Java / C++ Engineer", "Front-Office Developer", "Desk Developer", "Strats Developer", "Quant Platform Engineer", "Research Infrastructure Engineer", "Research Platform Engineer", "Pricing & Risk Developer", "Trading Infrastructure Engineer", "Trading Production Engineer", "Trading Network Engineer"],
    avoid: ["Generic ‘markets technology’ with no desk, execution, pricing, or market-data scope", "Back-office workflow, portals, basic migrations, and form processing", "Generic bank CRUD labeled quantitative developer", "Roles where traders/quants are distant internal customers and engineering owns no trading outcome"],
    modules: [
      { id: "q1", label: "Module 01", title: "Market structure and participants", topics: ["Exchanges, brokers, market makers, and institutional investors", "Bid, ask, spread, depth, liquidity, and volatility", "Maker/taker fees and rebates", "Continuous books vs. auctions", "Equities, futures, options, FX, and fixed income basics"], practice: "Trace one order from decision through exchange execution and clearing.", proof: "Diagram and glossary explaining participants, messages, costs, and risks." },
      { id: "q2", label: "Module 02", title: "Orders and matching engines", topics: ["Market, limit, stop, IOC, FOK, and post-only orders", "Price-time and pro-rata priority", "Add, modify, cancel, reject, and partial fill", "Crossed markets, halts, and auction states", "Order-book invariants and deterministic behavior"], practice: "Implement a price-time-priority matching engine.", proof: "Property tests for ordering, cancels, partial fills, and invariants." },
      { id: "q3", label: "Module 03", title: "Market data systems", topics: ["Trades, quotes, depth, symbology, and reference data", "Snapshots, incremental updates, and sequence numbers", "Gap detection, recovery, packet capture, and replay", "Event time, receive time, and clock synchronization", "ITCH/OUCH, multicast, and binary protocols", "Venue onboarding, conformance, and protocol migrations"], practice: "Build a feed handler that reconstructs a book and recovers gaps.", proof: "Property and parser-fuzz tests plus deterministic replay across duplicates, loss, reordering, and a schema change." },
      { id: "q4", label: "Module 04", title: "Order management and execution", topics: ["Order state machines and acknowledgments", "Exchange gateways, FIX, and session recovery", "Venue certification and conformance tests", "Pre-trade risk and kill switches", "Execution algorithms: TWAP, VWAP, participation", "Slippage, transaction cost, and fill quality"], practice: "Add an order gateway, risk checks, one execution algorithm, and a simulated venue certification flow.", proof: "State-transition and race-condition tests plus an execution-quality report." },
      { id: "q5", label: "Module 05", title: "Concurrent runtime design", topics: ["Thread ownership and message passing", "Locks, atomics, CAS, and memory ordering", "False sharing and cache-line contention", "Ring buffers and bounded queues", "Garbage-free hot paths and object pooling tradeoffs"], practice: "Build two concurrency designs and compare under burst load.", proof: "Throughput, p99, allocation, and correctness comparison." },
      { id: "q6", label: "Module 06", title: "Linux and hardware performance", topics: ["Processes, threads, scheduling, and affinity", "Context switches, syscalls, and page faults", "CPU caches, branch prediction, NUMA", "perf, flame graphs, eBPF, and hardware counters", "Huge pages, memory locking, and noisy neighbors"], practice: "Profile a latency spike down to runtime or hardware behavior.", proof: "Evidence chain from symptom to counter/trace to verified fix." },
      { id: "q7", label: "Module 07", title: "Low-latency networking", topics: ["TCP vs. UDP and multicast", "Socket buffers, Nagle, busy polling, and epoll", "Packet loss, duplication, and reordering", "Serialization, framing, and zero-copy tradeoffs", "Kernel bypass and user-space networking conceptually"], practice: "Benchmark a small message pipeline across protocol and batching choices.", proof: "Latency distribution and explanation of every major tradeoff." },
      { id: "q8", label: "Module 08", title: "Data layout and hot-path algorithms", topics: ["Primitive collections and memory layout", "Arrays vs. trees vs. hash maps for books", "Binary encoding and decimal precision", "Copy avoidance and cache locality", "Benchmark hygiene and misleading microbenchmarks"], practice: "Optimize one order-book hot path without losing correctness.", proof: "JMH-style benchmark, profiler evidence, and regression tests." },
      { id: "q9", label: "Module 09", title: "Probability and statistics", topics: ["Expected value, variance, covariance, and correlation", "Conditional probability and Bayes’ rule", "Common distributions and estimation", "Confidence intervals and hypothesis testing", "Regression, overfitting, and multiple testing"], practice: "Analyze noisy simulated execution results and state uncertainty honestly.", proof: "Notebook or report separating signal, uncertainty, and unsupported claims." },
      { id: "q10", label: "Module 10", title: "Backtesting and simulation correctness", topics: ["Event-driven simulation", "Look-ahead, survivorship, and time-series leakage", "Latency, queue position, slippage, fees, and partial fills", "Train/validation/test splits through time", "Reproducibility and sensitivity analysis"], practice: "Backtest a simple execution rule with realistic frictions.", proof: "Bias checklist, sensitivity results, and a refusal to claim fake alpha." },
      { id: "q11", label: "Module 11", title: "Positions, P&L, and risk", topics: ["Positions, cash, realized and unrealized P&L", "Fees, FX conversion, settlement, and lot accounting", "Corrections, busts, corporate actions, and mark selection", "Exposure, limits, concentration, and kill behavior", "Hedging and Greeks at a conceptual level", "Drawdown, volatility, and scenario stress", "Reconciliation and end-of-day controls"], practice: "Add position/P&L tracking, risk limits, and reconciliation breaks to the simulator.", proof: "Tests for fills, fees, FX, marks, corrections, limit breaches, settlement, and reconciliation." },
      { id: "q12", label: "Module 12", title: "Trading-engineering capstone", topics: ["Feed → book → strategy → risk → gateway → fills", "Replay, packet recovery, and disaster recovery", "Property/state-machine tests and malformed-message fuzzing", "Sustained load, coordinated-omission-safe latency testing", "Operational dashboards, kill switch, and reconciliation", "Release/rollback procedure and incident drill", "Architecture and failure-mode defense"], practice: "Integrate the complete event-driven trading simulator and operate it through a failure drill.", proof: "Working system, benchmark report, test evidence, runbook, architecture document, and deep-dive demo." },
    ],
  },  {
    id: "genai", name: "GenAI / LLM / Evals", eyebrow: "5 · AI systems branch",
    fit: "Deepens reliable LLM applications and evaluation systems without drifting into research-model training or generic chatbot work.",
    focus: ["Model behavior and inference", "Retrieval and agent reliability", "Human-calibrated evaluation", "Safety, observability, and cost"],
    targets: ["GenAI Engineer", "LLM Engineer", "Applied AI Engineer", "AI Product Engineer", "Backend Software Engineer — Evals", "LLM Evaluation Engineer", "AI Evaluation Engineer", "AI Quality Engineer", "AI Reliability Engineer", "Agent Infrastructure Engineer", "Agent Systems Engineer", "RAG / Retrieval Engineer", "AI Systems Engineer", "AI Safety Engineer — Evals", "AI Product Infrastructure Engineer", "LLM Platform Engineer"],
    avoid: ["Prompt-engineering-only titles", "Demo-driven agent work with no evaluation", "Generic full-stack roles with one model call", "Research roles centered on training foundation models"],
    modules: [
      { id: "g1", label: "Module 01", title: "Model behavior and inference", topics: ["Tokenization and context windows", "Sampling, temperature, and nondeterminism", "Structured outputs and constrained decoding", "Model selection and routing", "Latency and token economics"], practice: "Compare multiple models on one real task under fixed constraints.", proof: "Decision memo across quality, consistency, latency, and cost." },
      { id: "g2", label: "Module 02", title: "Retrieval systems", topics: ["Chunking and document structure", "Sparse, dense, and hybrid retrieval", "Reranking and query rewriting", "Recall/precision evaluation", "Freshness, permissions, and citations"], practice: "Build and evaluate two retrieval strategies on the same corpus.", proof: "Retrieval benchmark plus error slices and access-control tests." },
      { id: "g3", label: "Module 03", title: "Tools, agents, and workflow state", topics: ["Tool selection and argument validation", "State machines vs. open-ended loops", "Idempotent and partially completed side effects", "Context compaction and memory lifecycle", "Tool-schema versioning", "Long-running work, recovery, and resume", "Human approval and escalation"], practice: "Implement one bounded, recoverable tool-using workflow.", proof: "Trace-based tests for success, denial, timeout, partial side effect, retry, compaction, and resume." },
      { id: "g4", label: "Module 04", title: "Evaluation design", topics: ["Task and failure taxonomy", "Representative golden sets", "Deterministic and rubric graders", "LLM judge calibration", "Confidence, slices, and regression thresholds"], practice: "Build an eval suite that detects a meaningful regression.", proof: "Calibrated results plus a documented blind spot." },
      { id: "g5", label: "Module 05", title: "Safety and adversarial behavior", topics: ["Prompt injection and indirect injection", "Data exfiltration and tool abuse", "Privilege boundaries", "Unsupported claims and evidence requirements", "Content and business-policy enforcement"], practice: "Red-team retrieval and tool use, including cross-tenant attacks.", proof: "Threat model, adversarial set, mitigations, and residual risk." },
      { id: "g6", label: "Module 06", title: "Reliability and observability", topics: ["Model/tool/retrieval traces", "Timeouts, retries, and fallbacks", "Invalid or partial outputs", "Quality-aware monitoring", "Audit logs and incident diagnosis"], practice: "Inject model, tool, database, and retrieval failures.", proof: "Failure matrix with safe behavior and operator action." },
      { id: "g7", label: "Module 07", title: "Optimization and operating economics", topics: ["Prompt/context reduction", "Caching and batching", "Small/large model routing", "Asynchronous workflows", "Quality loss per dollar or millisecond saved"], practice: "Cut operating cost or latency without crossing a quality threshold.", proof: "Pareto curve and recommendation for a real workload." },
      { id: "g8", label: "Module 08", title: "Production experiment and launch", topics: ["Offline-to-online validation", "Shadow and canary design", "Human acceptance signals", "Adoption and workflow outcomes", "Rollback and continuous evaluation"], practice: "Plan a launch where a high offline score is insufficient evidence.", proof: "Launch plan tied to user behavior, quality, risk, and business impact." },
    ],
  },
];

export default function Home() {
  const [branch, setBranch] = useState("fde");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const selected = branches.find((candidate) => candidate.id === branch) ?? branches[0];

  useEffect(() => {
    try {
      const raw = localStorage.getItem("career-gameplan-v2") ?? localStorage.getItem("career-gameplan-v1");
      if (raw) {
        const state = JSON.parse(raw);
        setDone(state.done ?? {});
        setBranch(branches.some((candidate) => candidate.id === state.branch) ? state.branch : "fde");
      }
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("career-gameplan-v2", JSON.stringify({ done, branch }));
  }, [done, branch, loaded]);

  const trackModules = useMemo(() => [...sharedModules, ...selected.modules], [selected]);
  const completed = trackModules.filter((module) => done[module.id]).length;
  const toggle = (id: string) => setDone((old) => ({ ...old, [id]: !old[id] }));

  return <main>
    <section className="hero">
      <div className="eyebrow">JIMMY WINGERT · CAREER GAMEPLAN</div>
      <h1>Build the judgment<br />AI won’t hand you.</h1>
      <p>A concrete shared syllabus for production AI systems and deployment, followed by deep branches you can choose using actual market evidence.</p>
      <div className="goal"><span>North star</span><strong>Maintain $200k+ optionality through senior technical ownership.</strong></div>
    </section>

    <nav aria-label="Career branches">{branches.map((candidate, index) => <button className={branch === candidate.id ? "active" : ""} onClick={() => setBranch(candidate.id)} key={candidate.id}>{index + 1} · {candidate.name}</button>)}</nav>

    <section className="status">
      <div><span className="eyebrow">CURRENT BRANCH</span><h2>{selected.name}</h2><p>{selected.fit}</p></div>
      <div className="progress"><strong>{completed}<small> / {trackModules.length}</small></strong><span>modules complete</span><div><i style={{ width: `${(completed / trackModules.length) * 100}%` }} /></div></div>
    </section>

    <section className="overview">
      <article className="why"><span className="eyebrow">WHY THE SHARED CORE EXISTS</span><h3>It trains the layer common to every path.</h3><p>Performance diagnosis, statistical judgment, integration failure, and architecture decisions show up in AI platform, GenAI/evals, FDE, and trading engineering. The core gives you 12 weeks of reusable work before you spend months on a narrower domain.</p><p className="skip"><b>Already covered by your résumé:</b> Python, AWS deployment, ML pipelines, model serving, streaming, distributed systems, LLM integration, and production reliability.</p><p className="resource-note"><b>How to use the reading list:</b> Follow the named chapters, lectures, labs, or documentation sections—not the whole resource unless it is explicitly assigned.</p></article>
      <article className="branch-card"><span className="eyebrow">{selected.eyebrow}</span><h3>What this branch adds</h3><ul>{selected.focus.map((item) => <li key={item}>{item}</li>)}</ul></article>
    </section>

    <section className="syllabus">
      <header><span className="eyebrow">12-WEEK SHARED SYLLABUS · ~5 HOURS/WEEK</span><h2>Common foundation</h2><p>Ordered by AI-resistance: evaluation judgment and discovery first, then the measurement and integration mechanics you still need to know cold. All four phases deepen every branch.</p></header>
      {sharedPhases.map((phase) => <section className="phase" key={phase.title}>
        <div className="phase-heading"><div><span>{phase.weeks}</span><h3>{phase.title}</h3></div><p>{phase.why}</p></div>
        <div className="module-grid">{phase.modules.map((module) => <ModuleCard key={module.id} module={module} checked={!!done[module.id]} onToggle={toggle} />)}</div>
      </section>)}
    </section>

    <section className="branch-section">
      <header><span className="eyebrow">DEEP-DIVE BRANCH</span><h2>{selected.name}</h2><p>Complete this after the shared core—or start selectively if interviews expose a specific gap.</p></header>
      <div className="module-grid branch-modules">{selected.modules.map((module) => <ModuleCard key={module.id} module={module} checked={!!done[module.id]} onToggle={toggle} />)}</div>
    </section>

    <section className="market-grid">
      <article><span className="eyebrow">SEARCH THESE TITLES</span><h3>Target roles</h3><div className="pills">{selected.targets.map((target) => <span key={target}>{target}</span>)}</div></article>
      <article className="avoid"><span className="eyebrow">FILTER THE MARKET</span><h3>Walk away from</h3><ul>{selected.avoid.map((item) => <li key={item}>{item}</li>)}</ul></article>
    </section>

    <section className="role-proof"><header><span className="eyebrow">CURRENT ROLE CHECK</span><h2>Why this syllabus maps to the work</h2><p>Representative current postings—not a promise that every company uses the same title.</p></header><div>{roleEvidence[selected.id].map((role) => <a href={role.url} target="_blank" rel="noreferrer" key={`${role.company}-${role.title}`}><span>{role.company}</span><h3>{role.title}</h3><p>{role.signals}</p><b>View posting ↗</b></a>)}</div></section>

    <footer>Built around your actual Amazon ML/GenAI platform experience. The shared core is reusable; each branch is a deliberate second phase.</footer>
  </main>;
}

function ModuleCard({ module, checked, onToggle }: { module: Module; checked: boolean; onToggle: (id: string) => void }) {
  const resources = studyResources[module.id] ?? [];
  return <article className={`module-card ${checked ? "complete" : ""}`}>
    <div className="module-top"><span>{module.label}</span><label><input type="checkbox" checked={checked} onChange={() => onToggle(module.id)} /><i aria-hidden="true" /><b>{checked ? "Done" : "Mark done"}</b></label></div>
    <h4>{module.title}</h4>
    <ul>{module.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
    <div className="exercise"><span>Practice</span><p>{module.practice}</p><span>Proof</span><p>{module.proof}</p></div>
    {resources.length > 0 && <details className="resources"><summary>Study resources <b>{resources.length}</b></summary><div>{resources.map((resource, index) => <a href={resource.url} target="_blank" rel="noreferrer" key={`${resource.title}-${index}`}><span className="resource-meta">{resource.format} · {resource.access}</span><strong>{resource.title}</strong><em>{resource.provider}</em><p><b>Use:</b> {resource.selection}</p><small>{resource.purpose}</small></a>)}</div></details>}
  </article>;
}
