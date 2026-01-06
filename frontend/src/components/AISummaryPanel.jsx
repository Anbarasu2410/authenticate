// AISummaryPanel.js
import React from 'react';

const AISummaryPanel = ({ summary }) => (
  <div className="border-2 border-gray-400 bg-white p-4 rounded-lg">
    <h4 className="font-bold uppercase mb-2 text-gray-800">🔹 AI Daily Summary</h4>
    <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
      {summary.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

export default AISummaryPanel;
