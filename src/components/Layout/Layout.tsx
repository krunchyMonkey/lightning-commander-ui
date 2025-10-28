import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

type Tab = "incidents" | "metrics";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active tab based on current route
  const getActiveTabFromPath = (pathname: string): Tab => {
    if (pathname.startsWith('/metrics')) return 'metrics';
    return 'incidents'; // default to incidents
  };

  const [activeTab, setActiveTab] = useState<Tab>(() => 
    getActiveTabFromPath(location.pathname)
  );

  // Update active tab when route changes
  useEffect(() => {
    const newTab = getActiveTabFromPath(location.pathname);
    setActiveTab(newTab);
  }, [location.pathname]);

  // Handle tab change and navigate to appropriate route
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'incidents') {
      navigate('/incidents');
    } else if (tab === 'metrics') {
      navigate('/metrics');
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100">
      {/* Top bar */}
      <header className="h-14 border-b border-slate-800 flex items-center px-4">
        <span className="text-lg font-semibold flex items-center gap-2">
          <span role="img" aria-label="bolt">⚡</span> Lightning Commander
        </span>
        <div className="flex-1" />
        {/* add search/new buttons later (Story 4) */}
      </header>

      {/* Main layout */}
      <div className="h-[calc(100vh-56px)] grid grid-cols-[240px_1fr]">
        <Sidebar activeTab={activeTab} onChangeTab={handleTabChange} />

        <main className="h-full overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;