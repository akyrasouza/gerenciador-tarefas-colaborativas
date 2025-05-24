import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import TaskForm from "./components/TaskForm";
import DashboardLayout from './components/DashboardLayout';
import AdminArea from './pages/AdminArea';
import UsuarioArea from './pages/UsuarioArea';
import "../src/styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuario" element={<UsuarioArea />} />
          <Route path="/task/:id" element={<TaskForm />} />
          <Route path="/admin" element={
            <PrivateRouteAdmin>
            <DashboardLayout />
            </PrivateRouteAdmin>
          } />
        </Route>
      </Routes>
    </Router>
  );
}
function PrivateRouteAdmin({ children }) {
  const { user } = useAuth();
  if (!user || !user.is_admin) {
    return <Navigate to="/" />;
  }
  return children;
}

export default App;
