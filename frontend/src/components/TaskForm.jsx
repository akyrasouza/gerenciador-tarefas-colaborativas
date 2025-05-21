import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Form.css";

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pendente");

   useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await api.get(`/tasks/${id}`);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setStatus(response.data.status);
        } catch (err) {
          console.error("Erro ao buscar tarefa", err);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = { title, description, status };
      if (id) {
        await api.put(`/tasks/${id}`, taskData);
      } else {
        await api.post("/tasks", taskData);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro ao salvar tarefa", err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{id ? "Editar Tarefa" : "Nova Tarefa"}</h2>
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <label >Status da Tarefa:</label>
      <select value={status} onChange={(e)=> setStatus(e.target.value)} required>
        <option value="pendente">Pendente</option>
        <option value="fazendo">Fazendo</option>
        <option value="concluido">Concluído</option>
      </select>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default TaskForm;
