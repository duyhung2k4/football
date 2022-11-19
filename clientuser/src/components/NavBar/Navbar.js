import Cookies from "js-cookie"
import { Link } from "react-router-dom"

function NavBar() {

    const jwt = Cookies.get("user");

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">FootBall</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    {jwt && <li className="nav-item">
                        <Link className="nav-link" to="/mycontract">My Contract</Link>
                    </li>}
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <button
                        className="btn btn-outline-success my-2 my-sm-0" type="submit"
                        onClick={() => {
                            if (jwt) {
                                Cookies.remove("user", { path: "/" })
                            }
                        }}
                    >{jwt ? 
                        <Link to="/login" style={{ color: "green" }}>Log out</Link>:
                        <Link to="/signin" style={{ color: "green" }}>Sign In</Link>}</button>
                </form>
            </div>
        </nav>
    )
}

export default NavBar