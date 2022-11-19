import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../redux/thunk/accout";

function Login() {

    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [code, setCode] = useState("");
    const [warn, setWarn] = useState("");

    const noti_accout = useSelector(state => state.accout.noti_accout);
    const dispatch = useDispatch();

    return (

        <div className="container">
            <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <div className="form-group">
                                    <input
                                        placeholder="Name"
                                        type="text" className="form-control" name="username"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        placeholder="Pass"
                                        type="password" className="form-control" name="password"
                                        value={pass}
                                        onChange={(e) => {
                                            setPass(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        placeholder="Code"
                                        type="password" className="form-control" name="code"
                                        value={code}
                                        onChange={(e) => {
                                            setCode(e.target.value);
                                        }}
                                    />
                                </div>
                                {(warn ? <p>{warn}</p> : (noti_accout === "None Exist" ? <p>None Exist</p> : <p></p>))}
                                <button
                                    type="button" id="sendlogin" className="btn btn-primary"
                                    onClick={() => {
                                        const accout = {
                                            name,
                                            pass,
                                            code
                                        }
                                        if (name === "" || pass === "" || code === "") {
                                            setWarn("Dien thieu thong tin");
                                        } else {
                                            setWarn("");
                                            dispatch(loginAdmin(accout))
                                        }
                                    }}
                                >Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;