// ProjectStatusTable.js
import React from 'react';

const ProjectStatusTable = ({ projects }) => {
  const formatStatus = (status) =>
    status
      ?.toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="border-2 border-gray-400 bg-white p-4 rounded-lg">
      <h4 className="font-bold uppercase mb-2 text-gray-800">Active Projects Status</h4>

      <table className="w-full table-fixed border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-gray-500 px-2 py-1 text-left">Code</th>
            <th className="border border-gray-500 px-2 py-1 text-left">Name</th>
            <th className="border border-gray-500 px-2 py-1 text-center">Progress</th>
            <th className="border border-gray-500 px-2 py-1 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.projectId}>
              <td className="border border-gray-400 px-2 py-1">{p.projectCode}</td>
              <td className="border border-gray-400 px-2 py-1 truncate">{p.projectName}</td>
              <td className="border border-gray-400 px-2 py-1 text-center">{p.overallProgress}%</td>
              <td
                className={`border border-gray-400 px-2 py-1 text-center font-semibold ${
                  p.progressStatus === 'DELAYED' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {formatStatus(p.progressStatus)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectStatusTable;
