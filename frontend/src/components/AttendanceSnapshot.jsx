// AttendanceSnapshot.js
import React from 'react';

const AttendanceSnapshot = ({ attendance }) => (
  <div className="border-2 border-gray-400 bg-white rounded-lg font-mono w-full">
    {/* Header */}
    <div className="px-4 py-2 border-b border-gray-400 font-bold uppercase text-gray-800">
      TODAY’S ATTENDANCE SNAPSHOT
    </div>

    {/* Content */}
    <div className="px-4 py-2 text-sm text-gray-800 whitespace-pre">
      {`Present: ${attendance.present} | Absent: ${attendance.absent} | Late: ${attendance.late}`}
    </div>
  </div>
);

export default AttendanceSnapshot;
