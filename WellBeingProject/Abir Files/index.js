import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import DietPlan from "./DietPlan"; // Import DietPlan component
import "./index.css";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/diet-plan" element={<DietPlan />} />{" "}
      {/* Route for diet plan */}
    </Routes>
  </Router>,
  document.getElementById("root")
);
