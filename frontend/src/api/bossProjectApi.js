import axios from 'axios';

export const getProjectOverview = (projectId) =>
  axios.get(`/api/boss/projects/${projectId}/overview`);

export const getProgressTimeline = (projectId) =>
  axios.get(`/api/boss/projects/${projectId}/progress-timeline`);

export const getAttendanceSnapshot = (projectId, date) =>
  axios.get(`/api/boss/projects/${projectId}/attendance-snapshot?date=${date}`);

export const getFleetStatus = (projectId, date) =>
  axios.get(`/api/boss/projects/${projectId}/fleet-status?date=${date}`);

export const getAIRiskAnalysis = (payload) =>
  axios.post(`/api/ai/project-risk-analysis`, payload);