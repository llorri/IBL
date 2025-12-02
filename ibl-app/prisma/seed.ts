import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.caseNote.deleteMany();
  await prisma.staffSchedule.deleteMany();
  await prisma.intakeSubmission.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.staffUser.deleteMany();

  const staffPassword = await hash("StrongPass!123", 10);

  const staffUser = await prisma.staffUser.create({
    data: {
      name: "Clinical Director",
      email: "director@ibl.org",
      passwordHash: staffPassword,
      role: "admin",
    },
  });

  await prisma.blogPost.createMany({
    data: [
      {
        title: "Expanding CALM Supports Across California",
        slug: "expanding-calm-supports",
        excerpt:
          "How our CALM crisis management curriculum is preparing families and direct support professionals for high-risk behaviors.",
        content:
          "The Institute for Behavior and Learning is rolling out new CALM facilitators in Northern and Southern California. Families receive immersive coaching, scenario planning, and ongoing telehealth check-ins. The initiative is supported by regional centers and focuses on data-driven de-escalation plans for every household.",
        coverImage: "/images/blog/calm-expansion.jpg",
        featured: true,
        publishedAt: new Date("2024-09-15"),
      },
      {
        title: "Partnering With Employers for Inclusive Workplaces",
        slug: "inclusive-workplaces",
        excerpt:
          "IBL's vocational team is co-designing onboarding pathways and sensory-aware job sites with local employers.",
        content:
          "Our vocational/pre-vocational services embed applied behavior analysis with workplace coaching. We partner with manufacturers, libraries, and tech firms to create visually structured workflows, natural cues, and peer mentoring. Individuals in the program have maintained employment for an average of 18 months.",
        coverImage: "/images/blog/inclusive-workplaces.jpg",
        featured: false,
        publishedAt: new Date("2024-10-02"),
      },
      {
        title: "Parent Resilience Workshops Launch in 2025",
        slug: "parent-resilience-workshops",
        excerpt:
          "New hybrid series blending IEP/IPP advocacy, emotional regulation, and respite planning for caregivers.",
        content:
          "Beginning January 2025, IBL will host quarterly Parent Resilience cohorts. Each cohort receives access to the caregiver portal, tailored worksheets, and 1:1 coaching sessions. Topics include trauma-informed communication, documentation for due process, and restorative break strategies.",
        coverImage: "/images/blog/parent-workshops.jpg",
        featured: false,
        publishedAt: new Date("2024-11-11"),
      },
    ],
  });

  await prisma.staffSchedule.create({
    data: {
      staffId: staffUser.id,
      clientName: "J. Alvarez",
      serviceFocus: "Community Inclusion",
      meetingDate: new Date("2024-12-05T15:00:00"),
      location: "San Diego Regional Center",
      notes: "Review travel training plan and prompt fading.",
    },
  });

  await prisma.caseNote.create({
    data: {
      staffId: staffUser.id,
      clientName: "K. Lee",
      summary: "Increased initiation during CALM drills; introduce visual coping ladder.",
      followUp: "Share caregiver ladder worksheet via portal.",
    },
  });

  console.log("Seed data created successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
