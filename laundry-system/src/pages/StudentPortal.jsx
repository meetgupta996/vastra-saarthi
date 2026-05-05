import { useState } from "react";
import { useLaundry } from "../context/LaundryContext";

export default function StudentPortal() {
  const { entries } = useLaundry();

  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = () => {
    const formattedId = studentId.trim().toUpperCase();

    const filtered = entries.filter((e) => e.studentId === formattedId);

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
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
              }}
            >
              <p>
                <strong>ID:</strong> {e.studentId}
              </p>
              <p>
                <strong>Clothes:</strong> {e.clothCount}
              </p>
              <p>
                <strong>Notes:</strong> {e.notes}
              </p>

              {/* STATUS TIMELINE */}
              <div
                style={{
                  display: "flex",
                  gap: "30px",
                  marginTop: "15px",
                  alignItems: "center",
                }}
              >
                {/* Submitted */}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "green",
                    }}
                  />
                  <p>Submitted</p>
                </div>

                {/* Ready */}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background:
                        e.status === "ready" || e.status === "collected"
                          ? "green"
                          : "gray",
                    }}
                  />
                  <p>Ready</p>
                </div>

                {/* Collected */}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: e.status === "collected" ? "green" : "gray",
                    }}
                  />
                  <p>Collected</p>
                </div>
              </div>

              {/* STATUS TEXT */}
              <p style={{ marginTop: "10px" }}>
                <strong>Current Status:</strong> {e.status}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
