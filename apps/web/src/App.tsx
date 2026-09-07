import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/app";
import { Dashboard } from "./pages/Dashboard";
import { LandingPage } from "./pages/Landing";
import { ProjectWorkspace } from "./pages/ProjectWorkspace";
import "./index.css";

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return <main className="page-shell"><section className="empty-state"><span className="eyebrow">BUILD & CODE</span><h1>{title}</h1><p>{description}</p><a className="button button-primary" href="/dashboard">Open dashboard</a></section></main>;
}

export default function App(): JSX.Element {
  return <AppProvider><BrowserRouter><Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/projects" element={<Dashboard />} />
    <Route path="/projects/:id" element={<ProjectWorkspace />} />
    <Route path="/login" element={<PlaceholderPage title="Welcome back" description="Authentication is provider-ready. Continue with the local development workspace for now." />} />
    <Route path="/signup" element={<PlaceholderPage title="Create your workspace" description="Set up a secure Build & Code workspace and invite your team." />} />
    <Route path="/settings" element={<PlaceholderPage title="Workspace settings" description="Manage preferences, providers, execution limits, and security controls." />} />
    <Route path="/github" element={<PlaceholderPage title="Connect GitHub" description="Repository import and pull request actions are approval-gated and ready for a provider connection." />} />
    <Route path="/templates" element={<PlaceholderPage title="Starter templates" description="Choose a production-ready React, Vue, API, Python, Rust, or Vite workspace." />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></BrowserRouter></AppProvider>;
}
