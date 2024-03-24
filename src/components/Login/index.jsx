import './styles.css'
import logo from '../../assets/img/logo.svg';
import { Link } from "react-router-dom";



const Login = () => {


    return (
        <div className="login-form">
            <div className="containe">
                <div className="main">
                    <div className="content">
                        <h2>BiblioSoft</h2>
                        <form action="#" method="post">
                            <input type="text" name="" placeholder="Correo Electronico" required autofocus="" />
                            <input type="password" name="" placeholder="Contraseña" required autofocus="" />
                            <button className="btn" type="submit">
                                Iniciar Sesion
                            </button>

                        </form>
                        <p className="account">¿No tienes cuenta?
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
