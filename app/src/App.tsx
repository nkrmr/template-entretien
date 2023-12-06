import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import StartupPage from "./pages/Startup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/startup/:slug" element={<StartupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
