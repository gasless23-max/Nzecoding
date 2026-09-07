import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

const app: Express = express();
const PORT = process.env.API_PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(",") || ["http://localhost:5173"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// API Routes
app.get("/api/projects", (req: Request, res: Response) => {
  res.json({ projects: [] });
});

app.post("/api/projects", (req: Request, res: Response) => {
  res.status(201).json({ id: "project-1", name: req.body.name });
});

app.get("/api/agent/runs", (req: Request, res: Response) => {
  res.json({ runs: [] });
});

app.post("/api/agent/runs", (req: Request, res: Response) => {
  res.status(201).json({ id: "run-1", status: "queued" });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ API server running on http://localhost:${PORT}`);
});

export default app;
