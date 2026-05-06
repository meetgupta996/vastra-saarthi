import { useState } from "react";
import { useLaundry } from "../context/LaundryContext";

export default function StudentPortal() {
  const { entries } = useLaundry();

  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    const formattedId = studentId.trim().toUpperCase();

    // empty input check
    if (!formattedId) {
      setMessage("Please enter Student ID");
      setResult([]);
      return;
    }

    const filtered = entries.filter((e) => e.studentId === formattedId);

    // no result message
    if (filtered.length === 0) {
      setMessage("No laundry found");
    } else {
      setMessage("");
    }

    setResult(filtered);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Student Portal</h1>

      {/* SEARCH SECTION */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{
            padding: "10px",
            flex: "1",
            minWidth: "250px",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* MESSAGE */}
      {message && (
        <p
          style={{
            marginTop: "15px",
            color: "red",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      {/* RESULT SECTION */}
      <div style={{ marginTop: "25px" }}>
        {result.map((e) => (
          <div
            key={e.id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <p>
              <strong>ID:</strong> {e.studentId}
            </p>

            <p>
              <strong>Clothes:</strong> {e.clothCount}
            </p>

            <p>
              <strong>Notes:</strong> {e.notes || "No notes"}
            </p>

            {/* STATUS TIMELINE */}
            <div
              style={{
                display: "flex",
                gap: "30px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              {/* Submitted */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "green",
                    margin: "0 auto",
                  }}
                />

                <p>Submitted</p>
              </div>

              {/* Ready */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background:
                      e.status === "ready" || e.status === "collected"
                        ? "green"
                        : "gray",
                    margin: "0 auto",
                  }}
                />

                <p>Ready</p>
              </div>

              {/* Collected */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: e.status === "collected" ? "green" : "gray",
                    margin: "0 auto",
                  }}
                />

                <p>Collected</p>
              </div>
            </div>

            {/* CURRENT STATUS */}
            <p
              style={{
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              Current Status: {e.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
