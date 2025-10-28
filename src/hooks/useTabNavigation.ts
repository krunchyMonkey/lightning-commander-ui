import { useNavigate } from "react-router-dom";

type Tab = "incidents" | "metrics";

export const useTabNavigation = () => {
  const navigate = useNavigate();

  const navigateToTab = (tab: Tab) => {
    if (tab === 'incidents') {
      navigate('/incidents');
    } else if (tab === 'metrics') {
      navigate('/metrics');
    }
  };

  const navigateToIncidents = () => navigateToTab('incidents');
  const navigateToMetrics = () => navigateToTab('metrics');

  return {
    navigateToTab,
    navigateToIncidents,
    navigateToMetrics,
  };
};