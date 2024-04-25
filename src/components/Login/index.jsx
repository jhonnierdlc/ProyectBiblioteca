import { useState } from "react";
import axios from "axios";
import "./styles.css";
import logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/Inicio";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="login-form">
      <div className="containe">
        <div className="main">
          <div className="content">
            <h2>BiblioSoft</h2>
            <form action="#" method="post" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Correo Electronico"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
              />
              {error && <div className="error_msg">{error}</div>}

              <button className="btn" type="submit">
                Iniciar Sesion
              </button>
            </form>
            <p className="account">
              ¿No tienes cuenta?
              <Link to="/singup">
                <a href="#"> Registrar</a>
              </Link>
            </p>
          </div>
          <div className="form-img">
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
