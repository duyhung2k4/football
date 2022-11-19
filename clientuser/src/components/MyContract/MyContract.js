import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getContractIdUser } from "../../redux/thunk/contract"

function MyContract() {

    const dispatch = useDispatch();
    const list_contract_iduser = useSelector(state => state.contract.list_contract_iduser);

    useEffect(() => {
        dispatch(getContractIdUser());
    }, [])

    return (
        <div className="col-md-10 offset-md-1 row" style={{ marginTop: "50px" }}>
            {
                list_contract_iduser.map((obj, i) => {

                    const arrayStart = `${obj.StartTime}`.split("T");
                    const startTime = arrayStart[1].split("+");

                    const arrayEnd = `${obj.EndTime}`.split("T");
                    const ennTime = arrayEnd[1].split("+");


                    return (
                        <div key={i} className="card col-md-4" style={{ border: "0px solid black", marginTop: "30px"}}>
                            <div className="card-body col-md-10 offset-md-1" style={{ border: "1px solid black", borderRadius: "5px"}}>
                                <p className="card-text">Date: {arrayStart[0]} - {arrayEnd[0]}</p>
                                <p className="card-text">Start Time: {startTime[0]}</p>
                                <p className="card-text">End Time: {ennTime[0]}</p>
                                <p className="card-text">Pitch Index: {obj.Pitch.Index}</p>
                                <Link 
                                    onClick={() => {
                                        dispatch({
                                            type: "info_contract",
                                            payload: obj,
                                        });
                                    }}
                                    to={`/contract/${obj.Id}-${obj.PitchId}`}
                                >More</Link>
                            </div>
                        </div>
                    )
                }
                )
            }
        </div>
    )
}

export default MyContract