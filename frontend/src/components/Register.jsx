import { useState } from "react";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate,Link } from "react-router-dom";
import api from "../services/api";
//import "../styles/Register.css";
import "../styles/Login.css";
import RegisterImage from '../assets/login-interface.png';


function Register() {
  const {login} = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
      });

      const { token, user } = response.data;

      login(user, token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro ao registrar:", err);
      alert("Erro ao registrar. Tente novamente.");
    }
  };

   return (
    <div className="login-container">
      <div className="image-side">
         <img src={RegisterImage} alt="Cadastrar" />
      </div>

      <div className="form-side">
        <form className="login-form" onSubmit={handleRegister}>
          <h2>Cadastre-se</h2>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
          <div className="register-link">
            Já possui uma conta? <a href="/">Entrar</a>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Register;