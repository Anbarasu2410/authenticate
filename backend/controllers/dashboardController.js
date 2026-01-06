import Project from '../models/ProjectModel.js';
import Attendance from '../models/AttendanceModel.js';
import WorkerTaskAssignment from '../models/WorkerTaskAssignmentModel.js';
import ProjectDailyProgress from '../models/ProjectDailyProgressModel.js';
import FleetTask from '../models/FleetTaskModel.js';

export const getDashboardSummary = async (req, res) => {
  try {
    const { companyId, date } = req.query;
    if (!companyId || !date) {
      return res.status(400).json({ message: 'companyId and date are required' });
    }

    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Active projects
    const activeProjects = await Project.find({
      companyId,
      status: { $regex: /^Active$/i }
    });

    // Attendance (using checkIn)
    const attendanceToday = await Attendance.find({
      checkIn: { $gte: startOfDay, $lte: endOfDay }
    });

    const present = attendanceToday.length;
    const absent = 0; // skip absent calculation
    const late = attendanceToday.filter(a => a.checkIn.getUTCHours() > 8).length;

    // Project progress
    const progressData = await ProjectDailyProgress.find({
      date: { $gte: startOfDay, $lte: endOfDay }
    });
    const delayedProjects = progressData.filter(p => p.overallProgress < 70);

    // Fleet issues
    const fleetIssues = await FleetTask.find({
      taskDate: { $gte: startOfDay, $lte: endOfDay },
      status: 'DELAYED'
    });

    // Project status mapping
    const projectStatus = activeProjects.map(project => {
      const progress = progressData.find(p => Number(p.projectId) === Number(project.id));
      return {
        projectId: project.id,
        projectCode: project.projectCode,
        projectName: project.projectName,
        projectStatus: project.status,
        overallProgress: progress ? progress.overallProgress : 0,
        progressStatus: progress && progress.overallProgress < 70 ? 'DELAYED' : 'ON_TRACK'
      };
    });

    return res.json({
      kpis: {
        activeProjects: activeProjects.length,
        attendance: { present, absent, late },
        delayedProjects: delayedProjects.length,
        fleetIssues: fleetIssues.length
      },
      projects: projectStatus
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Dashboard summary failed', error: error.message });
  }
};
