import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPitch } from "../../redux/thunk/pitch";
import { useNavigate } from "react-router-dom";

function AddPitch() {

    const [money, setMoney] = useState(0);
    const [index, setIndex] = useState(1);
    const [status, setStatus] = useState(false);
    const [coinball, setCoinBall] = useState(0);
    const [coinwater, setCoinWater] = useState(0);
    const [coinarbitration, setCoinArbitration] = useState(0);
    const [amountofpeople, setAmountOfPeople] = useState(0);
    const [warn, setWarn] = useState("");

    const noti_add_pitch = useSelector(state => state.pitch.noti_add_pitch);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(noti_add_pitch);
        if(noti_add_pitch === "Done") {
            navigate("/pitch");
        }
        if(noti_add_pitch === "Exist") {
            setWarn("Index Exist");
        }
    }, [noti_add_pitch])

    return (
        <div className="container" style={{
            marginTop: "50px",
            marginBottom: "50px",
            border: "1px solid black",
            borderRadius: "5px",
            paddingTop: "20px",
            paddingBottom: "20px"
        }}>
            <div className="form-group">
                <label>Money</label>
                <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="Money"
                    value={money}
                    onChange={(e) => {
                        setMoney(Number.parseInt(e.target.value, 10));
                    }}
                />
            </div>
            <div className="form-group">
                <label>Index</label>
                <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="Index"
                    value={index}
                    onChange={(e) => {
                        setIndex(Number.parseInt(e.target.value, 10));
                    }}
                />
            </div>
            <div className="form-group">
                <label>Coin Ball</label>
                <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="Coin Ball"
                    value={coinball}
                    onChange={(e) => {
                        setCoinBall(Number.parseInt(e.target.value, 10));
                    }}
                />
            </div>
            <div className="form-group">
                <label>Coin Water</label>
                <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="Coin Water"
                    value={coinwater}
                    onChange={(e) => {
                        setCoinWater(Number.parseInt(e.target.value, 10));
                    }}
                />
            </div>
            <div className="form-group">
                <label>Coin Arbitration</label>
                <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="Coin Arbitration"
                    value={coinarbitration}
                    onChange={(e) => {
                        setCoinArbitration(Number.parseInt(e.target.value, 10));
                    }}
                />
            </div>
            <div className="form-group">
                <label>Amount Of PeoPle</label>
                <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="Amount Of PeoPle"
                    value={amountofpeople}
                    onChange={(e) => {
                        setAmountOfPeople(Number.parseInt(e.target.value, 10));
                    }}
                />
            </div>
            <div className="form-check">
                <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="exampleCheck1" 
                    value={status}
                    onClick={(e) => {
                        setStatus(!status)
                    }}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">Status</label>
            </div>
            <div className="form-group">
                {warn && <p>{warn}</p>}
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                    const pitch = {
                        money,
                        index,
                        status,
                        coinball,
                        coinwater,
                        coinarbitration,
                        amountofpeople
                    }
                    dispatch(addPitch(pitch))
                }}
            >Submit</button>
        </div>
    )
}

export default AddPitch;