const PlannedVsActual = ({ data }) => (
  <div className="card">
    <h3>Planned vs Actual</h3>
    <p>Planned: {data.plannedProgress}%</p>
    <p>Actual: {data.actualProgress}%</p>
    <p>Variance: {data.variance}%</p>
  </div>
);

export default PlannedVsActual;