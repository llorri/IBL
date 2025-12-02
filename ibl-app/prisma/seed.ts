import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.caseNote.deleteMany();
  await prisma.scheduleItem.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.clientIntake.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.staffUser.deleteMany();

  const passwordHash = await bcrypt.hash("Support!2025", 10);

  const leadBCBA = await prisma.staffUser.create({
    data: {
      name: "Jordan Winters",
      email: "jordan.winters@ibl.org",
      role: "Clinical Director",
      passwordHash,
    },
  });

  const blogPosts = [
    {
      title: "Creating Calm Homes Through Proactive Supports",
      slug: "creating-calm-homes",
      excerpt:
        "Practical routines and coaching moves from the CALM curriculum that help families prevent crises before they begin.",
      content:
        `The CALM curriculum was developed to give caregivers a concrete structure for preparing, preventing, and responding to dangerous behaviors.\n\nIn this article we outline a simple three-part home plan that mirrors our coaching blocks: safety mapping, proactive skill practice, and regulation rituals. Each block includes downloadable prompts in the Parent/Caregiver Portal.`,
      author: "Institute for Behavior and Learning",
      tags: "calm,caregiver,home-support",
      featured: true,
    },
    {
      title: "Bridging School, Home, and Community Teams",
      slug: "bridging-teams",
      excerpt:
        "How IBL coaching teams align IEP/IPP goals with adaptive skill building in the community.",
      content:
        `Families often tell us they are translating goals between programs on their own. Our facilitators bring everyone to the same page by co-writing functional goals, sharing video models, and co-leading data reviews.`,
      author: "Institute for Behavior and Learning",
      tags: "advocacy,teams,iep",
      featured: false,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }

  const resources = [
    {
      title: "CALM Safety Planning Workbook",
      description:
        "Step-by-step workbook that guides teams through the CALM crisis-prevention flow.",
      category: "CALM",
      audience: "Parents & Caregivers",
      filePath: "/resources/calm-safety-planning.pdf",
      type: "Manual",
    },
    {
      title: "Daily Regulation Menu",
      description:
        "Printable menu of co-regulation activities for school, home, and community routines.",
      category: "Regulation",
      audience: "Parents & Direct Support Staff",
      filePath: "/resources/regulation-menu.pdf",
      type: "Worksheet",
    },
  ];

  await prisma.resource.createMany({ data: resources });

  await prisma.scheduleItem.createMany({
    data: [
      {
        staffId: leadBCBA.id,
        clientName: "A.G.",
        serviceArea: "CALM Coaching",
        sessionDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        location: "Family Home",
        notes: "Session 2: regulation routines and caregiver debrief.",
      },
      {
        staffId: leadBCBA.id,
        clientName: "K.L.",
        serviceArea: "Vocational Readiness",
        sessionDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        location: "Community Worksite",
        notes: "Task analysis run-through + supervisor coaching.",
      },
    ],
  });

  await prisma.caseNote.createMany({
    data: [
      {
        staffId: leadBCBA.id,
        clientName: "A.G.",
        focusArea: "CALM drills",
        summary: "Practiced weighted blanket routine and proximate coaching cues.",
        followUp: "Send updated visual supports via Parent Portal.",
      },
      {
        staffId: leadBCBA.id,
        clientName: "S.M.",
        focusArea: "Employment soft skills",
        summary: "Ran community inclusion script with role play feedback.",
        followUp: "Schedule joint visit with DVR counselor.",
      },
    ],
  });

  console.log("✅ Seed data created");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
