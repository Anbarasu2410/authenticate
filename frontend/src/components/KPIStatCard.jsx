// KPIStatCard.js
import React from 'react';

const KPIStatCard = ({ title, value }) => (
  <div className="border-2 border-gray-400 bg-white p-4 flex flex-col items-center justify-center rounded-lg min-h-[110px]">
    <div className="text-sm font-semibold uppercase text-gray-800 text-center">{title}</div>
    <div className="text-2xl font-bold text-gray-900 mt-2">{value}</div>
  </div>
);

export default KPIStatCard;
