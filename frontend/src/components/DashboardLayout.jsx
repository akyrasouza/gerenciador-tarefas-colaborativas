import { Link, Outlet } from 'react-router-dom';
import '../styles/DashboardLayout.css';
import { useAuth } from '../contexts/AuthContext';

function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Painel</h2>
        <nav>
          {user?.is_admin && <Link to="/admin">Área do Administrador</Link>}
          <Link to="/usuario">Área do Usuário</Link>
          <Link to="/dashboard">Tarefas</Link>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;

