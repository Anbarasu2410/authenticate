
const ProjectHeader = ({ project }) => (
  <div className="card">
    <h2>{project.projectCode} – {project.projectName}</h2>
    <p>Client: {project.clientName}</p>
    <p>
      Status: <strong>{project.status}</strong> | Progress: {project.overallProgress}%
    </p>
    <p>
      Start: {project.startDate} | Planned End: {project.plannedEndDate}
    </p>
    <p>Expected End: {project.expectedEndDate}</p>
  </div>
);

export default ProjectHeader;
