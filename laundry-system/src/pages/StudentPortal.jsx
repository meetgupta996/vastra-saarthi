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
        maxWidth: "900px",
        margin: "0 auto",
        padding: "25px",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        Student Portal
      </h1>

      {/* SEARCH SECTION */}
      <section>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={{
              flex: "1",
              minWidth: "250px",
            }}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        {/* MESSAGE */}
        {message && (
          <p
            style={{
              marginTop: "15px",
              color: "red",
              fontWeight: "600",
            }}
          >
            {message}
          </p>
        )}
      </section>

      {/* RESULT SECTION */}
      <div style={{ marginTop: "25px" }}>
        {result.map((e) => (
          <div
            key={e.id}
            style={{
              background: "white",
              padding: "22px",
              marginBottom: "20px",
              borderRadius: "18px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              transition: "0.2s ease",
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
                marginTop: "25px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {/* Submitted */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "green",
                    margin: "0 auto",
                  }}
                />

                <p style={{ marginTop: "8px" }}>Submitted</p>
              </div>

              {/* Ready */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background:
                      e.status === "ready" || e.status === "collected"
                        ? "green"
                        : "#cbd5e1",
                    margin: "0 auto",
                  }}
                />

                <p style={{ marginTop: "8px" }}>Ready</p>
              </div>

              {/* Collected */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: e.status === "collected" ? "green" : "#cbd5e1",
                    margin: "0 auto",
                  }}
                />

                <p style={{ marginTop: "8px" }}>Collected</p>
              </div>
            </div>

            {/* CURRENT STATUS */}
            <p
              style={{
                marginTop: "25px",
                fontWeight: "bold",
                color:
                  e.status === "submitted"
                    ? "orange"
                    : e.status === "ready"
                      ? "green"
                      : "#7c3aed",
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
