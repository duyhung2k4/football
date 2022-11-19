import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


function Navbar() {

    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Admin</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/contract">Contract <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/pitch">Pitch</Link>
                    </li>
                </ul>
                <div className="form-inline my-2 my-lg-0">
                        <button 
                            className="btn btn-outline-success my-2 my-sm-0" 
                            type="submit"
                            onClick={() => {
                                Cookies.remove("admin", { path: "/" });
                                navigate("/login");
                            }}
                        >Log out</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar