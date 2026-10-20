import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import "dotenv/config";

const openai = new OpenAI();

const random_dungeon_list = z.object({
  title: z.string(),
  description: z.string(),
  rank: z.string(),
  xp: z.number(),
  targetArchitecture: z.array(z.string()),
  status: z.string(),
  masteryQuadrant: z.string(),
});

const DungeonResponseSchema = z.object({
  dungeons: z.array(random_dungeon_list),
});

const system_prompt = {
  role: "system",
  content: "Generate 1 dungeon quest for rank S.",
};

async function runTest() {
  try {
    const response = await openai.responses.parse({
      model: "gpt-4o-mini",
      input: [system_prompt],
      text: {
        format: zodTextFormat(DungeonResponseSchema, "dungeon_generation"),
      },
    });

    console.log("Parsed:", response.output_parsed.dungeons);
  } catch (e) {
    console.error("ERROR:", e);
  }
}

runTest();

const test = {
  S: [
    {
      title: "Distributed Caching System",
      description:
        "Design a distributed caching system that ensures low latency and high availability, catering to a large user base. The system should handle cache invalidation efficiently and discuss potential challenges such as cache consistency and data staleness.",
      rank: "S",
      xp: 150,
      targetArchitecture: [
        "Microservices",
        "Distributed Systems",
        "Client-Server",
      ],
      status: "Active",
      masteryQuadrant: "Latency",
    },
  ],
  A: [
    {
      title: "Load Balancer for E-Commerce Platform",
      description:
        "Create a load balancer for an e-commerce platform that can automatically scale based on incoming traffic. Discuss different load balancing strategies and how to maintain high availability and ultimately ensure low latency during peak times.",
      rank: "A",
      xp: 120,
      targetArchitecture: [
        "Microservices",
        "Cloud Infrastructure",
        "API Gateway",
      ],
      status: "Active",
      masteryQuadrant: "Scalability",
    },
    {
      title: "Event-Driven Architecture for Real-Time Analytics",
      description:
        "Design an event-driven architecture that processes large volumes of data in real-time for analytics. Explain how you would handle event consistency and message ordering while ensuring system availability.",
      rank: "A",
      xp: 120,
      targetArchitecture: ["Event Sourcing", "Streaming Data", "Microservices"],
      status: "Active",
      masteryQuadrant: "Consistency",
    },
  ],
  B: [
    {
      title: "Basic URL Shortener",
      description:
        "Design a URL shortener service that takes a long URL and returns a shortened version. Discuss how you would store the mappings and handle collisions, while designing for availability and latency.",
      rank: "B",
      xp: 75,
      targetArchitecture: ["Client-Server", "Database"],
      status: "Active",
      masteryQuadrant: "Availability",
    },
  ],
  C: [
    {
      title: "Simple To-Do List API",
      description:
        "Create a simple RESTful API for a to-do list application. It should allow users to perform CRUD operations on their tasks while ensuring basic data persistence and handling errors gracefully.",
      rank: "C",
      xp: 50,
      targetArchitecture: ["RESTful API", "Monolithic"],
      status: "Active",
      masteryQuadrant: "Consistency",
    },
  ],
  D: [
    {
      title: "User Authentication System",
      description:
        "Create a basic user authentication system that supports signup, login, and password resets. Discuss how to securely store passwords and manage sessions, focusing on latency and basic availability.",
      rank: "D",
      xp: 40,
      targetArchitecture: ["Monolithic", "API"],
      status: "Active",
      masteryQuadrant: "Availability",
    },
  ],
  E: [],
};
