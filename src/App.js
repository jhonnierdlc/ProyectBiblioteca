import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
			<Route path="/" exact element={<Main />} />
			<Route path="/login" exact element={<Login />} />
	</Routes>
  );
}

export default App;
