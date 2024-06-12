import React, { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
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
      localStorage.setItem("token", res.data.data); // Cambiado res.data a res.data.data para obtener el token correcto
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

  const handleGoogleSuccess = async (response) => {
    const { credential } = response;
    try {
      const url = "http://localhost:8080/api/auth/google";
      const { data: res } = await axios.post(url, { tokenId: credential });
      localStorage.setItem("token", res.data.data); // Cambiado res.data a res.data.data para obtener el token correcto
      window.location = "/Inicio";
    } catch (error) {
      setError("Error al iniciar sesión con Google");
    }
  };

  const handleGoogleFailure = (error) => {
    setError("Error al iniciar sesión con Google");
  };

  return (
    <GoogleOAuthProvider clientId="672309472051-3iacjdib48bg0oi56n8m7b57l2s0prp3.apps.googleusercontent.com">
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
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
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
    </GoogleOAuthProvider>
  );
};

export default Login;
