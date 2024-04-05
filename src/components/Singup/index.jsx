import './styles.css'
import logo from '../../assets/img/singup.svg';
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Singup = () => {

	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
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
		<div className="login-formm">
			<div className="containee">
				<div className="main">
					<div className="form-imgg">
						
					<img src={logo} alt="" />

					</div>
					<div className="contentt">
						<h2>Registrar Usuario</h2>
						<form action="#" method="post"  onSubmit={handleSubmit}>
							<input 
							type="text" 
							name="firstName" 
							placeholder="Nombres" 
							onChange={handleChange}
							value={data.firstName}
							required autofocus="" />
							<input 
							type="text" 
							name="lastName" 
							placeholder="Apellidos" 
							onChange={handleChange}
							value={data.lastName}
							required autofocus="" />
							<input 
							type="text" 
							name="email" 
							placeholder="Correo Electronico"
							onChange={handleChange}
							value={data.email}
							required autofocus="" />
							<input 
							type="password"
							name="password" 
							placeholder="Contraseña" 
							onChange={handleChange}
							value={data.password}
							required autofocus="" />
							{error && <div className="error_msg">{error}</div>}
							<button className="btn" type="submit">
								Registrar Cuenta
							</button>

						</form>
						<p className="account">¿Ya tienes cuenta?
							<Link to="/login">
								<a href="#"> Iniciar Sesion</a>
							</Link>
						</p>

					</div>

				</div>
			</div>
		</div>
	);
};

export default Singup;
