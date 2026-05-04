import { Navigate } from "react-router-dom";

export default function WorkerPortal() {
  const isAuth = sessionStorage.getItem("auth");

  // 🔥 PROTECT ROUTE
  if (!isAuth) {
    return <Navigate to="/worker-login" />;
  }

  return (
    <div>
      <h1>Worker Dashboard</h1>

      <h3>Stats Section</h3>

      <h3>Add Laundry Form</h3>

      <h3>Entries List</h3>
    </div>
  );
}
