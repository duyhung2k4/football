import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/thunk/accout";

function Login() {

    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [phone, setPhone] = useState("");
    const [warn, setWarn] = useState("");

    const dispatch = useDispatch();
    const isValid = useSelector(state => state.accout.isValidAccout);

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <form action="" autoComplete="off">
                                <div className="form-group">
                                    <input
                                        value={name}
                                        placeholder="Name"
                                        onChange={(e) => { setName(e.target.value) }}
                                        type="text" className="form-control" name="username"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        value={pass}
                                        placeholder="Pass"
                                        onChange={(e) => { setPass(e.target.value) }}
                                        type="password" className="form-control" name="password"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        value={phone}
                                        placeholder="Phone"
                                        onChange={(e) => { setPhone(e.target.value) }}
                                        type="password" className="form-control" name="phone"
                                    />
                                </div>
                                {(warn ? <div>{warn}</div> : <div>{(isValid === "None Exsit" ? <div>{isValid}</div> : <div></div>)}</div>)}
                                <button
                                    onClick={() => {
                                        if (name === "" || pass === "" || phone === "") {
                                            setWarn("Dien thieu thong tin");
                                        } else {
                                            setWarn("");
                                            dispatch(login(name, pass, phone))
                                        }
                                    }}
                                    type="button" id="sendlogin" className="btn btn-primary"
                                >login</button>
                                <br />
                                <div className="form-group" style={{
                                    textAlign: "center",
                                }}>
                                    <Link to="/signin">Sign In</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login