import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import WorkerLogin from "./pages/WorkerLogin";
import WorkerPortal from "./pages/WorkerPortal";
import StudentPortal from "./pages/StudentPortal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/worker" element={<WorkerPortal />} />
        <Route path="/student" element={<StudentPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;