import React from "react";
import { useApp } from "../context/app";

export function Dashboard(): JSX.Element {
  const { user } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome, {user?.name || "Developer"}
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Your autonomous AI software engineering workspace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Recent Projects Card */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-400">No projects yet</p>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Activity
            </h2>
            <p className="text-gray-600 dark:text-gray-400">No activity yet</p>
          </div>

          {/* Templates Card */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Templates
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Browse starter templates</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Start Building</h2>
          <p className="mb-6 text-brand-100">
            Tell the AI what you want to build, and it will handle the rest.
          </p>
          <button className="bg-white text-brand-700 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors">
            Create New Project
          </button>
        </div>
      </div>
    </div>
  );
}
