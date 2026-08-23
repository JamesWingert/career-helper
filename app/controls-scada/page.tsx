"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Resource = {
  title: string;
  provider: string;
  url: string;
  format: string;
  access: string;
  selection: string;
  purpose: string;
};

type Module = {
  id: string;
  months: string;
  title: string;
  outcome: string;
  topics: string[];
  proof: string;
  resources: Resource[];
};

const modules: Module[] = [
  {
    id: "ignition",
    months: "Months 1–2 · Core",
    title: "Ignition SCADA and the operator layer",
    outcome: "Build a real SCADA path, not a dashboard mockup.",
    topics: [
      "Gateway, tags, Perspective views, quality, commands, users, and security boundaries",
      "OPC device connection, database connection, scripting, and deployment/backup basics",
      "Trace one value from controller memory to the operator screen and back",
    ],
    proof: "Ignition shows and controls a simulated pump, preserves bad quality, and restores from a project backup.",
    resources: [
      { title: "Ignition credential courses", provider: "Inductive University", url: "https://inductiveuniversity.com/", format: "Course", access: "Free", selection: "Getting Started, Gateway, Tags, OPC UA, Databases, Perspective, Scripting, and Security.", purpose: "The shortest authoritative path through the parts used in the portfolio." },
      { title: "Ignition Maker Edition", provider: "Inductive Automation", url: "https://inductiveautomation.com/ignition/maker-edition", format: "Software", access: "Free personal use", selection: "Install locally and build every Ignition exercise in one project.", purpose: "Provides the actual SCADA/HMI platform instead of a simulated UI." },
    ],
  },
  {
    id: "plc",
    months: "Months 1–2 · Core",
    title: "PLC logic: Ladder and Structured Text",
    outcome: "Make the controller own deterministic behavior and safe state transitions.",
    topics: [
      "Scan cycle, tags, timers/counters, one-shots, latches, state machines, and retained values",
      "Ladder for discrete control; Structured Text for calculations and reusable logic",
      "Manual/off/auto, permissives, interlocks, fail-safe states, and controlled restart",
    ],
    proof: "A simulated pump refuses unsafe starts, handles mode changes, and recovers predictably after a restart.",
    resources: [
      { title: "CODESYS Development System", provider: "CODESYS", url: "https://www.codesys.com/products/engineering/development-system/", format: "Software + help", access: "Free", selection: "Use the demo SoftPLC, Ladder, Structured Text, watch/trace, breakpoints, and project archive.", purpose: "Covers IEC 61131-3 logic and debugging without buying a PLC." },
      { title: "Free PLC training", provider: "AutomationDirect", url: "https://www.automationdirect.com/programmable-logic-controllers/plc-training", format: "Video course", access: "Free", selection: "PLC operation, scan cycle, basic Ladder, timers, counters, and CLICK examples.", purpose: "Gives a concrete vendor workflow and practical Ladder exercises." },
      { title: "Basics of PLC programming", provider: "Siemens SCE", url: "https://support.industry.siemens.com/cs/attachments/109972110/lp-sce-tia-module-v13-030-basics-of-plc-programming-en.pdf", format: "Training PDF", access: "Free", selection: "Program structure, logic basics, simulation, testing, and diagnostics.", purpose: "Adds exposure to the Siemens ecosystem without buying hardware." },
    ],
  },
  {
    id: "protocols",
    months: "Months 2–3 · Core",
    title: "Industrial protocols and networking",
    outcome: "Know what each protocol carries and diagnose the path instead of guessing.",
    topics: [
      "Modbus TCP/RTU registers, addressing, polling, byte order, timeouts, and RS-485 basics",
      "EtherNet/IP and CIP objects, explicit vs. implicit messaging, and produced/consumed data",
      "OPC UA address space, subscriptions, certificates, read/write boundaries; BACnet/IP conceptually",
    ],
    proof: "Capture a Modbus exchange, map it into OPC UA/Ignition, then explain a timeout and stale-value failure.",
    resources: [
      { title: "Modbus specifications", provider: "Modbus Organization", url: "https://www.modbus.org/specs.php", format: "Specifications", access: "Free", selection: "Application Protocol and Modbus Messaging on TCP/IP; focus on function codes and data model.", purpose: "Prevents register/addressing folklore from replacing the protocol definition." },
      { title: "EtherNet/IP technology overview", provider: "ODVA", url: "https://www.odva.org/technology-standards/key-technologies/ethernet-ip/", format: "Guide", access: "Free", selection: "CIP over Ethernet, objects, connections, explicit/implicit messaging, and device profiles.", purpose: "Builds the vocabulary used in Rockwell-centered plants." },
      { title: "OPC UA Part 1: Overview and Concepts", provider: "OPC Foundation", url: "https://profiles.opcfoundation.org/document/2", format: "Specification", access: "Free", selection: "Architecture, address space, services, subscriptions, security, and profiles.", purpose: "Explains the interoperability layer used between controls and software systems." },
    ],
  },
  {
    id: "electrical",
    months: "Months 2–4 · Core",
    title: "24VDC I/O, relays, contactors, and VFD concepts",
    outcome: "Work safely at extra-low voltage and understand the devices a PLC commands.",
    topics: [
      "Voltage, current, resistance, power, series/parallel circuits, sourcing/sinking, NO/NC contacts",
      "Digital inputs/outputs, fusing, terminal blocks, interposing relays, contactors, overloads, and motor starters",
      "VFD enable/run/speed-reference/fault concepts—no mains or live-motor practice at home",
    ],
    proof: "A labeled 24VDC bench with switches, indicator loads, and a relay; trace and fix one wiring fault.",
    resources: [
      { title: "Instrumentation and Control, Volume 1", provider: "U.S. Department of Energy", url: "https://www.energy.gov/ehss/articles/doe-hdbk-10131-92", format: "Handbook", access: "Free", selection: "Electrical fundamentals, detectors, transmitters, control loops, and basic control devices.", purpose: "Provides a rigorous free foundation before hardware work." },
      { title: "Getting started with a CLICK PLC", provider: "AutomationDirect", url: "https://www.automationdirect.com/videos/video?videoToPlay=1smIvqPL9Hs", format: "Video series", access: "Free", selection: "24VDC power, PLC connections, safe bench setup, software, and first I/O program.", purpose: "Maps theory to the same low-cost hardware recommended below." },
      { title: "GS4 VFD analog inputs", provider: "AutomationDirect", url: "https://www.automationdirect.com/videos/video?videoToPlay=DuzWRs5zqsM", format: "Video", access: "Free", selection: "Watch for analog reference and PLC-to-drive concepts only; do not replicate mains wiring at home.", purpose: "Shows how a PLC commands speed without creating an unsafe exercise." },
    ],
  },
  {
    id: "instrumentation",
    months: "Months 3–4 · Core",
    title: "4–20mA instrumentation",
    outcome: "Turn a field signal into a trustworthy engineering value and recognize common failures.",
    topics: [
      "Two-wire loops, loop power, polarity, burden resistance, scaling, units, and raw counts",
      "Normal 4–20mA range vs. underrange/overrange, open circuit, short, drift, and bad calibration",
      "Level, flow, pressure, and temperature measurement at a practical overview level",
    ],
    proof: "Generate 4, 12, and 20mA; verify the measurement; scale to tank level; document open-loop behavior.",
    resources: [
      { title: "Instrumentation and Control, Volume 1", provider: "U.S. Department of Energy", url: "https://www.energy.gov/ehss/articles/doe-hdbk-10131-92", format: "Handbook", access: "Free", selection: "Temperature, pressure, level, and flow detection plus transmitter and control-loop fundamentals.", purpose: "Connects measurement physics to the signals used in the lab." },
      { title: "Sense distance with a CLICK PLC", provider: "AutomationDirect", url: "https://www.automationdirect.com/videos/video?videoToPlay=wJlop2JXGyQ", format: "Video lab", access: "Free", selection: "4–20mA sensor wiring, analog input mapping, scaling, and PLC use.", purpose: "A direct model for the capstone level-transmitter exercise." },
      { title: "Rosemount 3144S manual", provider: "Emerson", url: "https://www.emerson.com/en/measurement-instrumentation/catalog/temperature-measurement/3144s-manual", format: "Field manual", access: "Free", selection: "Loop test, 4–20mA output, loop integrity, polarity, impedance, and fault diagnosis sections.", purpose: "Shows how a real instrument is commissioned and troubleshot." },
    ],
  },
  {
    id: "drawings",
    months: "Months 3–5 · Core",
    title: "P&IDs, electrical schematics, and I/O documents",
    outcome: "Read the documents used to build, test, and troubleshoot a control system.",
    topics: [
      "P&ID symbols, line types, instrument tags, process flow, valves, pumps, and control loops",
      "Elementary electrical schematics, panel layouts, terminal plans, wire numbers, and one-lines",
      "I/O list, tag database, control narrative, sequence of operations, and cause/effect table",
    ],
    proof: "A small P&ID, electrical schematic, I/O list, and control narrative that agree with the working capstone.",
    resources: [
      { title: "Engineering Symbology, Prints, and Drawings", provider: "U.S. Department of Energy", url: "https://www.energy.gov/ehss/articles/doe-hdbk-10161-93", format: "Handbook", access: "Free", selection: "Engineering fluid diagrams, P&IDs, electrical diagrams, schematics, and print-reading examples.", purpose: "One authoritative free source for the exact drawings required in the portfolio." },
    ],
  },
  {
    id: "alarms",
    months: "Months 4–5 · Core",
    title: "Historians, trends, HMI, and alarms",
    outcome: "Give operators useful evidence and actionable alarms without creating noise.",
    topics: [
      "Historian sampling, deadband, retention, trend selection, timestamps, and data quality",
      "Alarm priority, delay, deadband, acknowledgement, rationalization, flood avoidance, and response text",
      "HMI hierarchy and states: normal, abnormal, bad quality, manual mode, inhibited, and unavailable",
    ],
    proof: "Trend one failure end-to-end and show a small alarm set where every alarm has a consequence and operator action.",
    resources: [
      { title: "Tag Historian and Alarming courses", provider: "Inductive University", url: "https://inductiveuniversity.com/courses/ignition/tag-historian-in-ignition/8.3", format: "Course", access: "Free", selection: "Tag history, trends, alarming, alarm status/journal, shelving, and notification concepts.", purpose: "Implements historian and alarm behavior in the actual portfolio platform." },
      { title: "Alarm management questions that everyone asks", provider: "ISA", url: "https://www.isa.org/intech-home/2020/march-april/features/alarm-management-questions-that-everyone-asks", format: "Article", access: "Free", selection: "Alarm purpose, rationalization, priority, lifecycle, and performance principles.", purpose: "Adds ISA-18.2 thinking without buying the standard or a full course." },
    ],
  },
  {
    id: "commissioning",
    months: "Months 5–7 · Core",
    title: "Commissioning, troubleshooting, and field safety",
    outcome: "Prove changes systematically and leave the system in a known, recoverable state.",
    topics: [
      "FAT/SAT, point-to-point and loop checks, sequence testing, punch lists, as-builts, backups, rollback, and handoff",
      "Trace HMI → tag → protocol → controller → channel → wire → instrument; use evidence before replacement",
      "LOTO awareness, stored energy, permits, PPE boundaries, job hazard analysis, and stop-work judgment",
    ],
    proof: "A FAT/SAT pack plus a recorded fault-injection session covering sensor, pump, network, and restart failures.",
    resources: [
      { title: "CODESYS online debugging features", provider: "CODESYS", url: "https://www.codesys.com/products/engineering/development-system/", format: "Product guide", access: "Free", selection: "Breakpoints, monitoring, trace, sequence control, compare, archive, and restore.", purpose: "Turns the PLC project into a testable and recoverable engineering artifact." },
      { title: "Control of Hazardous Energy", provider: "OSHA", url: "https://www.osha.gov/control-hazardous-energy/", format: "Safety guide", access: "Free", selection: "Hazardous energy types, employer programs, authorized/affected roles, isolation, verification, and training duties.", purpose: "Establishes field-safety vocabulary while making clear that employer/site training is still required." },
    ],
  },
  {
    id: "bms",
    months: "Months 6–9 · Route module",
    title: "BAS/BMS, HVAC controls, and EPMS",
    outcome: "Open the most direct external bridge to data-center controls while keeping an internal AWS option alive.",
    topics: [
      "BACnet/IP objects, devices, discovery, trends, schedules, alarms, and interoperability",
      "Chilled-water and airside sequences, pumps, valves, VFDs, sensors, economizers, and CRAH/AHU concepts",
      "BMS vs. EPMS, electrical one-lines, UPS, generators, switchgear, power meters, and commissioning boundaries",
    ],
    proof: "Adapt the capstone into a chilled-water sequence with BACnet vocabulary, an EPMS one-line, alarms, trends, and a commissioning checklist.",
    resources: [
      { title: "BACnet Basics", provider: "The BACnet Institute", url: "https://bacnetinternational.org/tbi/", format: "Course", access: "Free with registration", selection: "BACnet basics, devices, interoperability, networking, troubleshooting, and security.", purpose: "The authoritative free introduction to the dominant BAS protocol." },
      { title: "Data center learning path", provider: "Schneider Electric University", url: "https://www.se.com/us/en/about-us/university/", format: "Course catalog", access: "Free", selection: "Power, cooling, UPS, reliability, energy efficiency, and Data Center Certified Associate preparation.", purpose: "Builds mission-critical facility context around the controls layer." },
      { title: "Niagara training overview", provider: "Tridium University", url: "https://www.tridium.com/us/en/services-support/tridium-university", format: "Training catalog", access: "Free + paid", selection: "Use free BAS/Niagara orientation now; pursue Niagara certification only when a target employer requires or funds it.", purpose: "Adds awareness of a common multi-vendor BAS ecosystem without premature certification spend." },
    ],
  },
  {
    id: "cybersecurity",
    months: "Months 7–10 · Route module",
    title: "OT/ICS cybersecurity basics",
    outcome: "Add defensive security without losing the process-safety and availability context.",
    topics: [
      "Asset inventory, zones/conduits, segmentation, jump hosts, remote access, Windows/AD, and least privilege",
      "Passive monitoring, baselines, backups/restore, vulnerability/change management, and incident response",
      "Safety and availability constraints, insecure-by-design protocols, compensating controls, and vendor access",
    ],
    proof: "A lab-only architecture, passive asset inventory, restricted write path, restore test, and one incident playbook.",
    resources: [
      { title: "NIST SP 800-82 Rev. 3", provider: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/82/r3/final", format: "Guide", access: "Free", selection: "OT architecture, threats, risk, segmentation, access control, monitoring, and incident response.", purpose: "The practical baseline for protecting OT without applying ordinary IT controls blindly." },
      { title: "ICS training", provider: "CISA", url: "https://www.cisa.gov/ics-training-available-through-cisa", format: "Course", access: "Free", selection: "Start with introductory web-based ICS cybersecurity, then defensive intermediate material.", purpose: "Provides structured public training and hands-on follow-on options." },
      { title: "ATT&CK for ICS", provider: "MITRE", url: "https://attack.mitre.org/matrices/ics/", format: "Knowledge base", access: "Free", selection: "Use tactics and techniques to build one detection-and-response scenario; do not memorize the matrix.", purpose: "Turns the security module into an evidence-based incident exercise." },
    ],
  },
];

const software = [
  ["Ignition Maker Edition", "Install on macOS now; use it for the HMI, alarms, historian, and OPC UA layer.", "https://inductiveautomation.com/ignition/maker-edition"],
  ["PostgreSQL", "Use one local database for historian data and a few diagnostic queries.", "https://www.postgresql.org/download/"],
  ["Wireshark", "Capture only your lab traffic; identify Modbus TCP requests, responses, retransmits, and connection loss.", "https://www.wireshark.org/download.html"],
  ["CODESYS Development System", "Free IEC 61131-3 environment with a demo SoftPLC. Version 3 is Windows-based, so use a Windows VM or spare PC.", "https://www.codesys.com/products/engineering/development-system/"],
  ["CLICK Programming Software", "Install only if you buy a CLICK PLC. It is free and Windows-based.", "https://www.automationdirect.com/clickplcs/free-software/free-click-software"],
];

const employers = [
  {
    label: "BAS/BMS and HVAC controls — most aligned bridge",
    names: "Siemens, Johnson Controls, Honeywell, Schneider Electric, Trane, Automated Logic, Albireo Energy, EMCOR, Climatec, Niagara partners",
    action: "Search building automation, HVAC controls, BMS, DDC, BACnet, Niagara, startup, and commissioning. Favor power/cooling and mission-critical sites.",
  },
  {
    label: "Industrial systems integrators — broadest experience",
    names: "E Tech Group, RoviSys, Wunderlich-Malec, Tesco Controls, Revere Control Systems, InflexionPoint, Electronic Drives and Controls",
    action: "Use the CSIA directory; filter by industry and geography. Favor roles spanning PLC, SCADA, I/O, and commissioning.",
    url: "https://controlsys.org/find-an-integrator/",
  },
  {
    label: "Utilities, OEMs, and engineering firms — stable alternatives",
    names: "NYC DEP, American Water, Veolia, Jacobs, Black & Veatch, HDR, Rockwell, Emerson, ABB, Xylem, Endress+Hauser",
    action: "Search SCADA, automation, I&C, applications, field service, and commissioning. Screen for real system ownership and learning repetitions.",
  },
];

const jobTitleGroups = [
  {
    label: "BEST GENERAL SEARCHES",
    title: "Core controls / automation",
    names: ["Controls Engineer", "Automation Engineer", "Control Systems Engineer", "SCADA Engineer"],
    note: "Same career family. Scope shifts between PLC/I/O, SCADA, networking, and system integration.",
  },
  {
    label: "MOST ALIGNED BRIDGE",
    title: "Building controls",
    names: ["BAS Engineer", "BMS Controls Engineer", "HVAC Controls Engineer", "BAS Programmer"],
    note: "Same controls career applied to HVAC/buildings, usually with DDC and BACnet. Strong preparation for data-center BMS.",
  },
  {
    label: "WORK-STYLE MODIFIERS",
    title: "Field and commissioning",
    names: ["Controls Commissioning Engineer", "Controls Systems Integrator", "Field Automation Engineer", "Field Service Engineer — Controls"],
    note: "Not a different technical path. These titles emphasize startup, travel, site testing, and troubleshooting.",
  },
];

const optionComparison = [
  { stage: "Entry route", option: "Internal AWS controls", ceiling: "Very high", reach: "Low–medium now", outlook: "Narrow openings; strong data-center buildout", fit: "High employer fit; medium controls fit" },
  { stage: "Entry route", option: "BAS / BMS controls", ceiling: "High", reach: "High probability-weighted", outlook: "Broad, local, and steady", fit: "Medium–high" },
  { stage: "Entry route", option: "Industrial / water integrator", ceiling: "High", reach: "Medium–high", outlook: "Broad but title-fragmented", fit: "Medium" },
  { stage: "Destination", option: "Data-center controls", ceiling: "Very high", reach: "Medium after field proof", outlook: "Strong; concentrated by geography", fit: "High after BMS/commissioning" },
  { stage: "Later pivot", option: "SCADA software", ceiling: "Highest", reach: "Low–medium; few roles", outlook: "Narrow, selective, growing", fit: "Highest after OT proof" },
  { stage: "Later pivot", option: "OT / ICS cybersecurity", ceiling: "High", reach: "Medium", outlook: "Steady, experience-gated", fit: "High after real OT exposure" },
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
  "Keep both an internal-AWS packet and an external-controls packet ready so a layoff does not reset the search.",
];

export default function ControlsScadaPage() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("controls-scada-plan-v2");
      if (saved) {
        setDone(JSON.parse(saved));
        return;
      }
      const legacy = localStorage.getItem("controls-scada-plan-v1");
      if (legacy) {
        const old = JSON.parse(legacy) as Record<string, boolean>;
        const migrated = {
          ignition: !!old.software,
          plc: !!old.foundation,
          protocols: !!old.software,
          electrical: !!old.foundation,
          instrumentation: !!old.physical,
          drawings: !!old.physical,
          alarms: !!old.software,
          commissioning: !!old.capstone,
          bms: !!old.market,
          cybersecurity: !!old.market,
        };
        setDone(migrated);
        localStorage.setItem("controls-scada-plan-v2", JSON.stringify(migrated));
      }
    } catch {}
  }, []);

  const toggleModule = (id: string) => {
    setDone((current) => {
      const next = { ...current, [id]: !current[id] };
      try { localStorage.setItem("controls-scada-plan-v2", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const completed = modules.filter((module) => done[module.id]).length;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Controls career plan</span>
          <h1>Controls, SCADA, and OT</h1>
          <p>Build PLC, SCADA, instrumentation, and commissioning depth for several viable routes—not one employer-dependent bet.</p>
        </div>
        <aside className={styles.heroPath} aria-label="Core controls path">
          <span>PLC logic</span><i aria-hidden="true">→</i><span>SCADA</span><i aria-hidden="true">→</i><span>Field proof</span>
        </aside>
      </section>

      <nav className={styles.nav} aria-label="Controls career plan sections">
        <a href="#routes">Routes</a>
        <a href="#comparison">Compare</a>
        <a href="#plan">Plan</a>
        <a href="#tools">Tools</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#jobs">Jobs and pay</a>
        <a href="#ready">Apply checklist</a>
      </nav>

      <section className={styles.status}>
        <div>
          <h2>What the work actually is</h2>
          <p>Engineers connect PLC logic, instruments, networks, SCADA, alarms, and historians—then commission and troubleshoot the full chain.</p>
        </div>
        <div className={styles.progress}>
          <strong>{completed}<small> / {modules.length}</small></strong>
          <span>modules complete</span>
          <div><i style={{ width: `${(completed / modules.length) * 100}%` }} /></div>
        </div>
      </section>

      <section className={styles.twoColumn}>
        <article>
          <h3>What transfers from SWE</h3>
          <ul>
            <li>Python/scripting → Ignition scripting, test tools, and data integration</li>
            <li>SQL → historians, trends, event analysis, and reporting</li>
            <li>TCP/IP → industrial Ethernet, routing, diagnostics, and OT segmentation</li>
            <li>Distributed-systems debugging → tracing failures across PLC, network, server, database, and UI</li>
            <li>Versioning, testing, deployment, observability → safer controls change management</li>
          </ul>
        </article>
        <article className={styles.boundary}>
          <h3>The actual gap</h3>
          <p>You still need PLC logic, 24VDC I/O, instrumentation, drawings, motor-control concepts, commissioning discipline, and comfort working on-site. A CS degree is relevant to many controls/OT roles; a PE license or another engineering degree is not the default price of entry for this path.</p>
        </article>
      </section>

      <section id="routes" className={styles.routeStrategy}>
        <header>
          <span className={styles.eyebrow}>Three ways in</span>
          <h2>Same career. Different entry routes.</h2>
          <p>These are employment routes into the same controls/automation career—not three unrelated careers. Amazon is useful leverage, but it cannot be the plan’s single point of failure.</p>
        </header>
        <div className={styles.routeGrid}>
          <article>
            <span>Internal upside</span>
            <h3>Amazon SWE → AWS controls</h3>
            <p>Stay employed while learning. Search internal Data Center Controls, Critical Facilities Controls, BMS/EPMS, Controls Design, and infrastructure-automation roles.</p>
            <ul>
              <li>Set recurring searches by title, org, location, and BMS/EPMS keywords</li>
              <li>Ask a controls engineer, hiring manager, and recruiter what would block a transfer</li>
              <li>Share the capstone and a controls-specific résumé; ask for concrete gap feedback</li>
              <li>Pursue a shadow, site visit, or stretch task only where the relevant teams permit it</li>
            </ul>
            <b>Advantage:</b><p>Amazon context, internal network, and proven delivery reduce transition risk. They do not replace controls or commissioning experience.</p>
          </article>
          <article>
            <span>Most aligned external bridge</span>
            <h3>BAS/BMS and HVAC controls</h3>
            <p>Target building-automation integrators, OEM branches, and mission-critical facilities. BACnet, HVAC sequences, BMS, startup, and commissioning transfer directly toward data-center power/cooling controls.</p>
            <b>Best when:</b><p>You need experience before a hyperscaler will take the bet, or Amazon employment ends unexpectedly.</p>
          </article>
          <article>
            <span>Broadest external bridge</span>
            <h3>Industrial / water controls</h3>
            <p>Target systems integrators and field-service teams for PLC, SCADA, instrumentation, drawings, and repeated commissioning. This is the broadest way to become employable across industrial OT.</p>
            <b>Tradeoff:</b><p>Often more travel and a larger initial pay cut, but stronger hands-on breadth than a narrow in-house role.</p>
          </article>
        </div>
        <aside><strong>If a layoff happens:</strong> switch from “learn beside Amazon” to the already-prepared BAS/BMS + integrator search. Do not wait for an AWS opening, and do not restart the curriculum.</aside>
      </section>

      <section id="comparison" className={styles.comparison}>
        <header>
          <span className={styles.eyebrow}>Compare the options</span>
          <h2>Compare the routes</h2>
          <p>These are directional judgments based on your SWE/Amazon position, the controls experience gap, current postings, and hiring breadth.</p>
        </header>
        <div className={styles.decisionCards}>
          {optionComparison.map((item) => <article key={item.option}>
            <header><span>{item.stage}</span><h3>{item.option}</h3></header>
            <dl>
              <div><dt>Pay ceiling</dt><dd>{item.ceiling}</dd></div>
              <div><dt>Chance to reach it</dt><dd>{item.reach}</dd></div>
              <div><dt>Hiring outlook</dt><dd>{item.outlook}</dd></div>
              <div><dt>Fit from SWE</dt><dd>{item.fit}</dd></div>
            </dl>
          </article>)}
        </div>
        <div className={styles.comparisonSummary}>
          <p><b>Best probability-weighted entry:</b> BAS/BMS, with industrial integrators close behind.</p>
          <p><b>Best immediate upside:</b> internal AWS—pursue it, but do not make it the only route.</p>
          <p><b>Highest ceiling:</b> SCADA software; the tradeoff is far fewer openings and a real OT credibility requirement.</p>
          <p><b>Best durable destination:</b> data-center controls after BMS/PLC/commissioning proof.</p>
        </div>
        <p className={styles.outlookNote}>There is no clean BLS category for controls engineering. Adjacent U.S. categories are positive: industrial engineers are projected to grow 11% and electrical/electronics engineers 7% from 2024–2034, versus 3.1% overall. DOE projects U.S. data-center electricity use to double or triple from 2023 levels by 2028—supportive of power/cooling controls demand, not a guarantee of job volume.</p>
        <div className={styles.inlineLinks}>
          <a href="https://www.bls.gov/emp/tables/occupational-projections-and-characteristics.htm" target="_blank" rel="noreferrer">BLS projections ↗</a>
          <a href="https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers" target="_blank" rel="noreferrer">DOE data-center outlook ↗</a>
        </div>
      </section>

      <section id="top-tier" className={styles.topTier}>
        <div>
          <span className={styles.eyebrow}>Highest-pay destinations</span>
          <h2>Data-center controls and SCADA software</h2>
          <p>The strongest pay and technical scope sit around power, cooling, BMS, EPMS, PLC, SCADA, and commissioning for hyperscale data centers.</p>
        </div>
        <dl>
          <div><dt>Target titles</dt><dd>Data Center Controls Engineer → Senior / Staff / Principal Controls Engineer, Controls Architect, or SCADA Software Engineer</dd></div>
          <div><dt>Employer tier</dt><dd>AWS, Google, Microsoft, Meta; AI-infrastructure builders such as Fluidstack or CoreWeave; top mission-critical integrators and data-center operators</dd></div>
          <div><dt>Practical routes</dt><dd>Direct internal transfer, BAS/BMS bridge, or industrial-controls bridge → real commissioning depth → hyperscale controls, controls architecture, or SCADA software</dd></div>
          <div><dt>Current proof</dt><dd>An AWS Ashburn Data Center Controls role lists $111.3k–$186.1k base plus sign-on/RSUs; Fluidstack lists SCADA software at $224k–$264k base plus equity.</dd></div>
        </dl>
        <a href="https://www.amazon.jobs/en/jobs/3119108/data-center-controls-engineer-data-center-capacity-delivery-controls" target="_blank" rel="noreferrer">AWS role evidence ↗</a>
      </section>

      <section id="plan" className={styles.section}>
        <header>
          <span className={styles.eyebrow}>10 modules · 6–12 months · 6–8 hours/week</span>
          <h2>Learn the shared core first.</h2>
          <p>Start internal conversations now. Apply broadly when the core modules and capstone are explainable; do not wait to finish both route modules.</p>
        </header>
        <div className={styles.stageList}>
          {modules.map((module) => (
            <article className={done[module.id] ? styles.complete : ""} key={module.id}>
              <div className={styles.stageMeta}>
                <span>{module.months}</span>
                <label>
                  <input type="checkbox" checked={!!done[module.id]} onChange={() => toggleModule(module.id)} />
                  <i aria-hidden="true" />
                  {done[module.id] ? "Done" : "Mark done"}
                </label>
              </div>
              <h3>{module.title}</h3>
              <p>{module.outcome}</p>
              <ul>{module.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
              <div className={styles.proof}><span>Proof before moving on</span><p>{module.proof}</p></div>
              <details className="resources"><summary>Study resources <b>{module.resources.length}</b></summary><div>{module.resources.map((resource) => <a href={resource.url} target="_blank" rel="noreferrer" key={resource.title}><span className="resource-meta">{resource.format} · {resource.access}</span><strong>{resource.title}</strong><em>{resource.provider}</em><p><b>Use:</b> {resource.selection}</p><small>{resource.purpose}</small></a>)}</div></details>
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
            <span className={styles.eyebrow}>RECOMMENDED STARTER · BUDGET ROUGHLY $350–$500</span>
            <h3>Buy only after the simulated pump works.</h3>
            <ul>
              <li><b>PLC:</b> AutomationDirect CLICK PLUS C2-01CPU with a mixed discrete/4–20mA option module; recheck current compatibility and price before ordering</li>
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
          <h2>Portfolio evidence a controls team can inspect.</h2>
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
          <span className={styles.eyebrow}>ONE CAREER FAMILY · TITLES VARY BY LAYER AND INDUSTRY</span>
          <h2>Use the title map, then read the actual duties.</h2>
          <p>“Controls Engineer” or “Automation Engineer” is the clean identity. SCADA and BMS titles narrow the system layer; field and commissioning titles describe how the work is delivered.</p>
        </header>
        <div className={styles.titleGrid}>
          {jobTitleGroups.map((group) => <article key={group.title}>
            <span>{group.label}</span>
            <h3>{group.title}</h3>
            <div className={styles.pills}>{group.names.map((name) => <span key={name}>{name}</span>)}</div>
            <p>{group.note}</p>
          </article>)}
        </div>
        <div className={styles.jobsGrid}>
          <article>
            <span className={styles.eyebrow}>WHAT STAYS THE SAME</span>
            <h3>The controls-engineering core</h3>
            <ul>
              <li>Controller logic, I/O, instruments, networks, HMI/SCADA, alarms, and trends</li>
              <li>Sequences, interlocks, safe failures, testing, documentation, and troubleshooting</li>
              <li>Commissioning exposure is valuable under every title</li>
            </ul>
            <p className={styles.note}>Also search “PLC,” “Ignition,” “SCADA,” “BAS,” “BMS,” “DDC,” “BACnet,” “HVAC controls,” and “commissioning.” Read duties more closely than titles.</p>
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

        <div className={styles.compTable}>
          <div className={styles.compHead}><span>Stage</span><span>Normal base</span><span>Upside—not base</span></div>
          <div><strong>First controls / SCADA / BAS role</strong><span>$70k–$115k</span><p>Paid overtime and heavy travel can lift cash, but they also change the quality-of-life tradeoff.</p></div>
          <div><strong>2–5 years; independent commissioning</strong><span>$105k–$150k</span><p>Travel, shutdown work, or straight-time/1.5× overtime can push cash higher.</p></div>
          <div><strong>5–8 years; senior / architect / OT lead</strong><span>$135k–$185k</span><p>Bonuses, overtime, or scarce platform/domain expertise can approach or exceed $200k.</p></div>
          <div><strong>Selective destination examples</strong><span>$111k–$264k</span><p>Current AWS controls and Fluidstack SCADA-software listings span this range; they are different roles, levels, and markets.</p></div>
        </div>
        <p className={styles.salaryNote}>Planning ranges for NYC/NJ and higher-paying US markets, not guarantees. Internal mobility may preserve more total compensation than an external bridge, but verify level and package. Per diem is reimbursement, and bill rate is not take-home pay.</p>

        <div className={styles.marketProof}>
          <a href="https://jobs.johnsoncontrols.com/job/WD30271225" target="_blank" rel="noreferrer"><span>BAS BRIDGE EVIDENCE</span><h3>Johnson Controls · Building Automation Controls Designer</h3><p>$28–$36/hour; computer science is accepted, with controls commissioning and mechanical/electrical knowledge preferred.</p><b>View current posting ↗</b></a>
          <a href="https://jobs.smartrecruiters.com/CityOfNewYork/3743990013320821-scada-project-planner" target="_blank" rel="noreferrer"><span>MID-CAREER EXAMPLE</span><h3>NYC DEP · SCADA Project Planner</h3><p>$125k–$150k salary band; CS accepted with relevant automation/infrastructure experience.</p><b>View current posting ↗</b></a>
          <a href="https://www.amazon.jobs/en/jobs/3119108/data-center-controls-engineer-data-center-capacity-delivery-controls" target="_blank" rel="noreferrer"><span>DATA-CENTER EXAMPLE</span><h3>AWS · Data Center Controls Engineer</h3><p>$111.3k–$186.1k base in Ashburn plus sign-on/RSUs; BMS, EPMS, power/cooling, troubleshooting, and commissioning.</p><b>View current posting ↗</b></a>
          <a href="https://jobs.ashbyhq.com/fluidstack/7528afd0-2aae-4cab-8d47-9c3e5d004813" target="_blank" rel="noreferrer"><span>CS + OT ENDGAME</span><h3>Fluidstack · Software Engineer, SCADA</h3><p>$224k–$264k base plus equity; modern software built against SCADA, EPMS, OPC UA, historians, and alarms.</p><b>View current posting ↗</b></a>
        </div>
        <p className={styles.checked}>Market examples checked August 23, 2026. Postings can close; use them as skill and compensation evidence, not as promised openings.</p>
      </section>

      <section className={styles.section}>
        <header>
          <span className={styles.eyebrow}>DESTINATION SPECIALIZATION AND OPTIONAL LATER PIVOTS</span>
          <h2>One continuation; two adjacent branches.</h2>
        </header>
        <div className={styles.exitGrid}>
          <article>
            <span>PATH A · DATA-CENTER CONTROLS</span>
            <h3>Same career, higher-value environment</h3>
            <p>Add BACnet/IP, sequences of operation, chilled-water/HVAC fundamentals, electrical one-lines, UPS/generators/switchgear concepts, trend-based fault finding, and commissioning levels. Target Data Center Controls Engineer, BMS/EPMS Controls Engineer, Commissioning Engineer, Controls Design Engineer, and SCADA Software Engineer.</p>
          </article>
          <article>
            <span>PATH B · OT / ICS CYBERSECURITY</span>
            <h3>Adjacent later pivot: defensive security</h3>
            <p>Add asset inventory, zones/conduits, firewalls, jump hosts, remote-access controls, Windows/AD in OT, backups and restore tests, passive monitoring, vulnerability/change management, and incident response. Start with NIST SP 800-82 and CISA ICS training; treat IEC 62443 as working vocabulary, not a certificate-shopping plan.</p>
            <div className={styles.inlineLinks}>
              <a href="https://csrc.nist.gov/pubs/sp/800/82/r3/final" target="_blank" rel="noreferrer">NIST SP 800-82 ↗</a>
              <a href="https://www.cisa.gov/ics-training-available-through-cisa" target="_blank" rel="noreferrer">CISA ICS training ↗</a>
              <a href="https://attack.mitre.org/matrices/ics/" target="_blank" rel="noreferrer">MITRE ATT&CK for ICS ↗</a>
            </div>
          </article>
          <article>
            <span>PATH C · SCADA / CONTROLS SOFTWARE</span>
            <h3>Adjacent later pivot: industrial software</h3>
            <p>Use the strongest parts of your SWE background: SCADA services, historian/event pipelines, OPC UA integrations, deployment tooling, testing, observability, and safe change workflows. This branch has the highest software leverage, but domain credibility still comes from working controls and commissioning evidence.</p>
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
            <li>Paying for Niagara N4 before a target employer requires or funds it; the free Ignition credential is optional after hands-on work</li>
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
          <p>Begin networking sooner. Start serious applications around 7 of 10 items; you need enough proof that a senior engineer can safely train you, not solo-plant readiness.</p>
        </header>
        <div>{readyItems.map((item) => <label key={item}><input type="checkbox" /><i aria-hidden="true" /><span>{item}</span></label>)}</div>
      </section>

      <footer className={styles.footer}>Shared core: SWE → PLC + SCADA + instrumentation + commissioning. Job lanes: internal AWS, BAS/BMS, or industrial controls. Later branches: data-center controls, SCADA software, or OT/ICS cybersecurity.</footer>
    </main>
  );
}
