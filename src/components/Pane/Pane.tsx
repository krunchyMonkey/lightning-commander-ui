import React from "react";

interface PaneProps {
  title: string;
  children?: React.ReactNode;
}

export const Pane: React.FC<PaneProps> = ({
  title,
  children,
}) => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 min-h-[320px]">
      <header className="mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
      </header>
      <div>{children}</div>
    </section>
  );
};
