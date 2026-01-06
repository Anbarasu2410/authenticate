// ExecutiveDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchDashboardSummary, fetchAISummary } from '../api/dashboardApi';
import KPIStatCard from '../components/KPIStatCard';
import AISummaryPanel from '../components/AISummaryPanel';
import ProjectStatusTable from '../components/ProjectStatusTable';
import AttendanceSnapshot from '../components/AttendanceSnapshot';

const ExecutiveDashboard = () => {
  const companyId = 1;
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [aiSummary, setAiSummary] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const { data } = await fetchDashboardSummary(companyId, today);
      setSummary(data);

      const aiRes = await fetchAISummary({
        date: today,
        projects: data.projects,
        attendance: data.kpis.attendance,
        fleetIssues: data.kpis.fleetIssues,
      });

      setAiSummary(aiRes.data.summary);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600 font-sans">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen font-sans">
      {/* HEADER CARD */}
      <div className="border-2 border-gray-400 bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold uppercase">{`EXECUTIVE DASHBOARD`}</h2>
        {/* <div className="text-sm text-gray-700 mt-1">
          Company: Century Global Resources
        </div> */}
        <div className="text-sm text-gray-700">
          Date: {today}
        </div>
      </div>

      {/* KPI CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIStatCard title="Active Projects" value={summary.kpis.activeProjects} />
        <KPIStatCard
          title="Attendance Today"
          value={`${summary.kpis.attendance.present} / ${
            summary.kpis.attendance.present + summary.kpis.attendance.absent
          }`}
        />
        <KPIStatCard title="Delayed Projects" value={summary.kpis.delayedProjects} />
        <KPIStatCard title="Fleet Issues Today" value={summary.kpis.fleetIssues} />
      </div>

      {/* AI SUMMARY */}
      <AISummaryPanel summary={aiSummary} />

      {/* PROJECT STATUS TABLE */}
      <ProjectStatusTable projects={summary.projects} />

      {/* ATTENDANCE SNAPSHOT */}
      <AttendanceSnapshot attendance={summary.kpis.attendance} />
    </div>
  );
};

export default ExecutiveDashboard;
