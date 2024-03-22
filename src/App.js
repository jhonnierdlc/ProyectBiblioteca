import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Singup from "./components/Singup";

function App() {
  return (
    <Routes>
			<Route path="/" exact element={<Main />} />
			<Route path="/login" exact element={<Login />} />
      <Route path="/singup" exact element={<Singup />} />
	</Routes>
  );
}

export default App;
