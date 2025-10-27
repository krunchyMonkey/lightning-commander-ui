import React from "react";

interface NavItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={[
      "text-left rounded-lg px-3 py-2 transition",
      active
        ? "bg-slate-800 text-white"
        : "text-slate-300 hover:bg-slate-900 hover:text-white",
    ].join(" ")}
    aria-pressed={!!active}
  >
    {label}
  </button>
);