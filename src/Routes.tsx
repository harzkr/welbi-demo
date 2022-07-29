import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  Outlet
} from "react-router-dom";
import Landing from "./components/Landing/LandingContainer";
import Dashboard from "./components/Dashboard/DashboardContainer";

function RequireAuth() {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/landing" state={{ from: location }} />;
  }

  return <Outlet />;
}

const routes = () => {
  return (
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
  );
};

export default routes;
