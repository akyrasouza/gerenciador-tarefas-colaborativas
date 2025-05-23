import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import TaskForm from "./components/TaskForm";
import AdminArea from './pages/AdminArea';
import UsuarioArea from './pages/UsuarioArea';
import "../src/styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin" element={<AdminArea />} />
          <Route path="usuario" element={<UsuarioArea />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
