import React from "react";

const IncidentSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <div className="h-3 w-2/3 rounded bg-slate-800 mb-3" />
      <div className="h-3 w-1/3 rounded bg-slate-800" />
    </div>
  );
};

export { IncidentSkeleton };
export default IncidentSkeleton;