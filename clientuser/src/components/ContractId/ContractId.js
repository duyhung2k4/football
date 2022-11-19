import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cancelContract, postImageCloud } from "../../redux/thunk/contract";

function ContractId() {

    const contract = useSelector(state => state.contract.info_contract);
    const noti_auth_contract = useSelector(state => state.contract.noti_auth_contract);
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);

    const navigate = useNavigate();



    useEffect(() => {
        if(noti_auth_contract === "Done") {
            dispatch({
                type: "noti_auth_contract",
                payload: "",
            })
            navigate("/mycontract");
        }
    }, [noti_auth_contract])

    useEffect(() => {
        if (contract.Id === undefined) {
            navigate("/mycontract");
        }
        
    }, [contract])

    return (
        <>
            {contract.Id !== undefined &&
                <div className="card container" style={{
                    marginTop: "50px"
                }
                }>
                    <div className="card-body">
                        <p>
                            <button
                                style={{ float: "right" }}
                                onClick={() => {
                                    navigate("/mycontract")
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
                        <input 
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                            }}
                            type="file" 
                            id="select" 
                            placeholder="Proof" />
                        <br/>
                        {image && <img width={"250px"} src={URL.createObjectURL(image)} />}
                        <div className="card-body">
                            <button
                                style={{ float: "right" }}
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    const newContract = {
                                        ...contract,
                                        image
                                    }
                                    dispatch(postImageCloud(newContract))
                                }}
                            >Update</button>
                            <button
                                style={{ float: "right", marginRight: "20px" }}
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {
                                    dispatch(cancelContract(contract))
                                }}
                            >Delete</button>
                        </div>
                    </div>
                </div>
            }
        </>

    )

}

export default ContractId;
