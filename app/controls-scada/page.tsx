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

const rolePaths = [
  {
    tier: "S",
    label: "Best direct target",
    title: "Software-forward SCADA and facility automation",
    summary: "Software that connects SCADA, BMS/EPMS, historians, telemetry, alarms, and physical equipment.",
    titles: ["Software Engineer — SCADA", "Facility Software Automation Engineer", "Industrial Software Engineer", "Facilities Production Engineer — Controls", "SCADA Applications Engineer"],
    pay: 5,
    security: 4,
    transfer: 4,
    outlook: "Selective: fewer openings, but the strongest use of your SWE background.",
    verdict: "Apply first when the role values Python, SQL, distributed systems, telemetry, APIs, or deployment tooling alongside OT.",
  },
  {
    tier: "A",
    label: "Best destination",
    title: "Owner-side data-center controls",
    summary: "Own BMS, EPMS, SCADA, power, cooling, alarms, reliability, and commissioning for critical infrastructure.",
    titles: ["Data Center Controls Engineer", "BMS/EPMS Controls Engineer", "Facility Telemetry & Controls Engineer", "Controls Design Engineer", "Controls Commissioning Engineer — Data Center"],
    pay: 5,
    security: 5,
    transfer: 2,
    outlook: "Strong physical-infrastructure demand; openings cluster around data-center markets.",
    verdict: "The strongest long-term balance of pay and AI resistance. Direct entry is experience-gated, so treat it as both a stretch target and destination.",
  },
  {
    tier: "A",
    label: "Strong alternative",
    title: "Advanced industrial automation",
    summary: "Controls and SCADA for semiconductors, energy, pharma, advanced manufacturing, robotics, or autonomous labs.",
    titles: ["Automation Engineer", "Controls Engineer", "Instrumentation & Controls Engineer", "Manufacturing Controls Engineer", "SCADA Engineer"],
    pay: 4,
    security: 5,
    transfer: 3,
    outlook: "Broad across high-value industries; software-heavy roles are the best match.",
    verdict: "Prioritize roles with data integration, Ignition, Python, SQL, OPC UA, commissioning, and production ownership.",
  },
  {
    tier: "B",
    label: "Best experience bridge",
    title: "Top controls systems integrator",
    summary: "Build PLC, SCADA, instrumentation, networking, and commissioning experience across multiple sites and customers.",
    titles: ["Controls Engineer", "Automation Engineer", "Controls Systems Integrator", "SCADA Engineer", "Field Automation Engineer"],
    pay: 3,
    security: 5,
    transfer: 4,
    outlook: "The broadest hiring market and the fastest way to accumulate real commissioning proof.",
    verdict: "Favor data-center, semiconductor, pharma, energy, or water projects over low-complexity panel or maintenance work.",
  },
  {
    tier: "B",
    label: "Aligned physical-systems bridge",
    title: "Mission-critical BAS/BMS",
    summary: "Apply controls engineering to HVAC, chilled water, power monitoring, and large facilities using DDC and BACnet.",
    titles: ["BMS Controls Engineer", "BAS Programmer", "Building Automation Engineer", "HVAC Controls Engineer", "BMS Commissioning Engineer"],
    pay: 3,
    security: 5,
    transfer: 4,
    outlook: "Broad and local; mission-critical work is more valuable than ordinary comfort controls.",
    verdict: "A direct preparation route for data-center BMS, but screen compensation and avoid roles dominated by basic service calls.",
  },
  {
    tier: "C",
    label: "Fallback, not first choice",
    title: "Generic BAS service or controls technician",
    summary: "Install, maintain, and troubleshoot building controls, usually with more field work and less engineering ownership.",
    titles: ["Controls Technician", "BAS Service Technician", "Field Service Engineer — Controls", "Building Automation Technician"],
    pay: 2,
    security: 5,
    transfer: 3,
    outlook: "Plentiful and difficult to automate, but compensation and software leverage are usually lower.",
    verdict: "Use only when it provides programming, commissioning, and a credible path upward—not permanent maintenance or panel work.",
  },
];

const companyTiers = [
  {
    rank: "Tier 1",
    title: "Premium destination employers",
    summary: "The best potential combination of compensation, physical-infrastructure ownership, and technical scope.",
    groups: [
      { label: "Established cloud and hyperscale", names: ["AWS", "Google", "Microsoft", "Meta", "Oracle Cloud Infrastructure"] },
      { label: "AI infrastructure builders", names: ["Fluidstack", "Lambda", "Crusoe", "CoreWeave", "xAI"] },
    ],
    note: "Established hyperscalers generally offer the better employer-stability balance. AI-infrastructure builders may pay more, but startup and equity risk are real.",
  },
  {
    rank: "Tier 2",
    title: "Strong owners and high-value industries",
    summary: "Good long-term employers when the position includes genuine controls, SCADA, commissioning, or facility-software ownership.",
    groups: [
      { label: "Data-center owners and operators", names: ["QTS", "Equinix", "Digital Realty", "Vantage Data Centers", "CyrusOne", "NTT Global Data Centers", "Iron Mountain Data Centers", "STACK Infrastructure", "Compass Datacenters", "Aligned Data Centers", "EdgeConneX", "Switch", "DC BLOX", "DataBank", "Sabey Data Centers"] },
      { label: "Advanced hardware and energy", names: ["Periodic Labs", "SpaceX", "Tesla", "Anduril", "Skydio", "Commonwealth Fusion Systems", "Boston Materials", "Critical Energy", "Marathon Fusion", "Vital Lyfe", "Redwood Materials"] },
      { label: "Semiconductor", names: ["TSMC", "Micron", "Intel", "GlobalFoundries", "Texas Instruments", "Samsung Semiconductor", "Applied Materials"] },
      { label: "Pharma and regulated manufacturing", names: ["Eli Lilly", "Amgen", "Genentech / Roche", "Merck", "Pfizer", "Regeneron", "Novo Nordisk", "Johnson & Johnson", "Thermo Fisher Scientific"] },
    ],
    note: "Do not assume every engineering role here is relevant. Look for PLC, SCADA, I&C, BMS/EPMS, facility automation, commissioning, or manufacturing-automation ownership.",
  },
  {
    rank: "Tier 3",
    title: "Best experience-building integrators",
    summary: "Usually lower-paying than owner-side roles, but often the most reliable way to acquire PLC/SCADA and commissioning depth.",
    groups: [
      { label: "Large and established integrators", names: ["RoviSys", "Prime Controls", "Wunderlich-Malec", "E Tech Group", "BW Design Group", "Thermo Systems", "Revere Control Systems", "Wood", "SAGE Group", "Grantek", "Interstates", "M.C. Dean", "Vertech"] },
      { label: "Engineering and specialist firms", names: ["Burns & McDonnell", "Jacobs", "Salas O’Brien", "Hargrove Controls & Automation", "ENTRUST Solutions Group", "GrayMatter", "Matrix Technologies", "Logical Systems", "Flexware Innovation", "Applied Control Engineering", "Hallam-ICS", "Cybertrol Engineering", "Concept Systems", "Tesco Controls"] },
    ],
    note: "Favor teams serving data centers, semiconductors, pharma, energy, and water. Verify travel, overtime, mentorship, logic ownership, and commissioning scope.",
    links: [
      { label: "2026 SI Giants", url: "https://www.controleng.com/system-integrator-giants/2026-system-integrator-giants/" },
      { label: "CSIA directory", url: "https://controlsys.org/find-an-integrator/" },
      { label: "Ignition integrators", url: "https://inductiveautomation.com/integrators/" },
    ],
  },
  {
    rank: "Tier 4",
    title: "Vendor and BAS routes",
    summary: "Useful when the specific role includes applications engineering, programming, integration, or commissioning.",
    groups: [
      { label: "Industrial automation platforms", names: ["Rockwell Automation", "Siemens", "Schneider Electric", "Honeywell", "Emerson", "ABB", "Yokogawa", "Beckhoff", "Mitsubishi Electric", "Phoenix Contact", "Inductive Automation", "AVEVA"] },
      { label: "Building controls ecosystems", names: ["Tridium", "Johnson Controls", "Trane Technologies", "Carrier / Automated Logic", "Delta Controls", "Distech Controls", "Albireo Energy", "Climatec", "EMCOR", "McKinstry", "MacDonald-Miller"] },
    ],
    note: "A product-software or application-engineering job can move up a tier. A branch-level service job can move down one; judge the duties, not the logo.",
  },
];

const jobTitleGroups = [
  {
    label: "PRIMARY SEARCH TITLES",
    title: "The broad career identity",
    names: ["Controls Engineer", "Automation Engineer", "SCADA Engineer", "Industrial Automation Engineer"],
    note: "Start here. These titles usually cover some combination of controller logic, I/O, SCADA, networking, integration, and troubleshooting.",
  },
  {
    label: "SYSTEM SPECIALIZATION",
    title: "The layer or industry",
    names: ["BMS/EPMS Controls Engineer", "SCADA Applications Engineer", "BAS Programmer", "Instrumentation & Controls Engineer"],
    note: "These narrow the same career toward buildings, electrical monitoring, SCADA software, or process instrumentation.",
  },
  {
    label: "ON-SITE DELIVERY EMPHASIS",
    title: "More startup and commissioning",
    names: ["Controls Commissioning Engineer", "Controls Systems Integrator", "Field Automation Engineer", "Field Service Engineer — Controls"],
    note: "These are not separate careers. They signal more travel, site testing, startup, handoff, and live troubleshooting.",
  },
];

const titleTraps = [
  ["Project Controls", "Usually construction cost, schedule, and risk—not PLC or control systems."],
  ["BMS", "Can mean building management system or battery management system. Look for BACnet, HVAC, EPMS, or Tridium."],
  ["Control Systems Engineer", "Can mean industrial automation or mathematical/robotics control algorithms. Read the tools and equipment."],
  ["SCADA Engineer", "Can mean operating an existing utility system or building software and integrations around SCADA."],
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
  "Maintain one controls-focused résumé, then adapt its opening for software-forward, integrator, or data-center roles.",
];

export default function ControlsScadaPage() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [progressState, setProgressState] = useState<"loading" | "saved" | "memory-only">("loading");
  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("controls-scada-plan-v2");
      if (saved) {
        setDone(JSON.parse(saved));
      } else {
        const legacy = localStorage.getItem("controls-scada-plan-v1");
        if (!legacy) {
          setProgressState("saved");
          return;
        }
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
      setProgressState("saved");
    } catch {
      setProgressState("memory-only");
    } finally {
      setProgressLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!progressLoaded) return;
    try {
      localStorage.setItem("controls-scada-plan-v2", JSON.stringify(done));
      setProgressState("saved");
    } catch {
      setProgressState("memory-only");
    }
  }, [done, progressLoaded]);

  const toggleModule = (id: string) => {
    setDone((current) => ({ ...current, [id]: !current[id] }));
  };

  const completed = modules.filter((module) => done[module.id]).length;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Controls career plan</span>
          <h1>Controls, SCADA, and OT</h1>
          <p>A practical move from software into physical infrastructure—ranked for compensation, AI resistance, and a credible transition from Amazon SWE.</p>
        </div>
        <aside className={styles.heroGoal} aria-label="Career decision criteria">
          <span>Optimize for all three</span>
          <strong>High pay</strong>
          <strong>AI-resistant work</strong>
          <strong>Realistic SWE transfer</strong>
        </aside>
      </section>

      <nav className={styles.nav} aria-label="Controls career plan sections">
        <a href="#path">Best path</a>
        <a href="#jobs">Ranked jobs</a>
        <a href="#companies">Companies</a>
        <a href="#plan">Learn</a>
        <a href="#build">Build</a>
        <a href="#pay">Pay evidence</a>
        <a href="#ready">Apply</a>
      </nav>

      <section id="path" className={styles.status}>
        <div>
          <span className={styles.statusLabel}>Best overall route</span>
          <h2>Software-forward controls first. Owner-side data-center controls later.</h2>
          <p>Use software and systems experience to enter SCADA or industrial automation, add PLC/I/O and commissioning proof, then move toward the highest-value physical infrastructure.</p>
        </div>
        <div className={styles.progress}>
          <strong>{completed}<small> / {modules.length}</small></strong>
          <span>modules complete</span>
          <div><i style={{ width: `${(completed / modules.length) * 100}%` }} /></div>
          <small>{progressState === "memory-only" ? "Progress will reset after this session" : progressState === "saved" ? "Saved on this device" : "Loading saved progress"}</small>
        </div>
      </section>

      <section className={styles.goalGrid} aria-label="Why this route fits the goal">
        <article>
          <span>01 · Compensation</span>
          <h3>Protect the upside</h3>
          <p>Software-forward SCADA and owner-side data-center controls can retain tech-like compensation. Generic service work usually cannot.</p>
        </article>
        <article>
          <span>02 · Durability</span>
          <h3>Tie software to the real world</h3>
          <p>Live equipment, safety, commissioning, troubleshooting, and operational accountability are much harder to automate than ordinary software implementation.</p>
        </article>
        <article>
          <span>03 · Transition</span>
          <h3>Use what already transfers</h3>
          <p>Python, SQL, TCP/IP, observability, versioning, distributed debugging, and data pipelines create a credible entry story—once the field gap is visible and addressed.</p>
        </article>
      </section>

      <section className={styles.pathSection}>
        <header>
          <span className={styles.eyebrow}>One progression</span>
          <h2>The path is clearer than the titles make it look.</h2>
          <p>This is still Controls/SCADA. The middle job may vary because the industry does not use one standardized title.</p>
        </header>
        <div className={styles.pathRail}>
          <article>
            <span>Search first</span>
            <h3>Software-forward controls</h3>
            <p>Target SCADA software, facility automation, industrial software, telemetry, historian, and controls-data roles that value SWE depth.</p>
          </article>
          <article>
            <span>Build the missing proof</span>
            <h3>High-value integrator or industrial role</h3>
            <p>Get hands-on with PLC logic, I/O, instruments, drawings, commissioning, safe change, and troubleshooting across real equipment.</p>
          </article>
          <article>
            <span>Move toward the destination</span>
            <h3>Owner-side data-center controls</h3>
            <p>Own BMS, EPMS, power, cooling, SCADA, alarms, commissioning, and reliability at a hyperscaler or major data-center operator.</p>
          </article>
        </div>
        <aside><strong>Amazon helps, but it is not the strategy.</strong> Internal familiarity, tenure, and networking may improve access to AWS infrastructure roles. They do not replace PLC/BMS/SCADA or commissioning experience, and the plan remains portable outside Amazon.</aside>
      </section>

      <section id="jobs" className={styles.section}>
        <header>
          <span className={styles.eyebrow}>Ranked for your actual goal</span>
          <h2>Good jobs, bridges, and fallbacks.</h2>
          <p>Scores are directional, not universal salary data. “Transition chance” means your fit after a focused controls portfolio—not the chance of getting any job immediately.</p>
        </header>
        <div className={styles.roleLadder}>
          {rolePaths.map((role) => (
            <article className={styles.roleCard} data-tier={role.tier} key={role.title}>
              <div className={styles.roleRank}><strong>{role.tier}</strong><span>{role.label}</span></div>
              <div className={styles.roleCopy}>
                <h3>{role.title}</h3>
                <p>{role.summary}</p>
                <div className={styles.pills}>{role.titles.map((title) => <span key={title}>{title}</span>)}</div>
                <details><summary>Why it ranks here</summary><p>{role.verdict}</p><small>{role.outlook}</small></details>
              </div>
              <div className={styles.scoreGrid} aria-label={`${role.title} scorecard`}>
                <ScoreMeter label="Pay ceiling" value={role.pay} />
                <ScoreMeter label="AI resistance" value={role.security} />
                <ScoreMeter label="Transition chance" value={role.transfer} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <header>
          <span className={styles.eyebrow}>Title decoder</span>
          <h2>They are mostly search terms—not separate careers.</h2>
          <p>Use the title to find the posting. Use the duties to decide whether it belongs in the controls path.</p>
        </header>
        <div className={styles.titleGrid}>
          {jobTitleGroups.map((group) => <article key={group.title}>
            <span>{group.label}</span>
            <h3>{group.title}</h3>
            <div className={styles.pills}>{group.names.map((name) => <span key={name}>{name}</span>)}</div>
            <p>{group.note}</p>
          </article>)}
        </div>
        <details className={styles.titleTraps}>
          <summary>Four naming traps worth checking</summary>
          <div>{titleTraps.map(([title, note]) => <p key={title}><strong>{title}</strong><span>{note}</span></p>)}</div>
        </details>
      </section>

      <section id="companies" className={styles.section}>
        <header>
          <span className={styles.eyebrow}>Company target list</span>
          <h2>Start high. Judge the role, not just the logo.</h2>
          <p>The list is intentionally extensive but collapsed by default. Open the tier relevant to the search instead of scanning one enormous company wall.</p>
        </header>
        <div className={styles.companyTiers}>
          {companyTiers.map((tier, index) => (
            <details open={index === 0} key={tier.title}>
              <summary>
                <span>{tier.rank}</span>
                <div><strong>{tier.title}</strong><small>{tier.summary}</small></div>
                <b>{tier.groups.reduce((count, group) => count + group.names.length, 0)} companies</b>
              </summary>
              <div className={styles.companyBody}>
                {tier.groups.map((group) => <section key={group.label}><h3>{group.label}</h3><div>{group.names.map((name) => <span key={name}>{name}</span>)}</div></section>)}
                <p>{tier.note}</p>
                {tier.links && <div className={styles.inlineLinks}>{tier.links.map((link) => <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>{link.label} ↗</a>)}</div>}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="plan" className={styles.section}>
        <header>
          <span className={styles.eyebrow}>10 modules · 6–12 months · 6–8 hours/week</span>
          <h2>A complete curriculum without ten open textbooks.</h2>
          <p>Each module stays compact until opened. Every module includes concrete resources and a proof artifact—not just a topic list.</p>
        </header>
        <div className={styles.stageList}>
          {modules.map((module, index) => <LearningModule module={module} number={index + 1} complete={!!done[module.id]} onToggle={toggleModule} key={module.id} />)}
        </div>
      </section>

      <section id="build" className={styles.section}>
        <header>
          <span className={styles.eyebrow}>Install first · spend later</span>
          <h2>The smallest useful toolchain.</h2>
          <p>Use software for 4–6 weeks before buying hardware. Vendor PLC tooling is still Windows-heavy; keep Ignition, PostgreSQL, and Wireshark on your Mac and use a Windows VM or spare PC for CODESYS/CLICK.</p>
        </header>
        <div className={styles.softwareGrid}>
          {software.map(([name, note, url]) => (
            <a href={url} target="_blank" rel="noreferrer" key={name}>
              <span>Software / training</span>
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

      <section className={styles.section}>
        <header>
          <span className={styles.eyebrow}>Two required projects · one optional specialization</span>
          <h2>Build proof a controls team can inspect.</h2>
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

      <section id="pay" className={styles.section}>
        <header>
          <span className={styles.eyebrow}>Current compensation evidence</span>
          <h2>The employer and system matter more than the title.</h2>
          <p>Current examples show why “Controls Engineer” cannot be treated as one compensation band. These are planning references, not promised openings.</p>
        </header>
        <div className={styles.compTable}>
          <div className={styles.compHead}><span>Role context</span><span>Current examples</span><span>Interpretation</span></div>
          <div><strong>Software-forward / AI infrastructure</strong><span>$164k–$300k+</span><p>Highest ceiling and strongest SWE leverage; few openings and direct OT experience is commonly requested.</p></div>
          <div><strong>Owner-side data-center controls</strong><span>$111k–$290k</span><p>Wide range by company and level; bonus/equity can matter substantially.</p></div>
          <div><strong>High-value industrial controls</strong><span>$110k–$200k</span><p>Advanced manufacturing, energy, and regulated industries can pay well once controls experience is credible.</p></div>
          <div><strong>Traditional BAS / field branch</strong><span>$52k–$119k</span><p>Good physical-systems experience, but often a major pay cut relative to Amazon SWE.</p></div>
        </div>
        <p className={styles.salaryNote}>Examples combine different locations and experience levels. Base salary, total compensation, overtime, and per diem are not interchangeable.</p>

        <div className={styles.marketProof}>
          <a href="https://jobs.ashbyhq.com/fluidstack/7528afd0-2aae-4cab-8d47-9c3e5d004813" target="_blank" rel="noreferrer"><span>Software + OT</span><h3>Fluidstack · Software Engineer, SCADA</h3><p>$224k–$264k base plus equity; software built against SCADA, EPMS, OPC UA, historians, and alarms.</p><b>View evidence ↗</b></a>
          <a href="https://jobs.ashbyhq.com/Lambda/aedcfc9e-c2ad-4e69-8962-1ffe1f455ba1" target="_blank" rel="noreferrer"><span>AI data-center owner</span><h3>Lambda · Facility Telemetry & Controls</h3><p>$185k–$290k base by location; BMS, DCIM, protocols, telemetry pipelines, and commissioning.</p><b>View evidence ↗</b></a>
          <a href="https://www.google.com/about/careers/applications/jobs/results/119147112913871558-data-center-controls-engineer-global-data-centers" target="_blank" rel="noreferrer"><span>Established hyperscaler</span><h3>Google · Data Center Controls Engineer</h3><p>$144k–$209k base plus bonus and equity; BMS, EPMS, PLC, SCADA, field verification, and commissioning.</p><b>View evidence ↗</b></a>
          <a href="https://jobs.johnsoncontrols.com/job/WD30277108" target="_blank" rel="noreferrer"><span>Traditional BAS branch</span><h3>Johnson Controls · Controls Systems Technician</h3><p>$25–$34.50/hour; commissioning and HVAC controls experience with much lower compensation.</p><b>View evidence ↗</b></a>
        </div>
        <p className={styles.checked}>Market examples checked August 23, 2026. Postings can close; use them as skill and compensation evidence, not as promised openings.</p>
        <p className={styles.outlookNote}>Controls engineering has no clean BLS category. Adjacent U.S. occupations remain positive, while data-center power and cooling expansion supports controls demand. That supports the path; it does not guarantee a particular title or hiring rate.</p>
        <div className={styles.inlineLinks}>
          <a href="https://www.bls.gov/emp/tables/occupational-projections-and-characteristics.htm" target="_blank" rel="noreferrer">BLS projections ↗</a>
          <a href="https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers" target="_blank" rel="noreferrer">DOE data-center outlook ↗</a>
        </div>
      </section>

      <section className={styles.section}>
        <header>
          <span className={styles.eyebrow}>Later options—not three decisions you need to make now</span>
          <h2>One continuation and two optional branches.</h2>
        </header>
        <div className={styles.exitGrid}>
          <details open><summary><span>Continuation</span><strong>Data-center controls</strong></summary><p>Add BACnet/IP, HVAC and chilled-water sequences, electrical one-lines, UPS/generators/switchgear, BMS/EPMS, trend-based fault finding, and commissioning levels. This is the main destination—not a different career.</p></details>
          <details><summary><span>Optional branch</span><strong>SCADA / controls software</strong></summary><p>Use the strongest SWE skills for historian/event pipelines, OPC UA integrations, deployment tooling, testing, observability, and safe change workflows. The ceiling is high, but openings are fewer.</p></details>
          <details><summary><span>Optional branch</span><strong>OT / ICS cybersecurity</strong></summary><p>Add asset inventory, segmentation, remote-access controls, backups, passive monitoring, change management, and incident response after real OT exposure. It is adjacent defensive security, not the entry plan.</p><div className={styles.inlineLinks}><a href="https://csrc.nist.gov/pubs/sp/800/82/r3/final" target="_blank" rel="noreferrer">NIST ↗</a><a href="https://www.cisa.gov/ics-training-available-through-cisa" target="_blank" rel="noreferrer">CISA ↗</a></div></details>
        </div>
      </section>

      <section className={styles.twoColumn}>
        <article className={styles.dont}>
          <span className={styles.eyebrow}>Do not waste time on</span>
          <h3>Credentials and projects that leave the field gap untouched.</h3>
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
          <span className={styles.eyebrow}>Job quality filter</span>
          <h3>Questions that separate a strong bridge from a dead end.</h3>
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
          <span className={styles.eyebrow}>Ready-to-apply checklist</span>
          <h2>Apply when most of this is true.</h2>
          <p>Begin networking sooner. Start serious applications around 7 of 10 items; you need enough proof that a senior engineer can safely train you, not solo-plant readiness.</p>
        </header>
        <div>{readyItems.map((item) => <label key={item}><input type="checkbox" /><i aria-hidden="true" /><span>{item}</span></label>)}</div>
      </section>

      <footer className={styles.footer}>The core path: SWE → software-forward controls or a high-value integrator → PLC/SCADA + commissioning proof → owner-side data-center controls.</footer>
    </main>
  );
}

function ScoreMeter({ label, value }: { label: string; value: number }) {
  return <div className={styles.score}>
    <div><span>{label}</span><strong>{value}/5</strong></div>
    <i aria-hidden="true"><b style={{ width: `${value * 20}%` }} /></i>
  </div>;
}

function LearningModule({ module, number, complete, onToggle }: { module: Module; number: number; complete: boolean; onToggle: (id: string) => void }) {
  return <details className={`${styles.learningModule} ${complete ? styles.complete : ""}`}>
    <summary>
      <span className={styles.moduleNumber}>{String(number).padStart(2, "0")}</span>
      <div><small>{module.months}</small><strong>{module.title}</strong><p>{module.outcome}</p></div>
      <b>{complete ? "Complete" : `${module.resources.length} ${module.resources.length === 1 ? "resource" : "resources"}`}</b>
    </summary>
    <div className={styles.moduleBody}>
      <section><h4>Learn</h4><ul>{module.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></section>
      <section className={styles.proof}><h4>Proof before moving on</h4><p>{module.proof}</p></section>
      <section className={styles.moduleResources}>
        <h4>Use these resources</h4>
        <div>{module.resources.map((resource) => <a href={resource.url} target="_blank" rel="noreferrer" key={resource.title}><span>{resource.format} · {resource.access}</span><strong>{resource.title}</strong><em>{resource.provider}</em><p><b>Use:</b> {resource.selection}</p><small>{resource.purpose}</small></a>)}</div>
      </section>
      <label className={styles.completeToggle}>
        <input type="checkbox" checked={complete} onChange={() => onToggle(module.id)} />
        <i aria-hidden="true" />
        {complete ? "Module complete" : "Mark module complete"}
      </label>
    </div>
  </details>;
}
