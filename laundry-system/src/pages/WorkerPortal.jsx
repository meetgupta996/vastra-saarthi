import { Navigate } from "react-router-dom";
import { useLaundry } from "../context/LaundryContext";
import { useState } from "react";

export default function WorkerPortal() {
  const isAuth = sessionStorage.getItem("auth");

  // protect route
  if (!isAuth) {
    return <Navigate to="/worker-login" />;
  }

  const { entries, addEntry } = useLaundry();

  const [studentId, setStudentId] = useState("");
  const [clothCount, setClothCount] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  // added entry handler
  const handleAdd = () => {
    const result = addEntry(studentId, Number(clothCount), notes);

    if (!result.success) {
      setError(result.message);
      return;
    }

    // reset form
    setStudentId("");
    setClothCount("");
    setNotes("");
    setError("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Worker Dashboard</h1>

      {/* STATS (placeholder for now) */}
      <h3>Stats Section</h3>

      {/* ADDED LAUNDRY FORM */}
      <section>
        <h3>Add Laundry</h3>

        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Cloth Count"
          value={clothCount}
          onChange={(e) => setClothCount(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <br />
        <br />

        <button onClick={handleAdd}>Add Laundry</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </section>

      {/* ENTRIES LIST */}
      <section>
        <h3>Entries List</h3>

        {entries.length === 0 ? (
          <p>No entries yet</p>
        ) : (
          entries.map((e) => (
            <div
              key={e.id}
              style={{
                border: "1px solid #ccc",
                margin: "10px 0",
                padding: "10px",
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
      </section>
    </div>
  );
}
