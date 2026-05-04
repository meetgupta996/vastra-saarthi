import { useState } from "react";
import { useLaundry } from "../context/LaundryContext";

export default function StudentPortal() {
  const { entries } = useLaundry();

  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = () => {
    const filtered = entries.filter((e) => e.studentId === studentId);
    setResult(filtered);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Portal</h1>

      {/* SEARCH SECTION */}
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
        Search
      </button>

      {/* RESULT SECTION */}
      <div style={{ marginTop: "20px" }}>
        {result.length === 0 ? (
          <p>No laundry found</p>
        ) : (
          result.map((e) => (
            <div
              key={e.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p>
                <strong>ID:</strong> {e.studentId}
              </p>
              <p>
                <strong>Clothes:</strong> {e.clothCount}
              </p>
              <p>
                <strong>Status:</strong> {e.status}
              </p>
              <p>
                <strong>Notes:</strong> {e.notes}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
