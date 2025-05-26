import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; 
import '../styles/DashboardLayout.css';
import { useAuth } from '../contexts/useAuth';

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

    const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Painel</h2>
        <nav>
          {user?.is_admin && <Link to="/admin">Área do Administrador</Link>}
          <Link to="/usuario">Área do Usuário</Link>
          <Link to="/dashboard">Tarefas</Link>
           <button onClick={handleLogout} className="logout-icon-button">
            <FiLogOut /> Sair
          </button>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;

