import { initializePool, closePool } from "../src/client";
import { createUser, createProject } from "../src/queries";

async function seed(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable not set");
  }

  try {
    initializePool(connectionString);
    console.log("Seeding database...");

    // Create demo user
    const user = await createUser(
      "demo@buildandcode.dev",
      "Demo User",
      "$2b$10$demo" // Placeholder
    );
    console.log(`✓ Created user: ${user.id}`);

    // Create demo project
    const project = await createProject(
      "Creator Analytics Platform",
      "A platform for creators to track analytics",
      user.id,
      "react",
      "typescript"
    );
    console.log(`✓ Created project: ${project.id}`);

    console.log("✓ Seeding completed successfully");
  } catch (error) {
    console.error("✗ Seeding failed:", error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

seed();
