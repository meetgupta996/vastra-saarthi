import { Navigate } from "react-router-dom";
import { useLaundry } from "../context/LaundryContext";
import { useState } from "react";

export default function WorkerPortal() {
  const isAuth = sessionStorage.getItem("auth");

  // protect route
  if (!isAuth) {
    return <Navigate to="/worker-login" />;
  }

  const { entries, addEntry, markReady, markCollected } = useLaundry();

  const [studentId, setStudentId] = useState("");
  const [clothCount, setClothCount] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // add entry handler
  const handleAdd = () => {
    const result = addEntry(studentId, Number(clothCount), notes);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setStudentId("");
    setClothCount("");
    setNotes("");
    setError("");
  };

  // filter logic
  const filteredEntries = entries
    .filter((e) => e.studentId.toLowerCase().includes(search.toLowerCase()))
    .filter((e) => {
      if (filter === "all") return true;
      return e.status === filter;
    });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Worker Dashboard</h1>

      {/* STATS */}
      <h3>Stats Section</h3>

      {/* ADD LAUNDRY FORM */}
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

      {/* SEARCH + FILTER */}
      <section style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search by Student ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ marginTop: "10px" }}>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("submitted")}>Submitted</button>
          <button onClick={() => setFilter("ready")}>Ready</button>
          <button onClick={() => setFilter("collected")}>Collected</button>
        </div>
      </section>

      {/* ENTRIES LIST */}
      <section>
        <h3>Entries List</h3>

        {filteredEntries.length === 0 ? (
          <p>No entries found</p>
        ) : (
          filteredEntries.map((e) => (
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

              {/* STATUS BUTTONS */}
              {e.status === "submitted" && (
                <button onClick={() => markReady(e.id)}>Mark Ready</button>
              )}

              {e.status === "ready" && (
                <button onClick={() => markCollected(e.id)}>
                  Mark Collected
                </button>
              )}

              {e.status === "collected" && <p>✅ Completed</p>}
            </div>
          ))
        )}
      </section>
    </div>
  );
}
