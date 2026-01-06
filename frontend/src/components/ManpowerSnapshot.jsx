const ManpowerSnapshot = ({ data }) => (
  <div className="card">
    <h3>Manpower & Attendance</h3>
    <p>Required: {data.required}</p>
    <p>Present: {data.present}</p>
    <p>Absent: {data.absent}</p>
  </div>
);

export default ManpowerSnapshot;