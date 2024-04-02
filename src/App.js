import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Singup from "./components/Singup";
import RegistroUsuarios from "./components/Usuarios/RegistroUsuarios/RegistroUsuarios";
import RegistroLibros from "./components/Libros/RegistroLibros/RegistroLibros";
import ConsultarUsuarios from "./components/Usuarios/ConsultarUsuarios/ConsultarUsuarios";
import ConsultarLibro from "./components/Libros/ConsultaLibros/ConsultaLibro";

function App() {
  return (
    <Routes>
			
			<Route path="/login" exact element={<Login />} />
      <Route path="/singup" exact element={<Singup />} />
			<Route path="/Registro-Usuario" exact element={<RegistroUsuarios />} />
			<Route path="/Consulta-Usuario" exact element={<ConsultarUsuarios />} />
			<Route path="/Registro-Libros" exact element={<RegistroLibros />} />
			<Route path="/Consulta-Libros" exact element={<ConsultarLibro />} />

	</Routes>
  );
}

export default App;
