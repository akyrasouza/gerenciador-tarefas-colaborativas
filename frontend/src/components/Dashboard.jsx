import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

   useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (err) {
        console.error("Erro ao buscar tarefas", err);
      }
    };
    fetchTasks();
  }, []);

   return (
    <div className="dashboard">
      <h2>Minhas Tarefas</h2>
      <Link to="/task" className="new-task-button">Nova Tarefa</Link>
      <div className="card-container">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
           <div className="card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="user_status">
                 <p><strong>Usuário:</strong> {task.creator}</p>
                  <span className={`status ${task.status}`}>{task.status}</span>
              </div>
            </div>
            <Link to={`/task/${task.id}`} className="edit-link">Editar</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;