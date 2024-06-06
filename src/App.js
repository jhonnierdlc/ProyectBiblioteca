import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Singup from "./components/Singup";
import Inicio from "./components/Inicio";
import RegistroUsuarios from "./components/Usuarios/RegistroUsuarios/RegistroUsuarios";
import RegistroLibros from "./components/Libros/RegistroLibros/RegistroLibros";
import EditarUsuario from "./components/Usuarios/EditarUsuario";
import ConsultarUsuarios from "./components/Usuarios/ConsultarUsuarios/ConsultarUsuarios";
import ConsultarLibro from "./components/Libros/ConsultaLibros/ConsultaLibro";
import SeleccionPrestamo from "./components/Prestamo/SelecionPrestamo";
import RegistrarPrestamo from "./components/Prestamo/RegistrarPrestamo";
import RegistrarMulta from "./components/Multa/RegistroMulta";
import ConsultarMulta from "./components/Multa/ConsultarMulta";
import EditarMulta from "./components/Multa/EditarMulta";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import ConsultarPrestamos from "./components/Prestamo/ConsultarPrestamos/ConsultarPrestamos";
import SeleccionMulta from "./components/Multa/SeleccionMulta"
import EditarPrestamo from "./components/Prestamo/EditarPrestamo"
import HistorialMulta from "./components/Multa/Historial"

function App() {
  const user = localStorage.getItem("token");

  return (
    <div>
      {/* Renderizar el componente Main solo si el usuario está autenticado */}
      {user && <Main />}
      
      {/* Definir las rutas */}
      <ToastContainer/>
      <Routes>
        {/* Ruta por defecto - redirigir a /login si el usuario no está autenticado */}
        <Route path="/" element={<Navigate replace to="/login" />} />
        
        {/* Rutas protegidas para usuarios autenticados */}
        {user && (
          <>
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/Registro-Usuario" element={<RegistroUsuarios />} />
            <Route path="/Consulta-Usuario" element={<ConsultarUsuarios />} />
            <Route path="/EditarUsuario/:id" element={<EditarUsuario />} />
            <Route path="/Consulta-Libros" element={<ConsultarLibro />} />
            <Route path="/Registro-Libros" element={<RegistroLibros />} />
            <Route path="/SeleccionPrestamo" element={<SeleccionPrestamo />} />
            <Route path="/RegistrarPrestamo/:id" element={<RegistrarPrestamo />} />
            <Route path="/ConsultarPrestamos" element={<ConsultarPrestamos />} />
            <Route path="/RegistrarMulta/:id" element={<RegistrarMulta />} />
            <Route path="/ConsultarMulta" element={<ConsultarMulta />} />
            <Route path="/EditarMulta/:id" element={<EditarMulta />} />
            <Route path="/SeleccionMulta" element={<SeleccionMulta />} />
            <Route path="/EditarPrestamo/:id" element={<EditarPrestamo />} />
            <Route path="/HistorialMulta" element={<HistorialMulta />} />


          </>
        )}

        {/* Rutas para usuarios no autenticados */}
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/singup" element={<Singup />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
