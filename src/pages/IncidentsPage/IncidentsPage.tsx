import React from "react";
import Pane from "../../components/Pane";
import IncidentSkeleton from "../../components/IncidentSkeleton";

const IncidentsPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] gap-4">
      <Pane title="Incident List">
        {/* Story 7 will render cards here */}
        <div className="space-y-3">
          <IncidentSkeleton />
          <IncidentSkeleton />
          <IncidentSkeleton />
          <IncidentSkeleton />
        </div>
      </Pane>

      <Pane title="Details">
        <div className="h-full flex items-center justify-center text-slate-400">
          Select an incident…
        </div>
      </Pane>
    </div>
  );
};

export default IncidentsPage;