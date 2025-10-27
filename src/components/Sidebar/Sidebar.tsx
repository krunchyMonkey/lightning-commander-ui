import React from "react";
import NavItem from "./NavItem";

type Tab = "incidents" | "metrics";

export const Sidebar: React.FC<{
  activeTab: Tab;
  onChangeTab: (t: Tab) => void;
}> = ({ activeTab, onChangeTab }) => {
  return (
    <aside className="h-full border-r border-slate-800 p-3">
      <nav className="flex flex-col gap-1">
        <NavItem
          label="Incidents"
          active={activeTab === "incidents"}
          onClick={() => onChangeTab("incidents")}
        />
        <NavItem
          label="ITIL Metrics"
          active={activeTab === "metrics"}
          onClick={() => onChangeTab("metrics")}
        />
      </nav>
    </aside>
  );
};
