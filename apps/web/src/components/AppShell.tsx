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
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-body)' }}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Topbar />
          <main className="px-6 py-6 lg:px-8">
            <Outlet context={{ projectId } as AppShellContext} />
          </main>
        </div>
      </div>
    </div>
  );
};
