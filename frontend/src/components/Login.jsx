import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../contexts/useAuth';
import api from "../services/api";
import "../styles/Login.css";
import loginImage from '../assets/login-interface.png';

function Login() {
  const {login} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post('/login', { email, password });
    login(res.data.user, res.data.token);
    
    if (res.data.user.is_admin) {
      navigate('/admin');
    } else {
      navigate('/usuario');
    }
  } catch (err) {
    console.error("Erro no login:", err);
    alert('Login inválido');
  }
};


  return (
    <div className="login-container">
      <div className="image-side">
       <img className="login-image" src={loginImage} alt="Login" />
      </div>
      <div className="form-side">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
          <div className="register-link">
            Não tem uma conta? <a href="/register">Cadastre-se</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
