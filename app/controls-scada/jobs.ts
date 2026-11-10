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

export const JOBS_CHECKED_ON = "November 10, 2026";

export const liveJobs: LiveJob[] = [
  {
    company: "Fluidstack",
    title: "Software Engineer, Facilities",
    priority: "Priority",
    location: "Austin · San Francisco · Seattle · on-site",
    pay: "$224k–$264k base + equity",
    experience: "Large-scale production software; controls or data-center experience is a bonus",
    education: "No degree requirement listed",
    reason: "The cleanest SWE transfer: production services for facility telemetry, equipment models, control APIs, and commissioning tests.",
    url: "https://jobs.ashbyhq.com/fluidstack/f5444f2e-60a0-48ed-a38b-6c500743a6ff",
  },
  {
    company: "ON.energy",
    title: "SCADA Engineer — EMS",
    priority: "Priority",
    location: "Houston · Miami · Reston",
    pay: "Not listed",
    experience: "3+ years hands-on Ignition configuration and scripting",
    education: "EE, controls, computer engineering, related field, or equivalent experience",
    reason: "Software-forward Ignition work spanning tags, UDTs, MQTT, deployment tools, historians, redundancy, and commissioning.",
    url: "https://job-boards.greenhouse.io/onenergy/jobs/4462644009",
  },
  {
    company: "OpenAI",
    title: "Controls Engineer, BMS & EPMS",
    priority: "Stretch",
    location: "San Francisco · 50% travel",
    pay: "$177k–$285k base + equity",
    experience: "Hands-on BMS or EPMS programming, integration, and commissioning",
    education: "ME, EE, controls, automation, related field, or equivalent experience",
    reason: "A top-pay data-center destination that welcomes early-career engineers with practical depth in either BMS or EPMS.",
    url: "https://jobs.ashbyhq.com/openai/a46ffc60-39c6-4b1e-bd0f-9c33a8b06703",
  },
  {
    company: "SpaceXAI",
    title: "Controls Engineer — Supercomputer Infrastructure",
    priority: "Stretch",
    location: "Memphis, TN · Southaven, MS · on-site",
    pay: "Not listed",
    experience: "1+ year industrial automation design and commissioning",
    education: "Bachelor’s in an engineering discipline",
    reason: "AI-campus controls across BMS, EPMS, SCADA, PLCs, cooling, and power, with useful C#, .NET, Python, and SQL overlap.",
    url: "https://job-boards.greenhouse.io/xai/jobs/5229550007",
  },
  {
    company: "Fluidstack",
    title: "Controls Engineer, Commissioning Automation",
    priority: "Stretch",
    location: "Austin · San Francisco · Seattle · on-site",
    pay: "$164k–$206k base + equity",
    experience: "Hands-on building or data-center controls commissioning + BMS/PLC programming",
    education: "No degree requirement listed",
    reason: "A high-paying field-controls role that builds automated functional tests and analyzes failures on live data-center sites.",
    url: "https://jobs.ashbyhq.com/fluidstack/2c578d0c-a41b-4877-9f42-066db15c1049",
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
    title: "Automation & Controls Engineer (Facilities)",
    priority: "Stretch",
    location: "Hawthorne, CA",
    pay: "$100k–$160k base by level + incentives",
    experience: "1+ year controls design and commissioning",
    education: "Bachelor’s in an engineering discipline",
    reason: "Critical-infrastructure controls with PLC, SCADA, BAS/HVAC, and useful overlap in C#/.NET, Python, and SQL.",
    url: "https://job-boards.greenhouse.io/spacex/jobs/8911675002",
  },
  {
    company: "E Tech Group",
    title: "Automation Engineer",
    priority: "Bridge",
    location: "Longview, TX",
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
