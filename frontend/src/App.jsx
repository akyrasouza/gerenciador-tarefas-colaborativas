import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//import { useAuth } from './contexts/AuthContext';
import { useAuth } from '../contexts/useAuth';
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import TaskForm from "./components/TaskForm";
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './components/DashboardLayout';
import AdminArea from './pages/AdminArea';
import UsuarioArea from './pages/UsuarioArea';
import "../src/styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas privadas com layout */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="usuario" element={<UsuarioArea />} />
            <Route path="task" element={<TaskForm />} /> 
            <Route path="task/:id" element={<TaskForm />} />
            <Route
              path="admin"
              element={
                <PrivateRouteAdmin>
                  <AdminArea />
                </PrivateRouteAdmin>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

function PrivateRouteAdmin({ children }) {
  const { user } = useAuth();
  if (!user || !user.is_admin) {
    return <Navigate to="/dashboard" />; // redireciona admins falsos para dashboard comum
  }
  return children;
}

export default App;


