const ProgressTimeline = ({ timeline }) => (
  <div className="card">
    <h3>Project Progress Timeline</h3>
    {timeline.map((t, i) => (
      <p key={i}>
        {t.date} — {t.progress}%
      </p>
    ))}
  </div>
);

export default ProgressTimeline;