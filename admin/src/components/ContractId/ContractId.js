import { useSelector, useDispatch } from "react-redux";
import { authContract, cancelContract } from "../../redux/thunk/contract";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ContractId() {


    const [warn, setWarn] = useState("");

    const contract = useSelector(state => state.contract.info_contract);
    const noti_auth = useSelector(state => state.contract.noti_auth_contract);
    const noti_cancel_contract = useSelector(state => state.contract.noti_cancel_contract);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (noti_auth === "Done") {
            dispatch({
                type: "noti_auth_contract",
                payload: ""
            })
            navigate("/contract");
        }
        if (noti_auth === "Error") {
            setWarn("Error");
        }
    }, [noti_auth])

    useEffect(() => {
        if(noti_cancel_contract === "Done") {
            dispatch({
                type: "noti_cancel_contract",
                payload: "",
            })
            navigate("/contract");
        }
    }, [noti_cancel_contract])

    useEffect(() => {
        if (contract.Id === undefined) {
            navigate("/contract");
        }
    }, [contract, noti_auth])

    return (
        <>
            {contract.Id !== undefined &&
                <div className="card container" style={{
                    marginTop: "50px",
                    marginBottom: "50px"
                }
                }>
                    <div className="card-body">
                        <p>
                            <button
                                style={{ float: "right" }}
                                onClick={() => {
                                    navigate("/contract");
                                }}
                            >
                                x
                            </button>
                        </p>
                        <p className="card-text">Pitch Index: {contract.Pitch.Index}</p>
                        <p className="card-text">Start Time: {contract.StartTime}</p>
                        <p className="card-text">End Time: {contract.EndTime}</p>
                        <p className="card-text">Pay: {contract.Pay ? "YES" : "NO"}</p>
                        <p className="card-text">Coin: {contract.AmountOfMoney}</p>
                        <label htmlFor="select">Proof: </label>
                        {contract.ImagePay && <img className="card-text col-md-4" src={contract.ImagePay} />}
                    </div>
                    {warn && <p>{warn}</p>}
                    <div className="card-body">
                        {!contract.Pay &&
                            <button
                                type="button"
                                className="btn btn-success"
                                style={{ float: "right" }}
                                onClick={() => {
                                    dispatch(authContract(contract));
                                }}
                            >Success</button>}
                        <button
                            type="button"
                            className="btn btn-danger"
                            style={{ float: "right", marginRight: "15px" }}
                            onClick={() => {
                                dispatch(cancelContract(contract));
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default ContractId;