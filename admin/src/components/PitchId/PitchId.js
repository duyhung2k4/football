import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updatePitch } from "../../redux/thunk/pitch";

function PitchId() {

    const pitch = useSelector(state => state.pitch.info_pitch);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [id, setId] = useState(pitch.Id);
    const [money, setMoney] = useState(pitch.Money);
    const [status, setStatus] = useState(pitch.Status);
    const [coinball, setCoinBall] = useState(pitch.CoinBall);
    const [coinwater, setCoinWater] = useState(pitch.CoinWater);
    const [coinarbitration, setCoinArbitration] = useState(pitch.CoinArbitration);
    const [amountofpeople, setAmountOfPeople] = useState(pitch.AmountOfPeople);

    const noti_update_pitch = useSelector(state => state.pitch.noti_update_pitch);

    useEffect(() => {
        if(pitch.Id === undefined) {
            navigate("/pitch");
        }
    }, [pitch])

    useEffect(() => {
        if(noti_update_pitch === "Done") {
            dispatch({
                type: "noti_update_pitch",
                payload: ""
            })
            navigate("/pitch");
        }
    }, [noti_update_pitch])

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
                <button
                    style={{ float: "right" }}
                    onClick={() => {
                        navigate("/pitch");
                    }}
                >x</button>
            </div>
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
                <label>Index: {pitch.Index}</label>
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
                    checked={status}
                    value={status}
                    onChange={(e) => {
                        setStatus(!status)
                    }}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">Status</label>
            </div>
            <div className="form-group">
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                    const newPitch = {
                        id,
                        money,
                        index: pitch.Index,
                        status,
                        coinball,
                        coinwater,
                        coinarbitration,
                        amountofpeople
                    }

                    dispatch(updatePitch(newPitch));
                }}
            >Submit</button>
        </div>
    )
}

export default PitchId;