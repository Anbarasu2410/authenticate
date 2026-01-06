import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getProjectOverview,
  getProgressTimeline,
  getAttendanceSnapshot,
 // getFleetStatus,
  getAIRiskAnalysis
} from '../api/bossProjectApi';

import ProjectHeader from '../components/ProjectHeader';
import PlannedVsActual from '../components/PlannedVsActual';
import AIRiskPanel from '../components/AIRiskPanel';
import ProgressTimeline from '../components/ProgressTimeline';
import ManpowerSnapshot from '../components/ManpowerSnapshot';
import FleetStatus from '../components/FleetStatus';

const ProjectOverview = () => {
  const { projectId } = useParams();
  const today = new Date().toISOString().split('T')[0];

  const [overview, setOverview] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [fleet, setFleet] = useState(null);
  const [aiRisk, setAiRisk] = useState(null);

  useEffect(() => {
    loadData();
  }, [projectId]);

  const loadData = async () => {
    const [ov, tl, at, fl] = await Promise.all([
      getProjectOverview(projectId),
      getProgressTimeline(projectId),
      getAttendanceSnapshot(projectId, today),
      getFleetStatus(projectId, today)
    ]);

    setOverview(ov.data);
    setTimeline(tl.data.timeline);
    setAttendance(at.data);
    setFleet(fl.data);

    // AI Payload
    const aiPayload = {
      projectCode: ov.data.project.projectCode,
      plannedProgress: ov.data.plannedVsActual.plannedProgress,
      actualProgress: ov.data.plannedVsActual.actualProgress,
      manpower: at.data,
      fleetIssues: fl.data.delayed,
      permitStatus: "PENDING",
      daysDelayed: 10
    };

    const aiRes = await getAIRiskAnalysis(aiPayload);
    setAiRisk(aiRes.data);
  };

  if (!overview) return <div>Loading...</div>;

  return (
    <div className="project-overview">
      <ProjectHeader project={overview.project} />

      <div className="grid-2">
        <PlannedVsActual data={overview.plannedVsActual} />
        <AIRiskPanel risk={aiRisk} />
      </div>

      <ProgressTimeline timeline={timeline} />

      <ManpowerSnapshot data={attendance} />

      <FleetStatus data={fleet} />
    </div>
  );
};

export default ProjectOverview;