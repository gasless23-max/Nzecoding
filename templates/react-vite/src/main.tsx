import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() { return <main><span>BUILD & CODE TEMPLATE</span><h1>Start building.</h1><p>A clean React + Vite workspace ready for your idea.</p></main>; }
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
