import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useRealtime } from "../hooks/useRealtime";
import { useProjectData } from "../hooks/useProjectData";

export interface AppShellContext {
  projectId: string;
}

export const AppShell = () => {
  const projectId = "default";

  useRealtime();
  useProjectData(projectId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <main className="px-8 py-6">
            <Outlet context={{ projectId } as AppShellContext} />
          </main>
        </div>
      </div>
    </div>
  );
};
