import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addContract } from "../../redux/thunk/contract";
import { getPitch } from "../../redux/thunk/pitch";
import { useNavigate } from "react-router-dom";

const dateNow = new Date();

function Contract() {

    const [ball, setBall] = useState(false);
    const [water, setWater] = useState(false);
    const [arbitration, setArbitration] = useState(false);
    const [pitchid, setPitchId] = useState(1);
    const [couttime, setCoutTime] = useState(0);
    const [date, setDate] = useState(`${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`);
    const [time, setTime] = useState("");
    const [money, setMoney] = useState(0);

    const [warn, setWarn] = useState("");
    const noti_contract = useSelector(state => state.contract.notiAddContract);

    const navigate = useNavigate();

    const pitch = (useSelector(state => state.contract.pitch)).sort((a, b) => a.Index - b.Index);

    console.log(pitch);

    const dispatch = useDispatch();

    useEffect(() => {
        if(noti_contract === "Done") {
            dispatch({
                type: "noti_add_contract",
                payload: ""
            })
            navigate("/mycontract");
        } else {
            setWarn(noti_contract)
        }
    }, [noti_contract])

    useEffect(() => {
        const pitchSl = pitch.find((obj, i) => obj.Id === pitchid);

        if(pitchSl !== undefined) {
            let coin = 0;

            if(couttime > 0) {
                coin += pitchSl.Money * couttime;
            }

            if(ball) {
                coin += pitchSl.CoinBall; 
            } 

            if(water) {
                coin += pitchSl.CoinWater;
            }

            if(arbitration) {
                coin += pitchSl.CoinArbitration;
            }

            setMoney(coin);
        }

    }, [pitch, ball, water, arbitration, pitchid, couttime])

    useEffect(() => {
        dispatch(getPitch());
    }, [])

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div>
                <button
                    style={{ float: "right"}}
                    onClick={() => {
                        navigate("/home")
                    }}
                >x</button>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Pitch</label>
                <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={(e) => {
                        setPitchId(Number.parseInt(e.target.value), 10);
                    }}
                >
                    {
                        pitch.map((obj, i) =>
                            <option
                                key={obj.Id}
                                value={obj.Id}
                            >{obj.Index}</option>)
                    }
                </select>
            </div>
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    value={water}
                    onChange={(e) => {
                        setWater(!water);
                    }}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">Water</label>
            </div>
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck2"
                    value={arbitration}
                    onChange={(e) => {
                        setArbitration(!arbitration);
                    }}
                />
                <label className="form-check-label" htmlFor="exampleCheck2">Arbitration</label>
            </div>
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck3"
                    value={ball}
                    onChange={(e) => {
                        setBall(!ball);
                    }}
                />
                <label className="form-check-label" htmlFor="exampleCheck3">Ball</label>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Cout Time</label>
                <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Cout Time"
                    value={couttime}
                    onChange={(e) => {
                        setCoutTime(Number.parseInt(e.target.value, 10));
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputTimed1">Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="exampleInputTime1"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputTimed2">Time</label>
                <input
                    type="time"
                    min="00:00"
                    max="24:00"
                    className="form-control"
                    id="exampleInputTime2"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => {
                        setTime(e.target.value);
                    }}
                />
            </div>
            {warn && <p>{warn}</p>}
            <div className="form-group">
                {money !== 0 && <p>Money: {money}</p>}
            </div>
            <button
                style={{
                    float: "right"
                }}
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                    const obj = {
                        ball,
                        water,
                        arbitration,
                        pitchid,
                        couttime,
                        starttime: `${date}T${time}:00+07:00`
                    }

                    setWarn("");

                    if(couttime === 0 || time === "") {
                        setWarn("Thieu");
                    } else {
                        dispatch(addContract(obj));
                    }
                }}
            >Submit</button>
        </div>
    )
}

export default Contract