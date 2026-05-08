import { Navigate } from "react-router-dom";
import { useLaundry } from "../context/LaundryContext";
import { useState } from "react";

export default function WorkerPortal() {
  const isAuth = sessionStorage.getItem("auth");

  // protect route
  if (!isAuth) {
    return <Navigate to="/worker-login" />;
  }

  const { entries, addEntry, markReady, markCollected, stats, changePin } =
    useLaundry();

  const [studentId, setStudentId] = useState("");
  const [clothCount, setClothCount] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // PIN states
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [pinMessage, setPinMessage] = useState("");

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

  // change pin handler
  const handleChangePin = () => {
    const result = changePin(oldPin, newPin);

    setPinMessage(result.message);

    if (result.success) {
      setOldPin("");
      setNewPin("");
    }
  };

  // filter logic
  const filteredEntries = entries
    .filter((e) => e.studentId.toLowerCase().includes(search.toLowerCase()))
    .filter((e) => {
      if (filter === "all") return true;
      return e.status === filter;
    });

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "25px",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
        }}
      >
        Worker Dashboard
      </h1>

      {/* STATS SECTION */}
      <section
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            minWidth: "180px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h4>Active Orders</h4>
          <p>{stats.totalActive}</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            minWidth: "180px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h4>Ready Orders</h4>
          <p>{stats.readyCount}</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            minWidth: "180px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h4>Collected Orders</h4>
          <p>{stats.collectedCount}</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            minWidth: "180px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h4>Total Entries</h4>
          <p>{stats.totalEntries}</p>
        </div>
      </section>

      {/* ADD LAUNDRY FORM */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h3>Add Laundry</h3>

        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <input
          type="number"
          placeholder="Cloth Count"
          value={clothCount}
          onChange={(e) => setClothCount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

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

        <div
          style={{
            marginTop: "15px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
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
                background: "white",
                margin: "15px 0",
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
              }}
            >
              <p>
                <strong>ID:</strong> {e.studentId}
              </p>

              <p>
                <strong>Clothes:</strong> {e.clothCount}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      e.status === "submitted"
                        ? "orange"
                        : e.status === "ready"
                          ? "green"
                          : "#7c3aed",
                    fontWeight: "bold",
                  }}
                >
                  {e.status}
                </span>
              </p>

              <p>
                <strong>Notes:</strong> {e.notes}
              </p>

              {/* STATUS BUTTONS */}
              {e.status === "submitted" && (
                <button
                  onClick={() => markReady(e.id)}
                  style={{ marginTop: "10px" }}
                >
                  Mark Ready
                </button>
              )}

              {e.status === "ready" && (
                <button
                  onClick={() => markCollected(e.id)}
                  style={{ marginTop: "10px" }}
                >
                  Mark Collected
                </button>
              )}

              {e.status === "collected" && (
                <p style={{ marginTop: "10px" }}>✅ Completed</p>
              )}
            </div>
          ))
        )}
      </section>

      {/* CHANGE PIN SECTION */}
      <section style={{ marginTop: "30px" }}>
        <h3>Change Worker PIN</h3>

        <input
          type="password"
          placeholder="Old PIN"
          value={oldPin}
          onChange={(e) => setOldPin(e.target.value)}
        />

        <div style={{ marginTop: "15px" }} />

        <input
          type="password"
          placeholder="New PIN"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
        />

        <div style={{ marginTop: "15px" }} />

        <button onClick={handleChangePin}>Change PIN</button>

        {pinMessage && <p style={{ marginTop: "10px" }}>{pinMessage}</p>}
      </section>
    </div>
  );
}
