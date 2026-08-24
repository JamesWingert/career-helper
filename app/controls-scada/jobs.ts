export type JobPriority = "Priority" | "Stretch" | "Bridge" | "Fallback";

export type LiveJob = {
  company: string;
  title: string;
  priority: JobPriority;
  location: string;
  pay: string;
  experience: string;
  education: string;
  reason: string;
  url: string;
};

export const JOBS_CHECKED_ON = "August 24, 2026";

export const liveJobs: LiveJob[] = [
  {
    company: "Fluidstack",
    title: "Software Engineer, SCADA",
    priority: "Priority",
    location: "Austin · New York · San Francisco · Seattle · on-site",
    pay: "$224k–$264k base + equity",
    experience: "Direct SCADA or industrial-controls experience",
    education: "No degree requirement listed",
    reason: "The closest match to tech compensation and SWE work: SCADA/EPMS software, OPC UA, historians, and alarms.",
    url: "https://jobs.ashbyhq.com/fluidstack/7528afd0-2aae-4cab-8d47-9c3e5d004813",
  },
  {
    company: "ON.energy",
    title: "SCADA Engineer — Energy Management Systems",
    priority: "Priority",
    location: "Houston, TX",
    pay: "Not listed",
    experience: "2–5 years hands-on Ignition",
    education: "EE, controls, computer engineering, related field, or equivalent experience",
    reason: "Software-heavy Ignition work: MQTT, deployment tools, distributed SCADA, historian performance, and commissioning.",
    url: "https://job-boards.greenhouse.io/onenergy/jobs/4357694009",
  },
  {
    company: "Oklo",
    title: "Controls Engineer — Fuel Fabrication",
    priority: "Stretch",
    location: "Idaho Falls, ID · remote",
    pay: "$100k–$150k base + equity/bonus",
    experience: "3+ years I&C including PLC, SCADA, SQL, and software V&V",
    education: "Computer, electrical, mechatronics, industrial/systems, or related engineering bachelor’s",
    reason: "A software-forward I&C role combining PLC/SCADA with SQL, Python, data systems, automated QA, and commissioning.",
    url: "https://job-boards.greenhouse.io/oklo/jobs/6114732004",
  },
  {
    company: "CrossnoKaye",
    title: "Controls Engineer",
    priority: "Stretch",
    location: "Remote US · up to 50% travel",
    pay: "$155k–$175k estimated total cash + equity",
    experience: "3 years industrial automation + deep PLC knowledge",
    education: "Engineering or related bachelor’s",
    reason: "Cloud-based controls, product-team QA, state machines, field deployment, and unusually strong controls compensation.",
    url: "https://job-boards.greenhouse.io/crossnokaye/jobs/6099050004",
  },
  {
    company: "AWS",
    title: "Data Center Controls Engineer",
    priority: "Stretch",
    location: "Frederick, MD",
    pay: "$111.3k–$186.1k base + sign-on/RSUs",
    experience: "5+ years controls + project/vendor management",
    education: "EE, ME, or related; 10 years controls in lieu of degree",
    reason: "A strong internal destination for BMS/EPMS ownership, but Amazon tenure does not remove the controls-experience bar.",
    url: "https://www.amazon.jobs/en/jobs/10440388/data-center-controls-engineer-data-center-capacity-delivery-controls",
  },
  {
    company: "SpaceX",
    title: "Automation & Controls Engineer — Facilities",
    priority: "Stretch",
    location: "Hawthorne, CA",
    pay: "$100k–$135k base + incentives",
    experience: "1+ year controls design and commissioning",
    education: "Bachelor’s in an engineering discipline",
    reason: "Critical-infrastructure controls with PLC, SCADA, BAS/HVAC, and useful overlap in C#/.NET, Python, and SQL.",
    url: "https://job-boards.greenhouse.io/spacex/jobs/8546353002",
  },
  {
    company: "Giga Energy",
    title: "Controls Engineer",
    priority: "Stretch",
    location: "Houston · San Francisco · Long Beach · on-site",
    pay: "$90k–$122k listed OTE + equity",
    experience: "3+ years PLC/HMI programming and commissioning",
    education: "EE, controls, related field, or equivalent hands-on experience",
    reason: "Direct AI data-center work across PLC/HMI, BMS, control panels, VFDs, industrial networks, FAT, and SAT.",
    url: "https://job-boards.greenhouse.io/gigaenergy/jobs/5231652008",
  },
  {
    company: "E Tech Group",
    title: "Automation Engineer",
    priority: "Bridge",
    location: "Location not listed",
    pay: "Not listed",
    experience: "2+ years or equivalent education/experience",
    education: "Engineering or related engineering bachelor’s",
    reason: "A classic systems-integrator role covering PLC, SCADA, historians, electrical drawings, startup, and commissioning.",
    url: "https://etechgroup.com/blog/jobs/etechgroup/automation-engineer/",
  },
  {
    company: "Marketech International USA",
    title: "SCADA Engineer — Semiconductor Industry",
    priority: "Bridge",
    location: "Phoenix, AZ",
    pay: "Not listed",
    experience: "2+ years SCADA, PLC, or industrial automation",
    education: "Related bachelor’s preferred, not required",
    reason: "Semiconductor-facility SCADA with PLC logic, instrumentation, alarms, historians, FAT/SAT, and commissioning.",
    url: "https://job-boards.greenhouse.io/marketechinternationalcorporationusa/jobs/4329959009",
  },
  {
    company: "Johnson Controls",
    title: "Controls Systems Technician",
    priority: "Fallback",
    location: "West Valley City, UT",
    pay: "$25–$34.50/hour",
    experience: "1–2 years HVAC, electronic, or mechanical systems",
    education: "No degree requirement listed",
    reason: "A BAS commissioning route into BMS experience, but it is more field-heavy and likely a large pay cut from SWE.",
    url: "https://jobs.johnsoncontrols.com/job/WD30277108",
  },
];
