import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { IncidentsPage, MetricsPage } from "./pages";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/incidents" element={<IncidentsPage />} />
        <Route path="/metrics" element={<MetricsPage />} />
        <Route path="/" element={<Navigate to="/incidents" replace />} />
        <Route path="*" element={<Navigate to="/incidents" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
