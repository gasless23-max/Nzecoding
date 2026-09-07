import { initializePool, closePool, query } from "../src/client";
import { SCHEMA } from "../src/schema";

async function migrate(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable not set");
  }

  try {
    initializePool(connectionString);
    console.log("Running migrations...");

    // Execute all schema definitions
    for (const [table, schema] of Object.entries(SCHEMA)) {
      console.log(`Creating table: ${table}`);
      await query(schema);
    }

    console.log("✓ Migrations completed successfully");
  } catch (error) {
    console.error("✗ Migration failed:", error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

migrate();
