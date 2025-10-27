import React, { useState } from "react";
import Sidebar  from "./components/Sidebar";
import Pane from "./components/Pane";

type Tab = "incidents" | "metrics";

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>("incidents");

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100">
      {/* Top bar placeholder (optional) */}
      <header className="h-14 border-b border-slate-800 flex items-center px-4">
        <span className="text-lg font-semibold flex items-center gap-2">
          <span role="img" aria-label="bolt">⚡</span> Lightning Commander
        </span>
        <div className="flex-1" />
        {/* add search/new buttons later (Story 4) */}
      </header>

      {/* Main layout */}
      <div className="h-[calc(100vh-56px)] grid grid-cols-[240px_1fr]">
        <Sidebar activeTab={tab} onChangeTab={setTab} />

        <main className="h-full overflow-y-auto p-4">
          {tab === "incidents" ? (
            <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] gap-4">
              <Pane title="Incident List">
                {/* Story 7 will render cards here */}
                <div className="space-y-3">
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </div>
              </Pane>

              <Pane title="Details">
                <div className="h-full flex items-center justify-center text-slate-400">
                  Select an incident…
                </div>
              </Pane>
            </div>
          ) : (
            <Pane title="ITIL Metrics">
              <div className="text-slate-400">Metrics dashboard placeholder…</div>
            </Pane>
          )}
        </main>
      </div>
    </div>
  );
};

function SkeletonRow() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <div className="h-3 w-2/3 rounded bg-slate-800 mb-3" />
      <div className="h-3 w-1/3 rounded bg-slate-800" />
    </div>
  );
}

export default App;
