const AIRiskPanel = ({ risk }) => (
  <div className="card">
    <h3>AI Risk Flags 🤖</h3>
    {risk?.flags?.map((f, i) => (
      <p key={i}>⚠ {f}</p>
    ))}
    <strong>Risk Level: {risk?.riskLevel}</strong>
  </div>
);

export default AIRiskPanel;