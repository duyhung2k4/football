import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPitch } from "../../redux/thunk/pitch";
import { useNavigate, Link } from "react-router-dom";

function Pitch() {

    const pitchs = useSelector(state => state.pitch.list_pitch);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPitch())
    }, [])

    return (

        <div className="container" style={{
            marginTop: "50px",
        }}>
            <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                    navigate("/addpitch");
                }}
            >Add Pitch</button>
            <div className="col-md-10 offset-md-1 row" style={{ marginTop: "50px" }}>
                {
                    pitchs.map((obj, i) => {
                        return (
                            <div key={i} className="card col-md-4" style={{ border: "0px solid black", marginTop: "30px" }}>
                                <div className="card-body col-md-10 offset-md-1" style={{ border: "1px solid black", borderRadius: "5px" }}>
                                    <p className="card-text">Pitch Index: {obj.Index}</p>
                                    <p className="card-text">Open: {
                                        obj.Status ?
                                            <svg
                                                style={{
                                                    float: "right",
                                                    color: "green"
                                                }}
                                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                            </svg> :
                                            <svg
                                                style={{
                                                    float: "right",
                                                    color: "#ff0000"
                                                }}
                                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation" viewBox="0 0 16 16">
                                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
                                            </svg>
                                    }</p>
                                    <Link
                                        onClick={() => {
                                            dispatch({
                                                type: "info_pitch",
                                                payload: obj
                                            })
                                        }}
                                        to={`/pitch/${obj.Index}`}
                                    >More</Link>
                                </div>
                            </div>
                        )
                    }
                    )
                }
            </div>
        </div>
    )
}

export default Pitch;