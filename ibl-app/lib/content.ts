export type Service = {
  title: string;
  summary: string;
  audience: string;
  outcomes: string[];
};

export const serviceAreas: Service[] = [
  {
    title: "CALM Crisis Management",
    summary:
      "Coaching and curriculum that equips caregivers with prevention, regulation, and crisis recovery routines.",
    audience: "Parents & Direct Support Teams",
    outcomes: [
      "Safety mapping and risk mitigation",
      "Up to 12 in-home coaching visits",
      "Crisis post-review templates",
    ],
  },
  {
    title: "Parent & Caregiver Advocacy",
    summary:
      "IEP/IPP preparation, facilitation, and ongoing advocacy that centers the family's priorities.",
    audience: "Parents, Care Coordinators",
    outcomes: ["Goal translation between systems", "Data visualization dashboards", "Team training modules"],
  },
  {
    title: "Behavior & Adaptive Skills",
    summary:
      "Evidence-based instruction targeting daily living, communication, and adaptive routines.",
    audience: "Individuals ages 3+",
    outcomes: ["Functional behavior assessments", "Skill acquisition plans", "Caregiver generalization"],
  },
  {
    title: "Community Inclusion",
    summary:
      "Supported community based instruction that teaches navigation, safety, and natural support building.",
    audience: "Teens & Adults",
    outcomes: ["Route planning", "Social scripts & role play", "Data sharing with regional centers"],
  },
  {
    title: "Vocational & Pre-Vocational",
    summary:
      "Career discovery, work-based learning, and workplace coaching for emerging and adult job seekers.",
    audience: "Young adults & transition programs",
    outcomes: ["Situational assessments", "Employer coaching", "Benefit planning partners"],
  },
  {
    title: "Independent Living Skills",
    summary:
      "Daily living instruction for adults and teens seeking greater autonomy at home and in the community.",
    audience: "Teens & Adults",
    outcomes: ["Custom visual schedules", "Medication & finance routines", "Supported decision making"],
  },
  {
    title: "Social Skills & Emotional Regulation",
    summary:
      "Group and individual coaching for emotional literacy, peer relationships, and regulation strategies.",
    audience: "Children, Adolescents, Adults",
    outcomes: ["Co-regulation menus", "Peer mediated practice", "Mind-body alignment exercises"],
  },
  {
    title: "Adult Behavior Support",
    summary:
      "Wraparound behavioral consultation for adults with complex support needs in home, day, or employment settings.",
    audience: "Adults & Provider Agencies",
    outcomes: ["Behavior stabilization plans", "Provider onboarding", "Risk review facilitation"],
  },
];

export const calmPillars = [
  {
    name: "Prepare",
    detail: "Environment and relationship-based safeguards plus data-informed protocols.",
  },
  {
    name: "Practice",
    detail: "Coaching sessions with live modeling, skill rehearsal, and feedback loops.",
  },
  {
    name: "Partner",
    detail: "Unified teams with shared documentation, dashboards, and transition plans.",
  },
];

export const values = [
  { title: "Clinically Grounded", copy: "Board Certified Behavior Analysts, educators, and social workers collaborate on every plan." },
  { title: "Family Led", copy: "We design supports that match cultural practices, preferred communication styles, and lived priorities." },
  { title: "Data + Story", copy: "Narratives and dashboards live together so teams understand the humans behind the metrics." },
];

export const impactStats = [
  { label: "Families coached annually", value: "350+" },
  { label: "Counties served", value: "9" },
  { label: "Average response time", value: "< 24 hrs" },
];
