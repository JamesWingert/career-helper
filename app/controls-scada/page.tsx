"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Stage = {
  id: string;
  months: string;
  title: string;
  outcome: string;
  topics: string[];
  proof: string;
};

const stages: Stage[] = [
  {
    id: "foundation",
    months: "Months 1–2",
    title: "Understand the control loop",
    outcome: "Know what the PLC, field instruments, network, SCADA server, HMI, alarms, and historian each own.",
    topics: [
      "PLC scan cycle; tags; timers/counters; state logic; permissives, interlocks, and fail-safe states",
      "Ladder Logic for discrete control; Structured Text for calculations, reusable logic, and simulation",
      "Voltage, current, resistance, and power; series/parallel circuits; sourcing vs. sinking; NO vs. NC contacts",
      "24VDC digital inputs/outputs; relays, contactors, motor starters, and what a VFD does",
    ],
    proof: "A simulated pump in manual/off/auto that refuses unsafe starts and fails to a known state.",
  },
  {
    id: "software",
    months: "Months 2–3",
    title: "Connect PLC logic to SCADA",
    outcome: "Move a signal through a controller, protocol, HMI, alarm pipeline, and historian instead of building a dashboard mockup.",
    topics: [
      "Ignition gateway, tags, Perspective screens, scripting, users, alarming, trends, and historian",
      "Modbus TCP/RTU: coils/registers, addressing, polling, byte order, timeouts, and RS-485 basics",
      "EtherNet/IP: devices, assemblies, explicit vs. implicit messaging, and produced/consumed data conceptually",
      "OPC UA: client/server, address space, subscriptions, certificates, and read vs. write boundaries",
    ],
    proof: "Ignition displays and records simulated PLC data in PostgreSQL and shows a deliberate communications failure.",
  },
  {
    id: "physical",
    months: "Months 3–5",
    title: "Add the physical layer safely",
    outcome: "Be able to trace a bad value from the HMI down to a tag, protocol, input channel, wire, and instrument.",
    topics: [
      "4–20mA loops: scaling engineering units, loop power, open-circuit/underrange faults, and calibration checks",
      "P&IDs, electrical schematics, panel layouts, terminal numbers, I/O lists, and instrument tag conventions",
      "Industrial networking: addressing/subnets, VLAN purpose, managed switches, redundancy concepts, NTP, and Wireshark",
      "VFD run/enable/speed-reference/fault concepts; never practice on mains voltage or a real motor unsupervised",
    ],
    proof: "A 24VDC bench test with switches, indicator loads, a relay, and a simulated 4–20mA level signal.",
  },
  {
    id: "capstone",
    months: "Months 5–8",
    title: "Build the water-system capstone",
    outcome: "Produce the kind of evidence an integrator can inspect: logic, drawings, screens, failures, test records, and a concise demo.",
    topics: [
      "Lead/lag pumps, tank level, start/stop setpoints, hysteresis, runtime balancing, and pump-fail fallback",
      "Low-low and high-high interlocks, dry-run protection, stale/bad sensor quality, comms loss, and safe restart",
      "Alarm priority, deadband, delay, acknowledgement, flood avoidance, historian sampling, and useful trends",
      "Control narrative, P&ID, I/O list, tag naming, cause-and-effect table, FAT checklist, and recovery runbook",
    ],
    proof: "A public portfolio repo plus a five-minute video that injects faults and explains why each safe response occurs.",
  },
  {
    id: "market",
    months: "Months 6–12",
    title: "Apply while deepening one exit path",
    outcome: "Start interviewing before the lab is perfect, then add the specialty that raises the long-term ceiling.",
    topics: [
      "Apply first to systems integrators and field-service teams; they create more commissioning repetitions than one plant",
      "Data-center fork: BACnet/IP, BMS/EPMS, chilled-water and HVAC sequences, one-lines, UPS/generator/switchgear concepts",
      "OT-security fork: asset inventory, zones/conduits, segmentation, jump hosts, backups/restore, passive monitoring, incident response",
      "Translate SWE work into versioning, testing, networking, databases, deployment, observability, and disciplined change control",
    ],
    proof: "A controls-specific résumé, 20-company watchlist, 10 targeted applications per week, and one specialty project.",
  },
];

const software = [
  ["Ignition Maker Edition", "Install on macOS now; use it for the HMI, alarms, historian, and OPC UA layer.", "https://inductiveautomation.com/ignition/maker-edition"],
  ["Inductive University", "Complete Gateway, Tags, Perspective, Scripting, SQL Bridge/Historian, Alarming, and OPC UA—not every video.", "https://inductiveuniversity.com/"],
  ["PostgreSQL", "Use one local database for historian data and a few diagnostic queries.", "https://www.postgresql.org/download/"],
  ["Wireshark", "Capture only your lab traffic; identify Modbus TCP requests, responses, retransmits, and connection loss.", "https://www.wireshark.org/download.html"],
  ["CODESYS Development System", "Free IEC 61131-3 environment with a demo SoftPLC. Version 3 is Windows-based, so use a Windows VM or spare PC.", "https://www.codesys.com/products/engineering/development-system/"],
  ["CLICK Programming Software", "Install only if you buy a CLICK PLC. It is free and Windows-based.", "https://www.automationdirect.com/clickplcs/free-software/free-click-software"],
];

const employers = [
  {
    label: "Systems integrators — best first target",
    names: "E Tech Group, RoviSys, Wunderlich-Malec, Tesco Controls, Revere Control Systems, InflexionPoint, Electronic Drives and Controls, General Control Systems",
    action: "Use the CSIA directory; filter Water & Wastewater plus your geography. Search each company directly, not only LinkedIn.",
    url: "https://controlsys.org/find-an-integrator/",
  },
  {
    label: "Water, utilities, and engineering firms",
    names: "NYC DEP, American Water, Veolia, Hazen and Sawyer, Arcadis, CDM Smith, Jacobs, Black & Veatch, HDR, Woodard & Curran",
    action: "Watch SCADA/automation/I&C openings. Utilities can be stable but may offer fewer repetitions and slower hiring than integrators.",
  },
  {
    label: "Industrial automation and field service",
    names: "Rockwell Automation, Siemens, Schneider Electric, Emerson, ABB, Honeywell, Xylem, Endress+Hauser",
    action: "Look for applications, field service, commissioning, and integration roles—not sales-only roles.",
  },
];

const firstTitles = [
  "Associate / Junior Controls Engineer",
  "Automation Engineer I",
  "SCADA Developer / Engineer",
  "Controls Systems Integrator",
  "Field Automation Engineer",
  "Commissioning Engineer",
  "SCADA Support Engineer",
  "OT Systems Specialist / Analyst",
  "I&C Automation Specialist",
  "Field Service Engineer — Controls",
];

const readyItems = [
  "Explain PLC vs. HMI vs. SCADA vs. historian, and trace one tag through the full stack.",
  "Write Ladder and Structured Text for a pump with manual/off/auto, permissives, interlocks, and safe restart.",
  "Explain Modbus, EtherNet/IP, and OPC UA without pretending they are interchangeable.",
  "Wire and troubleshoot safe 24VDC digital I/O and scale a 4–20mA signal into engineering units.",
  "Read a simple P&ID, electrical schematic, and I/O list; produce small versions for your capstone.",
  "Build useful alarms and trends, log to a historian, and query the resulting data.",
  "Demonstrate sensor failure, pump failure, and communications loss with explicit safe behavior.",
  "Show a clean repo: control narrative, diagrams, tag list, logic export/screenshots, FAT tests, runbook, and video.",
  "Tailor your résumé to integration and field operations, and state your realistic travel/on-site availability.",
];

export default function ControlsScadaPage() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("controls-scada-plan-v1");
      if (saved) setDone(JSON.parse(saved));
      const storedTheme = localStorage.getItem("career-gameplan-theme");
      setTheme(storedTheme === "dark" || storedTheme === "light" ? storedTheme : document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    } catch {}
  }, []);

  const toggleStage = (id: string) => {
    setDone((current) => {
      const next = { ...current, [id]: !current[id] };
      try { localStorage.setItem("controls-scada-plan-v1", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("career-gameplan-theme", next); } catch {}
  };

  const completed = stages.filter((stage) => done[stage.id]).length;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>JIMMY WINGERT · CAREER GAMEPLAN · RECOMMENDED PHYSICAL-INFRASTRUCTURE PATH</span>
        <h1>Controls / SCADA /<br />OT Automation</h1>
        <p>Start in water or industrial controls to earn real PLC, instrumentation, and commissioning experience. Then move toward higher-paying data-center controls, SCADA software, or OT cybersecurity.</p>
        <div className={styles.goal}><span>Realistic strategy</span><strong>Study beside your current job. Switch only for an actual offer worth the pay cut, travel, and on-site tradeoff.</strong></div>
      </section>

      <nav className={styles.nav} aria-label="Controls career plan sections">
        <Link className={styles.back} href="/">← All career paths</Link>
        <a href="#plan">6–12 month plan</a>
        <a href="#tools">Tools + hardware</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#jobs">Jobs + pay</a>
        <a href="#ready">Ready to apply</a>
        <button onClick={toggleTheme} aria-label="Toggle dark mode">{theme === "dark" ? "☀ Light" : "☾ Dark"}</button>
      </nav>

      <section className={styles.status}>
        <div>
          <span className={styles.eyebrow}>WHAT THE WORK ACTUALLY IS</span>
          <h2>Software that touches pumps, valves, motors, sensors, and power.</h2>
          <p>A PLC runs deterministic control logic. Field instruments report the physical process. SCADA gives operators a plant-wide view, alarms, history, and controlled commands. The engineer connects all of it, tests failure behavior, commissions it on-site, and troubleshoots from the screen down to wiring.</p>
        </div>
        <div className={styles.progress}>
          <strong>{completed}<small> / {stages.length}</small></strong>
          <span>stages complete</span>
          <div><i style={{ width: `${(completed / stages.length) * 100}%` }} /></div>
        </div>
      </section>

      <section className={styles.twoColumn}>
        <article>
          <span className={styles.eyebrow}>WHY SWE TRANSFERS</span>
          <h3>You are filling a physical-world gap, not starting from zero.</h3>
          <ul>
            <li>Python/scripting → Ignition scripting, test tools, and data integration</li>
            <li>SQL → historians, trends, event analysis, and reporting</li>
            <li>TCP/IP → industrial Ethernet, routing, diagnostics, and OT segmentation</li>
            <li>Distributed-systems debugging → tracing failures across PLC, network, server, database, and UI</li>
            <li>Versioning, testing, deployment, observability → safer controls change management</li>
          </ul>
        </article>
        <article className={styles.boundary}>
          <span className={styles.eyebrow}>THE ACTUAL GAP</span>
          <h3>Hardware, process, and field judgment.</h3>
          <p>You still need PLC logic, 24VDC I/O, instrumentation, drawings, motor-control concepts, commissioning discipline, and comfort working on-site. A CS degree is relevant to many controls/OT roles; a PE license or another engineering degree is not the default price of entry for this path.</p>
        </article>
      </section>

      <section id="top-tier" className={styles.topTier}>
        <div>
          <span className={styles.eyebrow}>THE “FAANG-LEVEL” ENDGAME</span>
          <h2>Hyperscale / AI data-center controls and SCADA software.</h2>
          <p>There is no single prestige ladder in controls, but the closest combination of pay, technical scope, and selective employers is owning the power, cooling, BMS, EPMS, PLC, SCADA, and commissioning stack behind hyperscale or AI data centers.</p>
        </div>
        <dl>
          <div><dt>Target titles</dt><dd>Data Center Controls Engineer → Senior / Staff / Principal Controls Engineer, Controls Architect, or SCADA Software Engineer</dd></div>
          <div><dt>Employer tier</dt><dd>AWS, Google, Microsoft, Meta; AI-infrastructure builders such as Fluidstack or CoreWeave; top mission-critical integrators and data-center operators</dd></div>
          <div><dt>Practical route</dt><dd>SWE → water / industrial controls integrator → 2–5 years of PLC, BMS/SCADA, field troubleshooting, and commissioning → hyperscale controls → staff/principal or SCADA-software ownership</dd></div>
          <div><dt>Current proof</dt><dd>AWS lists Data Center Controls Engineer up to $210.8k base in its highest US market plus possible equity/sign-on; Fluidstack lists SCADA software at $224k–$264k base plus equity.</dd></div>
        </dl>
        <a href="https://www.amazon.jobs/en/jobs/3119108/data-center-controls-engineer-data-center-capacity-delivery-controls" target="_blank" rel="noreferrer">AWS role evidence ↗</a>
      </section>

      <section id="plan" className={styles.section}>
        <header>
          <span className={styles.eyebrow}>6–12 MONTH PLAN · 6–8 HOURS/WEEK</span>
          <h2>Learn in the order the system works.</h2>
          <p>Do not wait until month 12 to apply. Begin targeted conversations around month 4 and applications once the capstone is explainable around month 6.</p>
        </header>
        <div className={styles.stageList}>
          {stages.map((stage) => (
            <article className={done[stage.id] ? styles.complete : ""} key={stage.id}>
              <div className={styles.stageMeta}>
                <span>{stage.months}</span>
                <label>
                  <input type="checkbox" checked={!!done[stage.id]} onChange={() => toggleStage(stage.id)} />
                  <i aria-hidden="true" />
                  {done[stage.id] ? "Done" : "Mark done"}
                </label>
              </div>
              <h3>{stage.title}</h3>
              <p>{stage.outcome}</p>
              <ul>{stage.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
              <div className={styles.proof}><span>Proof before moving on</span><p>{stage.proof}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section id="tools" className={styles.section}>
        <header>
          <span className={styles.eyebrow}>INSTALL FIRST · SPEND LATER</span>
          <h2>Software and a budget-safe bench.</h2>
          <p>Use software for 4–6 weeks before buying hardware. Vendor PLC tooling is still Windows-heavy; keep Ignition, PostgreSQL, and Wireshark on your Mac and use a Windows VM or spare PC for CODESYS/CLICK.</p>
        </header>
        <div className={styles.softwareGrid}>
          {software.map(([name, note, url]) => (
            <a href={url} target="_blank" rel="noreferrer" key={name}>
              <span>SOFTWARE / TRAINING</span>
              <h3>{name}</h3>
              <p>{note}</p>
              <b>Official source ↗</b>
            </a>
          ))}
        </div>
        <div className={styles.hardware}>
          <article>
            <span className={styles.eyebrow}>RECOMMENDED STARTER · ROUGHLY $300–$425</span>
            <h3>Buy only after the simulated pump works.</h3>
            <ul>
              <li><b>PLC:</b> AutomationDirect CLICK PLUS C2-01CPU + C2-08D1-4VC mixed discrete/4–20mA option module (about $210 before tax/shipping)</li>
              <li><b>Power and wiring:</b> UL-listed 24VDC DIN-rail supply, DIN rail, terminal blocks, fuse holders, 18–22 AWG wire, ferrules</li>
              <li><b>Inputs/outputs:</b> two pushbuttons/toggle switches, two 24V indicator lights, one interposing relay</li>
              <li><b>Test gear:</b> basic CAT-rated multimeter and a low-cost 0/4–20mA signal generator</li>
              <li><b>Network:</b> Ethernet cables; use your existing isolated home network before buying an industrial switch</li>
            </ul>
          </article>
          <aside>
            <strong>Safety boundary</strong>
            <p>Stay at extra-low-voltage 24VDC. Use lights or relays as simulated loads. Do not connect mains power, a real VFD, motor, heater, pump, or wet process without qualified supervision.</p>
          </aside>
        </div>
      </section>

      <section id="portfolio" className={styles.section}>
        <header>
          <span className={styles.eyebrow}>2–3 PROJECTS · ONE SYSTEM, INCREASING REALISM</span>
          <h2>Portfolio evidence an integrator can inspect.</h2>
        </header>
        <div className={styles.projectGrid}>
          <article>
            <span>01 · REQUIRED CAPSTONE</span>
            <h3>Two-tank water / pump SCADA system</h3>
            <p>Simulate source and destination tanks, lead/lag pumps, level transmitters, valves, and flow. PLC logic owns interlocks and sequencing; Ignition owns operator graphics, commands, alarms, and history.</p>
            <ul>
              <li>Manual/off/auto, hysteresis, runtime balancing, duty failover</li>
              <li>High-high/low-low trips, dry-run, stuck sensor, pump fail, comms loss</li>
              <li>OPC UA or Modbus path, PostgreSQL historian, trends, alarm acknowledgement</li>
              <li>P&ID, I/O list, control narrative, cause/effect, FAT test sheet, recovery runbook</li>
            </ul>
          </article>
          <article>
            <span>02 · PHYSICAL PROOF</span>
            <h3>24VDC mini control panel</h3>
            <p>Move the same logic onto the CLICK PLC. Use safe switches, lights, a relay, and a 4–20mA generator. Label wires and terminals, then diagnose one open loop and one incorrect digital input.</p>
            <ul>
              <li>Neat wiring diagram and terminal plan</li>
              <li>Measured input voltage/current and scaled analog values</li>
              <li>Versioned PLC backup plus before/after fault notes</li>
            </ul>
          </article>
          <article>
            <span>03 · CHOOSE ONE SPECIALTY</span>
            <h3>Data-center cooling or OT-security lab</h3>
            <p><b>Controls:</b> adapt the plant to chilled-water pumps, temperatures, differential pressure, alarms, and a written sequence of operations. <b>Security:</b> draw zones/conduits, capture passive traffic, inventory assets, restrict writes, test backup/restore, and write an incident playbook.</p>
            <ul>
              <li>Keep cyber testing inside your own lab</li>
              <li>Show tradeoffs and recovery—not a flashy dashboard</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="jobs" className={styles.section}>
        <header>
          <span className={styles.eyebrow}>FIRST ROLE → HIGHER-CEILING SPECIALTY</span>
          <h2>Where to apply and what the pay can become.</h2>
        </header>
        <div className={styles.jobsGrid}>
          <article>
            <span className={styles.eyebrow}>SEARCH THESE FIRST</span>
            <h3>Entry titles</h3>
            <div className={styles.pills}>{firstTitles.map((title) => <span key={title}>{title}</span>)}</div>
            <p className={styles.note}>Also search “PLC,” “Ignition,” “SCADA,” “controls,” “commissioning,” and “water/wastewater.” Read duties more closely than titles.</p>
          </article>
          <article className={styles.avoid}>
            <span className={styles.eyebrow}>SCREEN BEFORE APPLYING</span>
            <h3>Good first-role signals</h3>
            <ul>
              <li>Training or pairing with senior controls engineers</li>
              <li>PLC + HMI/SCADA + instrumentation + commissioning exposure</li>
              <li>Clear overtime, travel, per diem, and comp-time policy</li>
              <li>Versioning, backups, test plans, and safety/change controls</li>
              <li>Several projects or sites—not permanent panel assembly only</li>
            </ul>
          </article>
        </div>

        <div className={styles.employers}>
          {employers.map((group) => (
            <article key={group.label}>
              <span>{group.label}</span>
              <h3>{group.names}</h3>
              <p>{group.action}</p>
              {group.url && <a href={group.url} target="_blank" rel="noreferrer">Open directory ↗</a>}
            </article>
          ))}
        </div>

        <div className={styles.compTable} role="table" aria-label="Approximate compensation progression">
          <div className={styles.compHead} role="row"><span>Stage</span><span>Normal base</span><span>Upside—not base</span></div>
          <div role="row"><strong>First controls / SCADA role</strong><span>$75k–$110k</span><p>Some field roles reach roughly $100k–$140k cash with paid overtime and heavy travel.</p></div>
          <div role="row"><strong>2–5 years; independent commissioning</strong><span>$105k–$150k</span><p>Travel, shutdown work, or straight-time/1.5× overtime can push cash higher.</p></div>
          <div role="row"><strong>5–8 years; senior / architect / OT lead</strong><span>$135k–$185k</span><p>Bonuses, overtime, or scarce platform/domain expertise can approach or exceed $200k.</p></div>
          <div role="row"><strong>Selective data-center / SCADA-software roles</strong><span>$165k–$230k+</span><p>Equity and bonus may be additional; these roles usually expect real controls and commissioning depth.</p></div>
        </div>
        <p className={styles.salaryNote}>Planning ranges for NYC/NJ and higher-paying US markets, not guarantees. A $110k base plus 20 extra hours every week is about $165k at straight time or $192.5k at 1.5×—before any unpaid weeks. Per diem reimburses travel costs; it is not salary. A consultant’s bill rate is not take-home pay.</p>

        <div className={styles.marketProof}>
          <a href="https://jobs.siemens.com/en_US/externaljobs/JobDetail/478759" target="_blank" rel="noreferrer"><span>FIRST-STEP EXAMPLE</span><h3>Siemens · Field Service Engineer Apprenticeship</h3><p>$60,340–$103,440; PLC/HMI testing, commissioning, training, and about 50% travel.</p><b>View current posting ↗</b></a>
          <a href="https://jobs.smartrecruiters.com/CityOfNewYork/3743990013320821-scada-project-planner" target="_blank" rel="noreferrer"><span>MID-CAREER EXAMPLE</span><h3>NYC DEP · SCADA Project Planner</h3><p>$125k–$150k salary band; CS accepted with relevant automation/infrastructure experience.</p><b>View current posting ↗</b></a>
          <a href="https://jobs.ashbyhq.com/fluidstack/807d7ee9-d5cf-4cbe-94ed-de0d842226a9" target="_blank" rel="noreferrer"><span>DATA-CENTER EXAMPLE</span><h3>Fluidstack · Controls Engineer, SCADA</h3><p>$164k–$189k base plus equity; data-center/SCADA, historian, and commissioning exposure valued.</p><b>View current posting ↗</b></a>
          <a href="https://jobs.ashbyhq.com/fluidstack/7528afd0-2aae-4cab-8d47-9c3e5d004813" target="_blank" rel="noreferrer"><span>CS + OT ENDGAME</span><h3>Fluidstack · Software Engineer, SCADA</h3><p>$224k–$264k base plus equity; modern software built against SCADA, EPMS, OPC UA, historians, and alarms.</p><b>View current posting ↗</b></a>
        </div>
        <p className={styles.checked}>Market examples checked August 22, 2026. Postings can close; use them as skill and compensation evidence, not as promised openings.</p>
      </section>

      <section className={styles.section}>
        <header>
          <span className={styles.eyebrow}>AFTER 2–5 YEARS OF REAL OT EXPERIENCE</span>
          <h2>Two strong higher-paying exits.</h2>
        </header>
        <div className={styles.exitGrid}>
          <article>
            <span>PATH A · DATA-CENTER CONTROLS</span>
            <h3>Controls → BMS / EPMS → mission-critical commissioning</h3>
            <p>Add BACnet/IP, sequences of operation, chilled-water/HVAC fundamentals, electrical one-lines, UPS/generators/switchgear concepts, trend-based fault finding, and commissioning levels. Target Data Center Controls Engineer, BMS/EPMS Controls Engineer, Commissioning Engineer, Controls Design Engineer, and SCADA Software Engineer.</p>
          </article>
          <article>
            <span>PATH B · OT / ICS CYBERSECURITY</span>
            <h3>Controls → OT networking → defensive security</h3>
            <p>Add asset inventory, zones/conduits, firewalls, jump hosts, remote-access controls, Windows/AD in OT, backups and restore tests, passive monitoring, vulnerability/change management, and incident response. Start with NIST SP 800-82 and CISA ICS training; treat IEC 62443 as working vocabulary, not a certificate-shopping plan.</p>
            <div className={styles.inlineLinks}>
              <a href="https://csrc.nist.gov/pubs/sp/800/82/r3/final" target="_blank" rel="noreferrer">NIST SP 800-82 ↗</a>
              <a href="https://www.cisa.gov/ics-training-available-through-cisa" target="_blank" rel="noreferrer">CISA ICS training ↗</a>
              <a href="https://attack.mitre.org/matrices/ics/" target="_blank" rel="noreferrer">MITRE ATT&CK for ICS ↗</a>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.twoColumn}>
        <article className={styles.dont}>
          <span className={styles.eyebrow}>DO NOT WASTE TIME ON</span>
          <h3>Credentials and projects that do not close the field gap.</h3>
          <ul>
            <li>A second bachelor’s or PE track for controls/SCADA roles</li>
            <li>Expensive Allen-Bradley hardware or Studio 5000 before a job requires it</li>
            <li>Generic cloud/cyber certificates instead of PLC, I/O, drawings, and fault work</li>
            <li>Advanced PID/control theory before discrete logic, signals, and troubleshooting</li>
            <li>A dashboard-only “SCADA” demo with no controller, interlocks, alarms, or failures</li>
            <li>Unsafe mains, motor, or wet-process experiments at home</li>
          </ul>
        </article>
        <article>
          <span className={styles.eyebrow}>INTERVIEW FILTERS</span>
          <h3>Questions that prevent a bad first move.</h3>
          <ul>
            <li>What percentage is PLC, SCADA, electrical design, commissioning, support, and panel work?</li>
            <li>How much travel, weekend work, and on-call time occurred on this team last year?</li>
            <li>Is overtime straight time, 1.5×, salaried/unpaid, or exchanged for comp time?</li>
            <li>Which platforms, industries, and commissioning stages will I touch in year one?</li>
            <li>Who reviews logic and drawings, and how are backups, versioning, FAT/SAT, and change control handled?</li>
          </ul>
        </article>
      </section>

      <section id="ready" className={styles.ready}>
        <header>
          <span className={styles.eyebrow}>READY TO APPLY CHECKLIST</span>
          <h2>Apply when most of this is true.</h2>
          <p>You do not need to be ready to commission a live plant alone. You need enough proof that a senior engineer can safely train you.</p>
        </header>
        <div>{readyItems.map((item) => <label key={item}><input type="checkbox" /><i aria-hidden="true" /><span>{item}</span></label>)}</div>
      </section>

      <section className={styles.sources}>
        <span className={styles.eyebrow}>CORE REFERENCES</span>
        <h2>Use primary material; skip random certification piles.</h2>
        <div>
          <a href="https://inductiveuniversity.com/" target="_blank" rel="noreferrer">Inductive University ↗</a>
          <a href="https://www.codesys.com/products/engineering/development-system/" target="_blank" rel="noreferrer">CODESYS Development System ↗</a>
          <a href="https://www.modbus.org/specs.php" target="_blank" rel="noreferrer">Modbus specifications ↗</a>
          <a href="https://www.odva.org/technology-standards/key-technologies/ethernet-ip/" target="_blank" rel="noreferrer">ODVA EtherNet/IP ↗</a>
          <a href="https://opcfoundation.org/about/opc-technologies/opc-ua/" target="_blank" rel="noreferrer">OPC Foundation ↗</a>
          <a href="https://csrc.nist.gov/pubs/sp/800/82/r3/final" target="_blank" rel="noreferrer">NIST OT Security ↗</a>
        </div>
        <p>Direction also incorporates the supplied <i>Software to Automation & Field Controls Engineering — Transition Plan</i>: Ignition + PLCs + industrial networking, then physical hardware, a water integration project, and systems-integrator job targeting. This version adds the missing instrumentation, drawings, safe commissioning evidence, compensation reality, and two higher-ceiling exits.</p>
      </section>

      <footer className={styles.footer}>Recommended sequence: SWE → water / industrial controls → data-center controls, SCADA software, or OT / ICS cybersecurity.</footer>
    </main>
  );
}
