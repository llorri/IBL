export type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  populations: string;
  outcomes: string[];
};

export const serviceAreas: Service[] = [
  {
    id: "calm",
    name: "CALM Crisis Management",
    tagline: "Hands-on coaching for high-risk behaviors",
    description:
      "CALM is our evidence-informed curriculum equipping parents, caregivers, and direct support staff to plan for and de-escalate severe behaviors while honoring dignity and autonomy.",
    populations: "Parents, caregivers, and clinicians supporting children through adults",
    outcomes: [
      "Scenario planning and rehearsal labs",
      "Team crisis scripts with visual safeguards",
      "Regulation toolkit matched to sensory profiles",
    ],
  },
  {
    id: "caregiver-support",
    name: "Parent & Caregiver Advocacy",
    tagline: "IEP/IPP literacy, due process prep, and respite navigation",
    description:
      "We translate education and regional center policies into plain language and coach families to lead collaborative meetings with data and confidence.",
    populations: "Parents and caregivers across school and adult service systems",
    outcomes: [
      "Individual coaching before IEP/IPP",
      "Document review and letter templates",
      "Trauma-informed advocacy skills",
    ],
  },
  {
    id: "behavior-skills",
    name: "Behavior & Adaptive Skills",
    tagline: "Applied behavior analysis with practical training",
    description:
      "Clinicians co-create behavior intervention plans, data systems, and coaching schedules tailored to each household or program.",
    populations: "Children, teens, and adults with complex support needs",
    outcomes: [
      "Functional behavior assessments",
      "Caregiver coaching and fidelity checks",
      "Adaptive routines paired with reinforcement maps",
    ],
  },
  {
    id: "community-inclusion",
    name: "Community Inclusion Training",
    tagline: "Travel training, safety planning, and peer mentoring",
    description:
      "We partner with regional centers and municipalities to help participants access their community confidently and safely.",
    populations: "Teens and adults pursuing greater independence",
    outcomes: [
      "Route mapping and mobility coaching",
      "Community partner training",
      "Risk mitigation and natural supports",
    ],
  },
  {
    id: "vocational",
    name: "Vocational & Pre-Vocational",
    tagline: "Employer partnerships with ABA-informed coaching",
    description:
      "Participants gain workplace fluency through discovery interviews, work trials, on-the-job supports, and leadership development for supervisors.",
    populations: "Transition-age youth and adults",
    outcomes: [
      "Customized employment plans",
      "Sensory-aware job site design",
      "Retention dashboards for employers",
    ],
  },
  {
    id: "independent-living",
    name: "Independent Living Skills",
    tagline: "Routines, technology, and coaching for daily life",
    description:
      "We build multi-modal teaching plans covering wellness, budgeting, transportation, and home management.",
    populations: "Adults & teens seeking supported living skills",
    outcomes: [
      "Smart home prompts and visual schedules",
      "Health and safety sequencing",
      "Care team dashboards to track progress",
    ],
  },
  {
    id: "social-emotional",
    name: "Social Skills & Emotional Regulation",
    tagline: "Co-regulation frameworks and peer groups",
    description:
      "Groups blend CBT, mindfulness, and play-based strategies to expand emotional literacy and communication.",
    populations: "School-age youth through adults",
    outcomes: [
      "Emotion mapping and coping ladders",
      "Facilitated peer practice labs",
      "Caregiver generalization guides",
    ],
  },
  {
    id: "adult-support",
    name: "Adult Behavior Support",
    tagline: "Clinical oversight for adult residential and day programs",
    description:
      "Our clinicians embed with provider teams to stabilize behavior, train staff, and coordinate with medical and mental health supports.",
    populations: "Adult service agencies and supported living providers",
    outcomes: [
      "Rapid response behavior consultation",
      "Staff competencies and fidelity mapping",
      "Interdisciplinary care coordination",
    ],
  },
];
