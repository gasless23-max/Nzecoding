import React from "react";

export function LandingPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-brand-600">Build & Code</div>
          <div className="flex gap-4">
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Sign In
            </button>
            <button className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Describe it. Build it. Ship it.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Build, code, test, debug, preview, and ship software with an autonomous AI engineering
            workspace.
          </p>
          <button className="bg-brand-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-700 transition-colors">
            Start Building with AI
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI Project Generation",
                description: "Create projects from natural language descriptions",
              },
              {
                title: "Autonomous Coding",
                description: "AI writes, modifies, and optimizes code",
              },
              {
                title: "Integrated Terminal",
                description: "Run commands and see results in real-time",
              },
              {
                title: "Live Preview",
                description: "See changes instantly across devices",
              },
              {
                title: "Git & GitHub",
                description: "Built-in version control and repository management",
              },
              {
                title: "Error Repair",
                description: "AI detects and automatically fixes issues",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 Build & Code. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
