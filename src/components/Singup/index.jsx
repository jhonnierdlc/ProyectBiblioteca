import './styles.css'
import logo from '../../assets/img/singup.svg';
import { Link } from "react-router-dom";

const Singup = () => {
	return (
		<div className="login-formm">
			<div className="containee">
				<div className="main">
					<div className="form-imgg">
						
					<img src={logo} alt="" />

					</div>
					<div className="contentt">
						<h2>Registrar Usuario</h2>
						<form action="#" method="post">
							<input type="text" name="" placeholder="Nombres" required autofocus="" />
							<input type="text" name="" placeholder="Apellidos" required autofocus="" />
							<input type="text" name="" placeholder="Correo Electronico" required autofocus="" />
							<input type="password" name="" placeholder="Contraseña" required autofocus="" />
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
