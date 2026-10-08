import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Training from "./pages/Training";
import Events from "./pages/Events";
import Announcements from "./pages/Announcements";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/training"
          element={<Training />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/announcements"
          element={<Announcements />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;