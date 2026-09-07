import { query } from "./client";
import { User, Project, AgentTask, Message } from "@build-and-code/shared";

// User queries
export async function getUserById(id: string): Promise<User | null> {
  const result = await query<User>(
    "SELECT id, email, name, avatar, created_at, updated_at FROM users WHERE id = $1",
    [id]
  );
  return result[0] || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await query<User>(
    "SELECT id, email, name, avatar, created_at, updated_at FROM users WHERE email = $1",
    [email]
  );
  return result[0] || null;
}

export async function createUser(
  email: string,
  name: string,
  passwordHash?: string
): Promise<User> {
  const result = await query<User>(
    `INSERT INTO users (email, name, password_hash) 
     VALUES ($1, $2, $3) 
     RETURNING id, email, name, avatar, created_at, updated_at`,
    [email, name, passwordHash || null]
  );
  return result[0];
}

// Project queries
export async function getProjectById(id: string): Promise<Project | null> {
  const result = await query<Project>(
    `SELECT id, name, description, owner_id, framework, language, status, repository, branch, created_at, updated_at 
     FROM projects WHERE id = $1`,
    [id]
  );
  return result[0] || null;
}

export async function getUserProjects(userId: string): Promise<Project[]> {
  return query<Project>(
    `SELECT id, name, description, owner_id, framework, language, status, repository, branch, created_at, updated_at 
     FROM projects WHERE owner_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
}

export async function createProject(
  name: string,
  description: string,
  ownerId: string,
  framework?: string,
  language?: string
): Promise<Project> {
  const result = await query<Project>(
    `INSERT INTO projects (name, description, owner_id, framework, language) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING id, name, description, owner_id, framework, language, status, repository, branch, created_at, updated_at`,
    [name, description, ownerId, framework || null, language || null]
  );
  return result[0];
}

// Agent run queries
export async function createAgentRun(
  projectId: string,
  userId: string,
  description: string
): Promise<AgentTask> {
  const result = await query<AgentTask>(
    `INSERT INTO agent_runs (project_id, user_id, status, description) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, project_id as projectId, user_id as userId, status, description, created_at as createdAt, updated_at as updatedAt`,
    [projectId, userId, "queued", description]
  );
  return result[0];
}

export async function getAgentRunById(id: string): Promise<AgentTask | null> {
  const result = await query<AgentTask>(
    `SELECT id, project_id as projectId, user_id as userId, status, description, plan, created_at as createdAt, updated_at as updatedAt, completed_at as completedAt 
     FROM agent_runs WHERE id = $1`,
    [id]
  );
  return result[0] || null;
}

// Message queries
export async function createMessage(
  runId: string,
  role: "user" | "assistant",
  content: string
): Promise<Message> {
  const result = await query<Message>(
    `INSERT INTO messages (run_id, role, content) 
     VALUES ($1, $2, $3) 
     RETURNING id, run_id as taskId, role, content, created_at as createdAt`,
    [runId, role, content]
  );
  return result[0];
}

export async function getRunMessages(runId: string): Promise<Message[]> {
  return query<Message>(
    `SELECT id, run_id as taskId, role, content, created_at as createdAt 
     FROM messages WHERE run_id = $1 ORDER BY created_at ASC`,
    [runId]
  );
}
