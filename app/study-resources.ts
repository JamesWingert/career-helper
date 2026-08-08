export type StudyResource = {
  title: string;
  provider: string;
  url: string;
  format: "Course" | "Book" | "Guide" | "Docs" | "Paper" | "Talk";
  access: "Free" | "Paid" | "Free / paid edition";
  selection: string;
  purpose: string;
};

export type RoleEvidence = {
  company: string;
  title: string;
  url: string;
  signals: string;
};

export const studyResources: Record<string, StudyResource[]> = {
  s1: [
    { title: "Java Performance, 2nd Edition", provider: "Scott Oaks / O’Reilly", url: "https://www.oreilly.com/library/view/java-performance-2nd/9781492056102/", format: "Book", access: "Paid", selection: "Chapter 2, An Approach to Performance Testing: throughput, response time, variability, benchmark scope, warm-up, and JMH.", purpose: "Builds credible baselines before any JVM optimization." },
    { title: "Systems Performance, 2nd Edition", provider: "Brendan Gregg / O’Reilly", url: "https://www.oreilly.com/library/view/systems-performance-2nd/9780136821694/toc.xhtml", format: "Book", access: "Paid", selection: "Chapter 2 §§2.3, 2.5, 2.7–2.8 and Chapter 12 §§12.2–12.4: methodologies, utilization, saturation, capacity, and benchmarking.", purpose: "Connects system measurements to defensible bottleneck hypotheses." },
    { title: "How NOT to Measure Latency", provider: "Gil Tene / Strange Loop", url: "https://www.youtube.com/watch?v=lJ8ydIuPFeU", format: "Talk", access: "Free", selection: "Watch the talk; focus on coordinated omission, percentile distributions, warm-up, and load-generation mistakes.", purpose: "Prevents deceptively good p99 results under overload." },
  ],
  s2: [
    { title: "Java Performance, 2nd Edition", provider: "Scott Oaks / O’Reilly", url: "https://www.oreilly.com/library/view/java-performance-2nd/9781492056102/", format: "Book", access: "Paid", selection: "Chapters 3–7 plus Chapter 9 sections on false sharing and lock monitoring: profiling, JIT, GC, heap behavior, contention, and locality.", purpose: "Provides the JVM mechanisms needed to explain profiler evidence." },
    { title: "Troubleshoot Performance Issues Using Flight Recorder", provider: "Oracle", url: "https://docs.oracle.com/en/java/javase/21/troubleshoot/troubleshoot-performance-issues-using-jfr.html", format: "Docs", access: "Free", selection: "Find Bottlenecks, Garbage Collection Performance, Synchronization Performance, I/O, and Code Execution.", purpose: "A repeatable JFR/JMC investigation workflow for production-style incidents." },
    { title: "async-profiler", provider: "async-profiler project", url: "https://github.com/async-profiler/async-profiler", format: "Docs", access: "Free", selection: "Basic usage and CPU, allocation, lock, wall-clock, and hardware-counter profiling; generate and interpret flame graphs.", purpose: "Turns JVM theory into evidence from a running service." },
    { title: "Linux perf examples", provider: "Brendan Gregg", url: "https://www.brendangregg.com/perf.html", format: "Guide", access: "Free", selection: "One-liners, CPU sampling, and flame-graph generation; profile one non-JVM process (Python or GPU host-side) the same way you profiled the JVM.", purpose: "Makes the profiling method portable across every runtime the five branches use." },
  ],
  s3: [
    { title: "Java Performance, 2nd Edition", provider: "Scott Oaks / O’Reilly", url: "https://www.oreilly.com/library/view/java-performance-2nd/9781492056102/", format: "Book", access: "Paid", selection: "Chapter 9 and Chapter 10 sections on NIO, server thread pools, asynchronous REST, and outbound calls.", purpose: "Covers contention, task granularity, thread-pool sizing, and server concurrency." },
    { title: "Systems Performance, 2nd Edition", provider: "Brendan Gregg / O’Reilly", url: "https://www.oreilly.com/library/view/systems-performance-2nd/9780136821694/toc.xhtml", format: "Book", access: "Paid", selection: "Chapter 10 §§10.2–10.8: TCP, sockets, buffers, latency, throughput, and network observability.", purpose: "Adds the network layer behind queueing and timeout symptoms." },
    { title: "Addressing Cascading Failures", provider: "Google SRE", url: "https://sre.google/sre-book/addressing-cascading-failures/", format: "Book", access: "Free", selection: "Server Overload, Preventing Server Overload, Queue Management, and Testing Until Failure.", purpose: "Connects queues, backpressure, load shedding, and retries to system collapse." },
  ],
  s4: [
    { title: "NIST/SEMATECH e-Handbook of Statistical Methods", provider: "NIST", url: "https://www.itl.nist.gov/div898/handbook/dtoc.htm", format: "Book", access: "Free", selection: "§§5.1.1, 7.1.3–7.1.5, and 7.2.2.2: experiment design, hypothesis tests, confidence intervals, power, and sample size.", purpose: "Supplies the statistical mechanics for decision-oriented experiments." },
    { title: "Trustworthy Online Controlled Experiments", provider: "Kohavi, Tang, and Xu / Cambridge", url: "https://experimentguide.com/", format: "Book", access: "Paid", selection: "Chapters 17–22: statistical foundations, sensitivity, A/A tests, triggering, sample-ratio mismatch, leakage, and interference.", purpose: "Covers production experimentation traps that clean textbook examples omit." },
    { title: "How Not to Run an A/B Test", provider: "Evan Miller", url: "https://www.evanmiller.org/how-not-to-run-an-ab-test.html", format: "Guide", access: "Free", selection: "Read in full (short); focus on the peeking problem and why stopping a test early invalidates significance; pair with his sample-size calculator.", purpose: "The canonical free warning on the most common way experiments silently lie." },
  ],
  s5: [
    { title: "Demystifying evals for AI agents", provider: "Anthropic Engineering", url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents", format: "Guide", access: "Free", selection: "Structure of an Evaluation, Types of Graders, Capability vs. Regression Evals, balanced problem sets, transcript inspection, and human review.", purpose: "A practical end-to-end framework for building and auditing evals." },
    { title: "Classification metrics and bias", provider: "Google Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall", format: "Course", access: "Free", selection: "Accuracy/Precision/Recall, ROC and AUC, threshold exercises, then Identifying Bias and slice analysis.", purpose: "Builds the confusion-matrix and threshold judgment needed to calibrate automated judges." },
    { title: "Evaluation best practices", provider: "OpenAI", url: "https://developers.openai.com/api/docs/guides/evaluation-best-practices", format: "Guide", access: "Free", selection: "Designing evals, Tips, and Anti-patterns; create one representative set, rubric, and human-calibration plan.", purpose: "Keeps the eval tied to real tasks and explicit failure criteria." },
    { title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena", provider: "Zheng et al. / NeurIPS 2023", url: "https://arxiv.org/abs/2306.05685", format: "Paper", access: "Free", selection: "Sections 3–4: judge biases (position, verbosity, self-enhancement) and the agreement analysis between LLM judges and human raters.", purpose: "The canonical measurement of when an automated judge can and cannot substitute for humans." },
    { title: "Your AI Product Needs Evals", provider: "Hamel Husain", url: "https://hamel.dev/blog/posts/evals/", format: "Guide", access: "Free", selection: "The eval-levels framework, error-analysis workflow, and the section on looking at your data; build one failure taxonomy from real transcripts.", purpose: "Practitioner-grade guidance on rubrics and error analysis — the inter-rater/labeling gap the other sources skip." },
  ],
  s6: [
    { title: "Production ML systems: Monitoring", provider: "Google Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring", format: "Course", access: "Free", selection: "Training-serving skew, label leakage, live model quality, monitoring signals, and fractional rollout.", purpose: "Connects offline results to the signals that decide a production launch." },
    { title: "Canarying Releases", provider: "Google SRE Workbook", url: "https://sre.google/workbook/canarying-releases/", format: "Book", access: "Free", selection: "Canary parameters, evaluators, SLO criteria, automated decisions, and rollout policies.", purpose: "Provides a concrete launch, hold, and rollback framework." },
    { title: "Time Series Cross-Validation", provider: "Forecasting: Principles and Practice", url: "https://otexts.com/fpp3/tscv.html", format: "Book", access: "Free", selection: "§5.10; implement rolling-origin evaluation and compare it with a random split.", purpose: "Prevents future-data leakage and unrealistic temporal validation." },
    { title: "The ML Test Score: A Rubric for ML Production Readiness", provider: "Breck et al. / Google", url: "https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/", format: "Paper", access: "Free", selection: "Score one real system against all 28 tests (data, model, infrastructure, monitoring); record the failing tests as launch blockers or accepted risks.", purpose: "Turns ‘is this ready to ship?’ from a feeling into a checklist with evidence." },
  ],
  s7: [
    { title: "OAuth 2.0 Security Best Current Practice", provider: "IETF RFC 9700", url: "https://www.rfc-editor.org/rfc/rfc9700.html", format: "Docs", access: "Free", selection: "§§2–4: attacker model, token replay, privilege restriction, sender-constrained tokens, and mitigations.", purpose: "Covers scopes, tokens, refresh behavior, and least-privilege boundaries." },
    { title: "Google Cloud API Design Guide", provider: "Google Cloud", url: "https://docs.cloud.google.com/apis/design", format: "Guide", access: "Free", selection: "AIP-132 pagination, AIP-180 backward compatibility, AIP-185 versioning, and AIP-193 errors.", purpose: "Teaches how to survive pagination, schema evolution, errors, and version changes." },
    { title: "Writing consumer tests", provider: "Pact", url: "https://docs.pact.io/consumer", format: "Docs", access: "Free", selection: "Consumer-driven contract model, matching rules, provider states, and tests through the real API client.", purpose: "Turns third-party behavior into executable compatibility evidence." },
  ],
  s8: [
    { title: "Designing Data-Intensive Applications, 2nd Edition", provider: "Kleppmann and Riccomini / O’Reilly", url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/", format: "Book", access: "Paid", selection: "The Encoding and Evolution chapter: encoding formats, modes of dataflow, forward/backward compatibility, and schema evolution.", purpose: "Establishes a compatibility model for systems that change independently." },
    { title: "Parallel Change", provider: "Martin Fowler", url: "https://martinfowler.com/bliki/ParallelChange.html", format: "Guide", access: "Free", selection: "Expand, Migrate, and Contract; apply the sequence to one incompatible schema change.", purpose: "A safe pattern for compatibility-preserving migrations." },
    { title: "Cutover stage", provider: "AWS Prescriptive Guidance", url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/best-practices-migration-cutover/cutover-stage.html", format: "Guide", access: "Free", selection: "Phased cutover, rollback criteria, changed-data rollback, validation, and dual-write considerations.", purpose: "Adds the operational plan behind backfills, reconciliation, and rollback." },
  ],
  s9: [
    { title: "Timeouts, retries, and backoff with jitter", provider: "AWS Builders’ Library", url: "https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter", format: "Guide", access: "Free", selection: "Timeout selection, retry amplification, capped exponential backoff, jitter, token buckets, and deployment connection warm-up.", purpose: "Teaches bounded retry behavior that does not create an outage storm." },
    { title: "Making retries safe with idempotent APIs", provider: "AWS Builders’ Library", url: "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/", format: "Guide", access: "Free", selection: "Client request identifiers, semantic equivalence, duplicate suppression, late-arriving requests, and safe retry contracts.", purpose: "Makes recovery correct when a caller cannot know whether work completed." },
    { title: "Circuit Breaker and Compensating Transaction", provider: "Microsoft Azure Architecture Center", url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker", format: "Guide", access: "Free", selection: "Closed/open/half-open states and retry interaction; then follow Compensating Transaction for irreversible steps and audit.", purpose: "Covers graceful degradation and recovery after partial completion." },
  ],
  s10: [
    { title: "The Mom Test", provider: "Rob Fitzpatrick", url: "https://www.momtestbook.com/", format: "Book", access: "Paid", selection: "Chapter 1 pp. 11–26 and Chapter 5 pp. 73–84: useful questions, facts over compliments, commitment, and advancement.", purpose: "Teaches discovery that finds real workflow pain instead of polite validation." },
    { title: "Shape Up", provider: "Basecamp", url: "https://basecamp.com/shapeup/1.2-chapter-03", format: "Book", access: "Free", selection: "Set Boundaries, Risks and Rabbit Holes, and Write the Pitch.", purpose: "Converts a vague ask into appetite, boundaries, risks, no-gos, and smallest useful scope." },
    { title: "Identifying and scaling AI use cases", provider: "OpenAI", url: "https://openai.com/business/guides-and-resources/identifying-and-scaling-ai-use-cases/", format: "Guide", access: "Free", selection: "Opportunity identification, workflow mapping, prioritization, and impact/effort framework.", purpose: "Applies discovery directly to viable enterprise AI opportunities." },
    { title: "Technical Writing One", provider: "Google for Developers", url: "https://developers.google.com/tech-writing/one", format: "Course", access: "Free", selection: "Words, Active Voice, Clear/Short Sentences, Lists and Tables, Paragraphs, and Audience; rewrite one of your own documents applying each lesson.", purpose: "Every proof artifact in this syllabus is a document; this is the fastest free upgrade to all of them." },
  ],
  s11: [
    { title: "Fundamentals of Software Architecture, 2nd Edition", provider: "Richards and Ford / O’Reilly", url: "https://www.oreilly.com/library/view/fundamentals-of-software/9781098175504/", format: "Book", access: "Paid", selection: "By chapter title (the 2nd ed. renumbers): Architectural Thinking; Architecture Characteristics; Architecture Decisions (ADRs); Analyzing Architecture Risk; Diagramming and Presenting Architecture.", purpose: "Treats architecture as explicit tradeoffs tied to business drivers." },
    { title: "Architecture Tradeoff Analysis Method Collection", provider: "Carnegie Mellon SEI", url: "https://www.sei.cmu.edu/library/architecture-tradeoff-analysis-method-collection/", format: "Guide", access: "Free", selection: "All nine ATAM steps; quality-attribute scenarios, utility tree, risks, sensitivity points, and tradeoff points.", purpose: "Provides a disciplined way to defend decisions rather than merely drawing diagrams." },
    { title: "NIST AI RMF Playbook", provider: "NIST", url: "https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook", format: "Guide", access: "Free", selection: "Govern, Map, Measure, and Manage; produce one risk register with evidence and owners.", purpose: "Adds AI-specific trust, governance, and operational accountability." },
    { title: "Documenting Architecture Decisions", provider: "Michael Nygard", url: "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions", format: "Guide", access: "Free", selection: "Read the original ADR format (context, decision, consequences); write one real ADR including the alternatives you rejected and why. Template library at adr.github.io.", purpose: "The free foundation for ‘alternatives rejected and why’ — the part reviewers actually probe." },
    { title: "The C4 Model for Visualising Software Architecture", provider: "Simon Brown", url: "https://c4model.com/", format: "Guide", access: "Free", selection: "Context, Container, and Component levels; produce a Context + Container diagram for one system and present each to a different audience.", purpose: "A free, disciplined way to communicate architecture at the right zoom level per audience." },
  ],
  s12: [
    { title: "Hand Over Responsibility", provider: "Basecamp Shape Up", url: "https://basecamp.com/shapeup/3.1-chapter-10", format: "Book", access: "Free", selection: "Read the chapter and design a handoff that transfers outcome ownership without prescribing every implementation detail.", purpose: "Makes ownership transfer a designed part of delivery." },
    { title: "Reliable Product Launches at Scale", provider: "Google SRE", url: "https://sre.google/sre-book/reliable-product-launches/", format: "Book", access: "Free", selection: "Launch process, reliability reviews, launch checklist, capacity, dependencies, monitoring, support, and post-launch follow-up.", purpose: "Covers readiness and operational ownership when requirements keep moving." },
    { title: "Ensuring rollback safety during deployments", provider: "AWS Builders’ Library", url: "https://builder.aws.com/content/3F04j2yRAAMBuPSPs50xwXZqg01/ensuring-rollback-safety-during-deployments", format: "Guide", access: "Free", selection: "Standalone vs. distributed changes, one-way doors, two-phase deployment, and rollback-safe sequencing.", purpose: "Keeps the surprise change recoverable instead of creating a brittle cutover." },
  ],
  fde1: [
    { title: "The Mom Test", provider: "Rob Fitzpatrick", url: "https://www.momtestbook.com/", format: "Book", access: "Paid", selection: "Chapters 1 and 5; conduct three interviews focused on workflow facts, failure cost, ownership, commitment, and next action.", purpose: "Builds evidence-seeking discovery rather than stakeholder theater." },
    { title: "Identifying and scaling AI use cases", provider: "OpenAI", url: "https://openai.com/business/guides-and-resources/identifying-and-scaling-ai-use-cases/", format: "Guide", access: "Free", selection: "Workflow mapping, impact/effort prioritization, opportunity selection, and scale criteria.", purpose: "Maps discovery directly to viable enterprise AI deployments." },
    { title: "Shape Up", provider: "Basecamp", url: "https://basecamp.com/shapeup/1.2-chapter-03", format: "Book", access: "Free", selection: "Set Boundaries and Write the Pitch; turn each discovery exercise into a constrained production bet.", purpose: "Produces a production-worthy scope rather than an impressive demo." },
  ],
  fde2: [
    { title: "OAuth 2.0 Security Best Current Practice", provider: "IETF RFC 9700", url: "https://www.rfc-editor.org/rfc/rfc9700.html", format: "Docs", access: "Free", selection: "§§2–4 plus one OIDC/SSO integration lab; map identities, scopes, tenant boundaries, token lifecycle, and failure cases.", purpose: "Covers identity boundaries that dominate enterprise integrations." },
    { title: "Stripe integration failure lab", provider: "Stripe", url: "https://docs.stripe.com/rate-limits", format: "Docs", access: "Free", selection: "Rate Limits, Idempotent Requests, Advanced Error Handling, and Webhooks/Event Delivery; implement retries, duplicates, reordering, and version drift.", purpose: "A realistic lab for integrating an API you do not control." },
    { title: "Writing consumer tests", provider: "Pact", url: "https://docs.pact.io/consumer", format: "Docs", access: "Free", selection: "Consumer contracts, matching rules, provider states, verification, and compatibility across an API version change.", purpose: "Lets you move quickly without trusting a vague external contract." },
  ],
  fde3: [
    { title: "A practical guide to building agents", provider: "OpenAI", url: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/", format: "Guide", access: "Free", selection: "When to use agents, tools, instructions, orchestration, guardrails, and human intervention.", purpose: "Covers the control architecture for retrieval, tools, state, approvals, and safe action." },
    { title: "Demystifying evals for AI agents", provider: "Anthropic Engineering", url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents", format: "Guide", access: "Free", selection: "Task construction, graders, transcript inspection, regression evals, production monitoring, and human review.", purpose: "Makes correctness and uncertainty measurable rather than anecdotal." },
    { title: "OWASP Top 10 for LLM Applications", provider: "OWASP", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", format: "Guide", access: "Free", selection: "LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM05 Improper Output Handling, and LLM06 Excessive Agency.", purpose: "Covers the failure modes that matter when a model can access data and execute tools." },
  ],
  fde4: [
    { title: "Operational Readiness Reviews", provider: "AWS Well-Architected", url: "https://docs.aws.amazon.com/wellarchitected/latest/operational-readiness-reviews/wa-operational-readiness-reviews.html", format: "Guide", access: "Free", selection: "ORR program and checklist categories: architecture, dependencies, capacity, operations, reliability, security, and residual risk.", purpose: "Provides an actionable enterprise launch review." },
    { title: "Site Reliability Engineering Workbook", provider: "Google", url: "https://sre.google/workbook/table-of-contents/", format: "Book", access: "Free", selection: "Chapters 2, 9, 16, and 21: SLOs, incident response, canaries, and organizational change management.", purpose: "Covers service targets, incidents, staged rollout, and adoption." },
    { title: "NIST AI RMF Playbook", provider: "NIST", url: "https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook", format: "Guide", access: "Free", selection: "Govern, Map, Measure, and Manage; add a data-flow inventory, retention/residency rules, threat model, and audit evidence.", purpose: "Structures the governance, privacy, and accountability review enterprise customers expect." },
  ],
  fde5: [
    { title: "Fundamentals of Software Architecture, 2nd Edition", provider: "Richards and Ford / O’Reilly", url: "https://www.oreilly.com/library/view/fundamentals-of-software/9781098175504/", format: "Book", access: "Paid", selection: "By chapter title (the 2nd ed. renumbers): Diagramming and Presenting Architecture, and Negotiation and Leadership Skills.", purpose: "Teaches architecture communication and handling competing stakeholder priorities." },
    { title: "Technical Writing One: Audience", provider: "Google for Developers", url: "https://developers.google.com/tech-writing/one/audience", format: "Course", access: "Free", selection: "Define the executive, operator, and engineer audiences; create a separate five-, ten-, and thirty-minute explanation.", purpose: "Makes the same system understandable without giving everyone the same demo." },
    { title: "Shape Up", provider: "Basecamp", url: "https://basecamp.com/shapeup/1.4-chapter-05", format: "Book", access: "Free", selection: "Risks and Rabbit Holes plus Write the Pitch; use the structure to answer a surprise requirement with now, later, or no.", purpose: "Provides a concise way to defend scope when requirements change." },
  ],
  fde6: [
    { title: "HEART: Measuring the User Experience on a Large Scale", provider: "Google Research", url: "https://research.google.com/pubs/archive/36299.pdf", format: "Paper", access: "Free", selection: "HEART categories and the Goals–Signals–Metrics process; choose measures for adoption, workflow completion, quality, and retention.", purpose: "Turns adoption and workflow quality into defensible measures." },
    { title: "North Star Playbook", provider: "Amplitude", url: "https://amplitude.com/books/north-star/defining-your-North-Star", format: "Book", access: "Free", selection: "Chapters 1–6: metric framework, checklist, definition, traps, adoption, and action.", purpose: "Connects usage to delivered customer value instead of feature counts." },
    { title: "How enterprises are scaling AI", provider: "OpenAI", url: "https://openai.com/business/guides-and-resources/how-enterprises-are-scaling-ai/", format: "Guide", access: "Free", selection: "Governance as an enabler, clear ownership, quality before scale, and protecting human judgment; add a bespoke-vs.-productizable memo.", purpose: "Supports sustained adoption and deciding what should become reusable product capability." },
  ],
  p1: [
    { title: "MLOps: Continuous delivery and automation pipelines", provider: "Google Cloud Architecture Center", url: "https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning", format: "Guide", access: "Free", selection: "MLOps level 1 and level 2: pipeline automation, metadata, validation, registry, serving, and CI/CD boundaries.", purpose: "A concrete reference architecture for deciding where platform contracts belong." },
    { title: "Development Infrastructure & Tooling", provider: "Full Stack Deep Learning", url: "https://fullstackdeeplearning.com/course/2022/lecture-2-development-infrastructure-and-tooling/", format: "Course", access: "Free", selection: "Watch the full lecture; focus on system boundaries, experiment tooling, build-vs.-buy, and tightly coupled stacks.", purpose: "Adds platform judgment rather than another vendor-specific tool tutorial." },
  ],
  p2: [
    { title: "Point-in-time joins", provider: "Feast", url: "https://docs.feast.dev/getting-started/concepts/point-in-time-joins", format: "Docs", access: "Free", selection: "Read the full page and reproduce the historical-retrieval example.", purpose: "Teaches point-in-time correctness and how training-serving leakage actually appears." },
    { title: "ML Dataset Tracking", provider: "MLflow", url: "https://mlflow.org/docs/latest/ml/dataset/", format: "Docs", access: "Free", selection: "Why Dataset Tracking Matters, Core Components, and Dataset Sources and Lineage.", purpose: "Covers dataset identity, source tracking, and reproducibility metadata." },
    { title: "Rules of Machine Learning", provider: "Google", url: "https://developers.google.com/machine-learning/guides/rules-of-ml", format: "Guide", access: "Free", selection: "Rules 29–37, especially Rule 33’s future-time test.", purpose: "A compact checklist for leakage, pipeline parity, and reproducible validation." },
  ],
  p3: [
    { title: "Workflow and Activity definitions", provider: "Temporal", url: "https://docs.temporal.io/workflow-definition", format: "Docs", access: "Free", selection: "Workflow Definition plus Activity Definition; focus on replay, retries, timeouts, determinism, and idempotent activities.", purpose: "Teaches durable failure semantics that transfer beyond a particular DAG tool." },
    { title: "Continual Learning", provider: "Full Stack Deep Learning", url: "https://fullstackdeeplearning.com/course/2022/lecture-6-continual-learning/", format: "Course", access: "Free", selection: "Retraining workflows, data/model feedback loops, automated triggers, and safe iteration.", purpose: "Connects orchestration mechanics to the lifecycle decisions ML platforms own." },
  ],
  p4: [
    { title: "Efficiently Serving LLMs", provider: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/efficiently-serving-llms/", format: "Course", access: "Free", selection: "Text Generation, Batching, Continuous Batching, and Quantization lessons.", purpose: "A focused serving course covering the mechanisms behind throughput and latency." },
    { title: "Dynamic Batcher", provider: "NVIDIA Triton Inference Server", url: "https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/user_guide/batcher.html", format: "Docs", access: "Free", selection: "Recommended Configuration Process, Delayed Batching, Priority Levels, and Queue Policy.", purpose: "Turns batching and scheduling concepts into tunable production behavior." },
  ],
  p5: [
    { title: "Fast and Efficient LLM Inference with vLLM", provider: "DeepLearning.AI + vLLM", url: "https://www.deeplearning.ai/courses/fast-and-efficient-llm-inference-with-vllm", format: "Course", access: "Free", selection: "Complete the 1h38m course: GPU memory, quantization, continuous batching, PagedAttention, prefix caching, and load testing.", purpose: "The best single practical overview for modern LLM-serving performance." },
    { title: "Parallelism and Scaling", provider: "vLLM", url: "https://docs.vllm.ai/en/latest/serving/parallelism_scaling/", format: "Docs", access: "Free", selection: "Distributed inference strategies for a single-model replica; configure tensor and pipeline parallel examples.", purpose: "Adds hands-on distributed-inference configuration and tradeoffs." },
    { title: "Roofline Charts", provider: "NVIDIA Nsight Compute", url: "https://docs.nvidia.com/nsight-compute/ProfilingGuide/index.html#roofline-charts", format: "Docs", access: "Free", selection: "Profiling Guide §2.9; identify compute-bound vs. memory-bound kernels.", purpose: "Builds the hardware-level diagnosis current inference roles expect." },
    { title: "How to Scale Your Model", provider: "Google DeepMind (Austin et al.)", url: "https://jax-ml.github.io/scaling-book/inference/", format: "Book", access: "Free", selection: "The Inference chapter plus the Rooflines chapter: arithmetic intensity, memory-bandwidth limits, and why decode is bandwidth-bound; redo the napkin math for the model you benchmark.", purpose: "The best free treatment of the arithmetic that decides whether an optimization can work before you try it." },
  ],
  p6: [
    { title: "Model Registry Workflows", provider: "MLflow", url: "https://www.mlflow.org/docs/latest/ml/model-registry/workflow/", format: "Docs", access: "Free", selection: "Register a Model, Deploy and Organize Models, and API Workflow.", purpose: "Shows versioned promotion and traceable model lifecycle operations." },
    { title: "Automate testing and rollback", provider: "AWS Well-Architected", url: "https://docs.aws.amazon.com/wellarchitected/2025-02-25/framework/ops_mit_deploy_risks_auto_testing_and_rollback.html", format: "Guide", access: "Free", selection: "Read the full practice: canaries, feature flags, regression gates, and predefined rollback.", purpose: "Connects evaluation results to an operational release decision." },
  ],
  p7: [
    { title: "Production ML systems: Monitoring pipelines", provider: "Google Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring", format: "Course", access: "Free", selection: "Complete the full monitoring lesson and its pipeline-health checks.", purpose: "Separates data/model failure signals from ordinary service availability." },
    { title: "Generative AI Lens: Operational excellence", provider: "AWS Well-Architected", url: "https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/operational-excellence.html", format: "Guide", access: "Free", selection: "Model/application health, foundation-model metrics, overload, tracing, and operational feedback loops.", purpose: "Provides an operator-oriented checklist for model-system observability." },
  ],
  p8: [
    { title: "What is platform engineering?", provider: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/platform-engineering/what-is-platform-engineering", format: "Guide", access: "Free", selection: "Platform-as-product, internal developer customers, paved roads, and self-service sections.", purpose: "Frames platform success as adoption and developer outcomes, not infrastructure shipped." },
    { title: "Platform Engineering Maturity Model", provider: "CNCF", url: "https://www.cncf.io/blog/2023/11/20/announcing-the-platform-engineering-maturity-model/", format: "Guide", access: "Free", selection: "Use every maturity dimension to score a platform you know: adoption, autonomy, governance, and measurement.", purpose: "Gives you a concrete assessment and roadmap exercise." },
  ],
  g1: [
    { title: "Deep dive into Text Generation Inference", provider: "Hugging Face LLM Course", url: "https://huggingface.co/docs/course/chapter1/8", format: "Course", access: "Free", selection: "Two-Phase Inference Process and Sampling Strategies.", purpose: "Explains prefill/decode behavior and how generation settings change system behavior." },
    { title: "Structured Outputs", provider: "OpenAI", url: "https://developers.openai.com/api/docs/guides/structured-outputs", format: "Docs", access: "Free", selection: "Function calling vs. response format and Structured Outputs vs. JSON mode.", purpose: "Teaches constrained interfaces rather than hoping free-form text parses." },
    { title: "Latency optimization", provider: "OpenAI", url: "https://developers.openai.com/api/docs/guides/latency-optimization", format: "Guide", access: "Free", selection: "Generate fewer tokens, use fewer input tokens, make fewer requests, and parallelize.", purpose: "Connects application choices to the latency and token-cost envelope." },
  ],
  g2: [
    { title: "Contextual Retrieval", provider: "Anthropic Engineering", url: "https://www.anthropic.com/engineering/contextual-retrieval", format: "Guide", access: "Free", selection: "The Context Conundrum, implementation, reranking, and cost/latency considerations.", purpose: "A practical treatment of retrieval quality and why naive chunking loses context." },
    { title: "Building and Evaluating Advanced RAG", provider: "DeepLearning.AI", url: "https://www.deeplearning.ai/courses/building-evaluating-advanced-rag", format: "Course", access: "Free", selection: "Sentence-window retrieval, auto-merging retrieval, and RAG-triad evaluation.", purpose: "Pairs retrieval techniques with measurable evaluation." },
    { title: "Hybrid search and semantic ranking", provider: "Microsoft Azure AI Search", url: "https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview", format: "Docs", access: "Free", selection: "Sparse+dense retrieval, reciprocal rank fusion, filters; then follow the semantic-ranking overview.", purpose: "Covers production hybrid retrieval, reranking, and permission-aware filtering." },
  ],
  g3: [
    { title: "Building effective agents", provider: "Anthropic Engineering", url: "https://www.anthropic.com/engineering/building-effective-agents", format: "Guide", access: "Free", selection: "When not to use agents; prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer, and autonomous agents.", purpose: "A strong decision framework for choosing bounded workflows over unnecessary autonomy." },
    { title: "Introduction to LangGraph", provider: "LangChain Academy", url: "https://academy.langchain.com/courses/intro-to-langgraph", format: "Course", access: "Free", selection: "Module 1 graphs/router/agent/memory, Module 2 state schemas and reducers, Module 3 human-in-the-loop.", purpose: "Hands-on stateful orchestration, recovery, and approval boundaries." },
    { title: "Human-in-the-loop", provider: "OpenAI Agents SDK", url: "https://openai.github.io/openai-agents-python/human_in_the_loop/", format: "Docs", access: "Free", selection: "Tool approval, pause/approve/resume, and long-running approval state.", purpose: "Shows how to make consequential tool actions interruptible and resumable." },
  ],
  g4: [
    { title: "Demystifying evals for AI agents", provider: "Anthropic Engineering", url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents", format: "Guide", access: "Free", selection: "Evaluation structure, code/model/human graders, eval-driven development, production monitoring, and human review.", purpose: "The clearest end-to-end guide to agent-evaluation design." },
    { title: "Evaluation best practices", provider: "OpenAI", url: "https://developers.openai.com/api/docs/guides/evaluation-best-practices", format: "Guide", access: "Free", selection: "Designing evals, Tips, and Anti-patterns.", purpose: "A compact rubric for representative tasks, graders, and common evaluation mistakes." },
    { title: "Evaluating and Debugging Generative AI", provider: "DeepLearning.AI + Weights & Biases", url: "https://www.deeplearning.ai/courses/evaluating-debugging-generative-ai", format: "Course", access: "Free", selection: "Use the tracing, experiment comparison, and evaluation exercises; skip vendor setup you already know.", purpose: "Adds a short practical implementation to the conceptual guides." },
  ],
  g5: [
    { title: "LLM01, LLM02, and LLM06", provider: "OWASP GenAI Security Project", url: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/", format: "Guide", access: "Free", selection: "Prompt Injection, Sensitive Information Disclosure, and Excessive Agency entries from the 2025 LLM Top 10.", purpose: "Covers the highest-value attack paths for retrieval and tool-using systems." },
    { title: "How we contain Claude across products", provider: "Anthropic Engineering", url: "https://www.anthropic.com/engineering/how-we-contain-claude", format: "Guide", access: "Free", selection: "Granular tool permissions, isolation boundaries, and blast-radius reduction.", purpose: "Shows how a frontier lab applies containment to real agent products." },
  ],
  g6: [
    { title: "Tracing", provider: "OpenAI Agents SDK", url: "https://openai.github.io/openai-agents-python/tracing/", format: "Docs", access: "Free", selection: "Trace and span model generations, tools, guardrails, handoffs, sensitive data, and custom processors.", purpose: "Provides the primitives needed for end-to-end agent diagnosis." },
    { title: "Models and retry policy", provider: "OpenAI Agents SDK", url: "https://openai.github.io/openai-agents-python/models/", format: "Docs", access: "Free", selection: "Retry policy, backoff, streamed/stateful retries, and retry-safety constraints.", purpose: "Makes model failures explicit operational behavior rather than hidden SDK magic." },
    { title: "Generative AI Lens: Operational excellence", provider: "AWS Well-Architected", url: "https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/operational-excellence.html", format: "Guide", access: "Free", selection: "Tracing across agents/RAG, model health, dependency health, overload, and incident feedback.", purpose: "Connects traces to monitoring and operator action." },
  ],
  g7: [
    { title: "Latency optimization", provider: "OpenAI", url: "https://developers.openai.com/api/docs/guides/latency-optimization", format: "Guide", access: "Free", selection: "Read the complete guide and turn each applicable principle into a measured experiment.", purpose: "A direct checklist for cutting latency without guessing." },
    { title: "FrugalGPT", provider: "Stanford", url: "https://arxiv.org/abs/2305.05176", format: "Paper", access: "Free", selection: "Sections 3–4 on model cascades and cost-quality optimization.", purpose: "Provides a principled model-routing and cost-quality framework." },
    { title: "Establish cost-quality feedback loops", provider: "AWS Well-Architected", url: "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost07-bp03.html", format: "Guide", access: "Free", selection: "Read the full practice and map request cost to quality, version, and business outcome.", purpose: "Prevents optimization that saves tokens while silently damaging value." },
  ],
  g8: [
    { title: "Hardening the generative AI app through GenAIOps", provider: "AWS Prescriptive Guidance", url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/preprod-hardening.html", format: "Guide", access: "Free", selection: "Canary releases and Human-in-the-loop evaluation.", purpose: "Turns preproduction evaluation into a controlled launch." },
    { title: "Implement a continuous feedback control loop", provider: "AWS Well-Architected", url: "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops02-bp04.html", format: "Guide", access: "Free", selection: "Structured feedback, outcome metrics, version attribution, and validation.", purpose: "Connects post-launch behavior back to measurable improvement." },
    { title: "Rules of Machine Learning", provider: "Google", url: "https://developers.google.com/machine-learning/guides/rules-of-ml", format: "Guide", access: "Free", selection: "Rules 27, 28, 33, and 39.", purpose: "A compact launch checklist for metric choice, future-time validation, and rollout decisions." },
  ],
  r1: [
    { title: "Reinforcement Learning: An Introduction, 2nd Edition", provider: "Sutton and Barto", url: "http://incompleteideas.net/book/the-book-2nd.html", format: "Book", access: "Free", selection: "Chapters 1, 3, and 13: the RL problem, finite MDPs, and policy-gradient methods. Skip dynamic programming and bandit depth initially.", purpose: "The canonical vocabulary and problem framing every RL-infrastructure conversation assumes." },
    { title: "Spinning Up in Deep RL", provider: "OpenAI", url: "https://spinningup.openai.com/en/latest/", format: "Guide", access: "Free", selection: "Introduction to RL Parts 1\u20133: key concepts, kinds of algorithms, and intro to policy optimization; skip the implementations until Module 02.", purpose: "Bridges textbook RL to the deep-RL algorithms labs actually run." },
    { title: "RLHF Book", provider: "Nathan Lambert", url: "https://rlhfbook.com/", format: "Book", access: "Free", selection: "Problem setup, reward models, policy-gradient (PPO/GRPO), and the verifiable-rewards (RLVR) chapters.", purpose: "The current post-training playbook\u2014exactly the training loop this branch builds infrastructure for." },
  ],
  r2: [
    { title: "Gymnasium Documentation", provider: "Farama Foundation", url: "https://gymnasium.farama.org/", format: "Docs", access: "Free", selection: "Basic Usage, the Env API (reset/step/seed semantics), and the Make Your Own Custom Environment tutorial.", purpose: "The reference environment interface\u2014teaches the contracts every environment job builds on." },
    { title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?", provider: "Jimenez et al. / ICLR 2024", url: "https://arxiv.org/abs/2310.06770", format: "Paper", access: "Free", selection: "Task-instance construction, execution harness, and evaluation sections; skim the results tables.", purpose: "A real, widely-used agent environment: how tasks, containers, and graders get built from messy reality." },
    { title: "gVisor Documentation", provider: "Google", url: "https://gvisor.dev/docs/", format: "Docs", access: "Free", selection: "Architecture Guide and the security model: syscall interception, isolation boundaries, and resource controls.", purpose: "The isolation layer pattern behind safe agent sandboxes and untrusted-code execution." },
  ],
  r3: [
    { title: "Reward Hacking in Reinforcement Learning", provider: "Lilian Weng", url: "https://lilianweng.github.io/posts/2024-11-28-reward-hacking/", format: "Guide", access: "Free", selection: "The taxonomy, RLHF-specific hacking (sycophancy, judge gaming), and mitigation sections.", purpose: "The best single survey of how rewards and graders fail in practice." },
    { title: "Defining and Characterizing Reward Hacking", provider: "Skalse et al. / NeurIPS 2022", url: "https://arxiv.org/abs/2209.13085", format: "Paper", access: "Free", selection: "Sections 1\u20133: the formal definition of hackable proxies and why unhackable proxies are rare.", purpose: "Rigor for the intuition\u2014explains when a proxy reward can be trusted at all." },
    { title: "T\u00fclu 3: Pushing Frontiers in Open Language Model Post-Training", provider: "Allen Institute for AI", url: "https://arxiv.org/abs/2411.15124", format: "Paper", access: "Free", selection: "The RLVR sections: verifiable-reward construction, data selection, and evaluation of the trained policies.", purpose: "A fully documented, open example of verifiable rewards used in real post-training." },
  ],
  r4: [
    { title: "The Llama 3 Herd of Models", provider: "Meta AI", url: "https://arxiv.org/abs/2407.21783", format: "Paper", access: "Free", selection: "Post-training data sections: SFT mix, preference-data collection, quality filtering, and deduplication.", purpose: "The most detailed public documentation of a frontier data engine." },
    { title: "distilabel Documentation", provider: "Argilla", url: "https://distilabel.argilla.io/", format: "Docs", access: "Free", selection: "Pipelines, steps/tasks, and the quality/filtering examples; build one small generation-plus-judgment pipeline.", purpose: "A production framework for synthetic-data pipelines with built-in quality control." },
    { title: "Cosmopedia: How to Create Large-Scale Synthetic Data", provider: "Hugging Face", url: "https://huggingface.co/blog/cosmopedia", format: "Guide", access: "Free", selection: "Prompt curation, generation at scale, and the deduplication/decontamination sections.", purpose: "A concrete end-to-end account of synthetic data at billions-of-tokens scale." },
  ],
  r5: [
    { title: "Inspect", provider: "UK AI Safety Institute", url: "https://inspect.aisi.org.uk/", format: "Docs", access: "Free", selection: "Tasks, solvers, and scorers concepts; then the agent-evaluation and sandboxing sections.", purpose: "A modern, well-designed eval framework\u2014the architecture current eval-infra roles expect you to know." },
    { title: "lm-evaluation-harness", provider: "EleutherAI", url: "https://github.com/EleutherAI/lm-evaluation-harness", format: "Docs", access: "Free", selection: "The New Task guide and task-config system; add one custom task with deterministic scoring.", purpose: "The de facto standard harness\u2014teaches task registries and versioned configs by use." },
    { title: "Demystifying evals for AI agents", provider: "Anthropic Engineering", url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents", format: "Guide", access: "Free", selection: "Transcript inspection, regression evals, and production monitoring sections.", purpose: "Connects harness mechanics to the judgment layer: reading transcripts and catching regressions." },
  ],
  r6: [
    { title: "Ray Core Documentation", provider: "Anyscale / Ray project", url: "https://docs.ray.io/en/latest/", format: "Docs", access: "Free", selection: "Ray Core key concepts\u2014tasks, actors, and objects\u2014then skim Ray Train/RLlib overviews for how rollouts distribute.", purpose: "The distributed-execution substrate most RL and data-engine infrastructure is built on." },
    { title: "Weights & Biases Documentation", provider: "Weights & Biases", url: "https://docs.wandb.ai/", format: "Docs", access: "Free", selection: "Experiments and Artifacts: runs, config tracking, and artifact lineage; instrument one real training script.", purpose: "Experiment tracking and lineage\u2014the reproducibility backbone research teams live in." },
    { title: "Slurm Quick Start User Guide", provider: "SchedMD", url: "https://slurm.schedmd.com/quickstart.html", format: "Docs", access: "Free", selection: "Core concepts, partitions, job arrays, and preemption; map each to how a shared GPU cluster stays fair.", purpose: "The scheduling vocabulary of research clusters\u2014asked about constantly in research-infra interviews." },
  ],
  q1: [
    { title: "Trading and Exchanges", provider: "Larry Harris / Oxford Academic", url: "https://academic.oup.com/book/52292", format: "Book", access: "Paid", selection: "Chapters 3–6, 13–14, 19, and 21: participants, orders, market structures, dealers, spreads, liquidity, and transaction costs.", purpose: "The canonical practitioner-oriented foundation for market microstructure." },
    { title: "Market Centers", provider: "U.S. Securities and Exchange Commission", url: "https://www.sec.gov/answers/market.htm", format: "Guide", access: "Free", selection: "Trace a US equity order from investor to broker, routing venue, execution, and confirmation.", purpose: "Grounds the abstract participant map in the real US market-routing lifecycle." },
    { title: "Introduction to Futures", provider: "CME Group Education", url: "https://www.cmegroup.com/education/courses/introduction-to-futures", format: "Course", access: "Free", selection: "Contract specifications, participants, tick values, margin, settlement, and price-limit modules.", purpose: "Adds enough futures mechanics for trading-engineering conversations without a finance degree." },
  ],
  q2: [
    { title: "Matching Algorithm Overview", provider: "CME Group", url: "https://www.cmegroup.com/education/matching-algorithm-overview", format: "Course", access: "Free", selection: "FIFO, pro-rata, lead-market-maker allocation, threshold pro-rata, and hybrid matching videos.", purpose: "Shows that real venues do not all use one textbook matching rule." },
    { title: "OUCH 5.0 Specification", provider: "Nasdaq", url: "https://www.nasdaqtrader.com/content/technicalsupport/specifications/TradingProducts/OUCH5.0.pdf", format: "Docs", access: "Free", selection: "§§2.1–2.4 plus Accepted, Executed, Canceled, Replaced, and Rejected outbound messages.", purpose: "Provides a real protocol vocabulary and order lifecycle to implement and test." },
  ],
  q3: [
    { title: "TotalView-ITCH 5.0 Specification", provider: "Nasdaq", url: "https://www.nasdaqtrader.com/content/technicalsupport/specifications/dataproducts/NQTVITCHSpecification_5.0.pdf", format: "Docs", access: "Free", selection: "Architecture/delivery; System Event, Stock Directory, Trading Action, Add, Execute, Cancel, Delete, Replace, Trade, and Cross messages.", purpose: "A real event stream from which to reconstruct a deterministic order book." },
    { title: "MoldUDP64 Specification", provider: "Nasdaq", url: "https://www.nasdaqtrader.com/content/technicalsupport/specifications/dataproducts/moldudp64.pdf", format: "Docs", access: "Free", selection: "Packet/header/message blocks, sequence numbering, heartbeats, retransmission requests, and end-of-session handling.", purpose: "Teaches packet loss, sequence gaps, and recovery at the transport layer." },
  ],
  q4: [
    { title: "FIX Order State Change Matrices (Appendix D)", provider: "FIX 4.4 via OnixS / FIXimate", url: "https://www.onixs.biz/fix-dictionary/4.4/app_d.html", format: "Docs", access: "Free", selection: "State precedence and the matrices for partial fills, cancel/replace races, rejects, IOC/FOK, corrections, and halts; use fiximate.fixtrading.org as the live message reference.", purpose: "A rigorous state-machine reference for OMS correctness." },
    { title: "Algorithmic Trading & DMA", provider: "Barry Johnson", url: "https://openlibrary.org/works/OL19825535W/Algorithmic_trading_DMA", format: "Book", access: "Free / paid edition", selection: "Orders, Algorithm Overview, Transaction Costs, Optimal Trading Strategies, Order Placement, Execution Tactics, and Infrastructure Requirements.", purpose: "Connects order-state plumbing to practical execution decisions." },
    { title: "Market-access controls and Kill Switch", provider: "SEC + CME Group", url: "https://www.sec.gov/rules-regulations/2011/06/risk-management-controls-brokers-or-dealers-market-access", format: "Guide", access: "Free", selection: "Credit thresholds, erroneous-order checks, authorization, throttles, kill behavior, and auditability; then review CME’s Kill Switch guide.", purpose: "Explains why pre-trade risk controls are part of the execution path." },
  ],
  q5: [
    { title: "Java Concurrency in Practice", provider: "Brian Goetz et al.", url: "https://jcip.net/contents.html", format: "Book", access: "Paid", selection: "Chapters 2–3, 5, 10–13, 15, and 16: safety, publication, queues, liveness, scalability, testing, locks, atomics, and the memory model.", purpose: "The core Java concurrency reading for correctness before lock-free optimization." },
    { title: "java.util.concurrent and atomic packages", provider: "Oracle Java SE 26", url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/package-summary.html", format: "Docs", access: "Free", selection: "Happens-before guarantees and semantics of queues, synchronizers, concurrent collections, and atomics.", purpose: "Ties the conceptual model to the exact guarantees Java provides." },
    { title: "Disruptor technical paper", provider: "LMAX Exchange", url: "https://lmax-exchange.github.io/disruptor/files/Disruptor-1.0.pdf", format: "Paper", access: "Free", selection: "Cache lines and false sharing, ring-buffer sequencing, barriers, and producer/consumer graphs.", purpose: "A primary trading-system case study—useful as a pattern, not a universal answer." },
  ],
  q6: [
    { title: "Systems Performance, 2nd Edition", provider: "Brendan Gregg", url: "https://www.brendangregg.com/systems-performance-2nd-edition-book.html", format: "Book", access: "Paid", selection: "Chapters 2–4, 6–7, 10, 12–13, 15, and the Linux USE-method appendix.", purpose: "The canonical operating-system and performance-diagnosis reference." },
    { title: "Linux perf examples", provider: "Brendan Gregg", url: "https://www.brendangregg.com/perf.html", format: "Guide", access: "Free", selection: "Exercise perf stat, sampling, call graphs, CPU counters, and flame graphs.", purpose: "Turns the book’s methodology into hands-on evidence gathering." },
    { title: "Intel 64 and IA-32 Optimization Manuals", provider: "Intel", url: "https://www.intel.com/content/www/us/en/developer/articles/technical/intel64-and-ia32-architectures-optimization.html", format: "Docs", access: "Free", selection: "Cache/memory hierarchy, branch prediction, front-end/backend stalls, hardware counters, and NUMA/locality; skip instruction-level tuning initially.", purpose: "Builds enough hardware literacy to interpret counters rather than guess." },
  ],
  q7: [
    { title: "Building Blocks of TCP", provider: "High Performance Browser Networking", url: "https://hpbn.co/building-blocks-of-tcp/", format: "Book", access: "Free", selection: "Handshake, window control, slow start, congestion control, BDP, head-of-line blocking, Nagle, delayed ACK, and connection reuse.", purpose: "A readable systems explanation of the network behaviors behind latency." },
    { title: "tcp(7), socket(7), and epoll(7)", provider: "Linux man-pages", url: "https://man7.org/linux/man-pages/man7/tcp.7.html", format: "Docs", access: "Free", selection: "Buffers, TCP_NODELAY, busy polling, timestamping, batching, and edge- vs. level-triggered polling.", purpose: "Provides the operating-system knobs and semantics a low-latency engineer must recognize." },
    { title: "Poll Mode Driver", provider: "DPDK", url: "https://doc.dpdk.org/guides/prog_guide/ethdev/ethdev.html", format: "Docs", access: "Free", selection: "Run-to-completion vs. pipeline models, queue/core affinity, descriptors, polling, and bursts.", purpose: "Conceptual kernel-bypass knowledge for specialist low-latency interviews." },
  ],
  q8: [
    { title: "JMH samples", provider: "OpenJDK", url: "https://github.com/openjdk/jmh", format: "Guide", access: "Free", selection: "Samples 03, 10–13, 17, 22, 31, 37, and 38: state, folding, loop mistakes, forks, synchronization, false sharing, cache access, and setup distortion.", purpose: "Teaches how Java microbenchmarks lie and how to make them defensible." },
    { title: "Java Object Layout", provider: "OpenJDK", url: "https://github.com/openjdk/jol", format: "Guide", access: "Free", selection: "Use internals, footprint, and externals to compare boxed collections, arrays, primitive structures, padding, and alignment.", purpose: "Makes memory-layout and object-overhead tradeoffs visible." },
    { title: "Simple Binary Encoding", provider: "FIX Trading Community", url: "https://www.fixtrading.org/standards/sbe/", format: "Docs", access: "Free", selection: "Primitive/composite encodings, fixed-point decimal, padding/alignment, byte order, framing, repeating groups, and schema evolution.", purpose: "A real low-latency binary format with finance-specific precision concerns." },
  ],
  q9: [
    { title: "Stat 110: Probability", provider: "Harvard University", url: "https://stat110.hsites.harvard.edu/", format: "Course", access: "Free", selection: "Conditional probability/Bayes, random variables and distributions, expectation, variance, covariance, joint distributions, LLN, and CLT.", purpose: "A rigorous but approachable probability foundation; skip topics outside this list initially." },
    { title: "Introduction to Modern Statistics, 2e", provider: "OpenIntro", url: "https://openintrostat.github.io/ims/", format: "Book", access: "Free", selection: "Chapters 7–8, 11–14, 19–20, and 24–25: regression, randomization tests, bootstrap CIs, decision errors, comparisons, and inference.", purpose: "Adds practical statistics and uncertainty after the probability foundation." },
    { title: "An Introduction to Statistical Learning with Python", provider: "Springer / authors", url: "https://www.statlearning.com/", format: "Book", access: "Free", selection: "Chapters 2, 3, 5, 6, and Multiple Testing.", purpose: "Covers generalization, resampling, leakage, model selection, regularization, and multiple-comparison risk." },
  ],
  q10: [
    { title: "Advances in Financial Machine Learning", provider: "Marcos López de Prado / Wiley", url: "https://www.wiley-vch.de/en/areas-interest/finance-economics-law/finance-investments-13fi/finance-investments-special-topics-13fiz/advances-in-financial-machine-learning-978-1-119-48208-6", format: "Book", access: "Paid", selection: "Chapters 7, 11–12, and 14–15: financial cross-validation, backtest dangers, walk-forward/CPCV, performance statistics, and strategy risk.", purpose: "Targets finance-specific sources of false confidence in backtests." },
    { title: "The Probability of Backtest Overfitting", provider: "Bailey et al.", url: "https://papers.ssrn.com/sol3/Papers.cfm?abstract_id=2326253", format: "Paper", access: "Free", selection: "Selection bias, in-sample vs. out-of-sample performance, and Probability of Backtest Overfitting; implement a small demonstration.", purpose: "Makes repeated strategy search and false discovery mathematically explicit." },
    { title: "Research and reality-modeling guides", provider: "QuantConnect", url: "https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/research-guide", format: "Docs", access: "Free", selection: "Research guide, slippage models, and fee models; model look-ahead, survivorship, latency, fees, slippage, and partial fills.", purpose: "Provides implementation patterns for a less fictional simulator." },
  ],
  q11: [
    { title: "Mark-to-Market and Position/Risk Management", provider: "CME Group Education", url: "https://www.cmegroup.com/education/courses/introduction-to-futures/mark-to-market", format: "Course", access: "Free", selection: "Complete Mark-to-Market and Position and Risk Management lessons.", purpose: "A concise operational introduction to daily P&L and futures risk." },
    { title: "Options, Futures, and Other Derivatives", provider: "John Hull / Pearson", url: "https://www.pearson.com/en-gb/subject-catalog/p/options-futures-and-other-derivatives-global-edition/P200000004519/9781292410654", format: "Book", access: "Paid", selection: "Chapters 2–3, 10, 19, and 22–23: futures mechanics/hedging, options, Greeks conceptually, VaR/expected shortfall, volatility, and correlation.", purpose: "Enough pricing and risk vocabulary for engineering roles without becoming a derivatives quant." },
  ],
  q12: [
    { title: "Aeron Archive and replication sample", provider: "Aeron", url: "https://aeron.io/docs/aeron-archive/overview/", format: "Docs", access: "Free", selection: "Recording, position-based replay, replication, replay-to-live, recovery after disconnect, truncation, and the replication sample.", purpose: "A production-grade model for event recording, replay, and recovery." },
    { title: "HdrHistogram", provider: "Gil Tene / open source", url: "https://github.com/HdrHistogram/HdrHistogram", format: "Guide", access: "Free", selection: "Percentile recording, Recorder, dynamic range/precision, and corrected vs. raw recording/coordinated omission.", purpose: "Ensures the capstone reports latency honestly under load." },
    { title: "Site Reliability Engineering Workbook", provider: "Google", url: "https://sre.google/workbook/table-of-contents/", format: "Book", access: "Free", selection: "Chapters 4–5, 9–11, and 16–17: monitoring, SLO alerts, incidents, postmortems, load, canaries, and overload recovery.", purpose: "Adds production operations and incident proof to the trading-system demo." },
  ],
};

export const roleEvidence: Record<string, RoleEvidence[]> = {
  fde: [
    {
      company: "OpenAI",
      title: "AI Deployment Engineer, Enterprise",
      url: "https://openai.com/careers/ai-deployment-engineer-enterprise-san-francisco/",
      signals: "Discovery, architecture, prototyping, evals, integrations, production launch, governance, adoption, and measurable customer outcomes.",
    },
    {
      company: "Palantir",
      title: "Forward Deployed Software Engineer",
      url: "https://jobs.lever.co/palantir/d084b769-6f53-4409-afa8-c183b059b384",
      signals: "Open-ended customer problems, data integration, rapid iteration, end-to-end implementation, and direct user feedback.",
    },
  ],
  platform: [
    {
      company: "OpenAI",
      title: "Software Engineer, Model Inference",
      url: "https://openai.com/careers/software-engineer-model-inference-san-francisco/",
      signals: "Low-latency, high-availability inference; GPU utilization; profiling; distributed systems; throughput and efficiency.",
    },
    {
      company: "Anthropic",
      title: "Inference, AI Reliability, and ML Systems roles",
      url: "https://www.anthropic.com/careers/jobs",
      signals: "Inference runtime, cloud inference, AI reliability, Kubernetes platforms, performance engineering, and research tooling.",
    },
  ],
  genai: [
    {
      company: "OpenAI",
      title: "Backend Software Engineer — Evals",
      url: "https://openai.com/careers/backend-software-engineer-%28evals%29-san-francisco/",
      signals: "Reproducible eval pipelines, golden datasets, drift monitoring, feedback loops, agents, tools, long context, and production-scale backend systems.",
    },
    {
      company: "OpenAI",
      title: "AI Systems Engineer, Codex Agents",
      url: "https://openai.com/careers/ai-systems-engineer-codex-agents-san-francisco/",
      signals: "Agent harnesses, model interaction, safe execution, orchestration, evals, reliability, latency, cost, capacity, and quality.",
    },
  ],
  research: [
    {
      company: "Anthropic",
      title: "Staff Software Engineer, Environments Infrastructure",
      url: "https://job-boards.greenhouse.io/anthropic/jobs/5367436008",
      signals: "RL environments at scale, sandboxed execution, evaluation integration, and research-facing platform engineering.",
    },
    {
      company: "OpenAI",
      title: "Software Engineer, RL Training Infra",
      url: "https://openai.com/careers/software-engineer-rl-training-infra-san-francisco/",
      signals: "Rollout infrastructure, environments, data pipelines, distributed systems, and post-training integration.",
    },
  ],
  quant: [
    {
      company: "IMC",
      title: "C++ Software Engineer — Execution",
      url: "https://www.imc.com/us/careers/jobs/4634204101",
      signals: "Latency-critical execution, market connectivity, high-performance software, testing, Linux, and direct work with traders and quants.",
    },
    {
      company: "Optiver",
      title: "Software Engineer — Trading Strategies",
      url: "https://www.optiver.com/join-us/jobs/technology/chicago/software-engineer-trading-strategies/",
      signals: "Real-time trading infrastructure, execution, research and simulation platforms, reliability, latency, and visible trading impact.",
    },
  ],
};
