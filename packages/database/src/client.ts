import { Pool, PoolClient } from "pg";

let pool: Pool | null = null;

export function initializePool(connectionString: string): Pool {
  if (pool) {
    return pool;
  }

  pool = new Pool({
    connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  pool.on("error", (err) => {
    console.error("Unexpected pool error", err);
  });

  return pool;
}

export async function getClient(): Promise<PoolClient> {
  if (!pool) {
    throw new Error("Database pool not initialized. Call initializePool first.");
  }
  return pool.connect();
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export async function query<T = unknown>(
  sql: string,
  values?: (string | number | boolean | null)[]
): Promise<T[]> {
  if (!pool) {
    throw new Error("Database pool not initialized. Call initializePool first.");
  }
  const result = await pool.query(sql, values);
  return result.rows as T[];
}
