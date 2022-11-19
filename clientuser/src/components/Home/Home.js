import { useEffect } from "react";
import { getContract } from "../../redux/thunk/contract";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPitch } from "../../redux/thunk/pitch";

import Timeline from "react-calendar-timeline"
import "react-calendar-timeline/lib/Timeline.css"
import moment from "moment"

function Home() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const list_contract = useSelector(state => state.contract.list_contract);
    const group_pitch = useSelector(state => state.contract.group_pitch);

    useEffect(() => {
        dispatch(getContract());
        dispatch(getPitch());
    }, [])

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div>
                <button 
                    onClick={() => {
                        navigate("/contract");
                    }}
                    type="button" className="btn btn-primary"
                >Book</button>
            </div>
            <div style={{ marginTop: "50px" }}>
                <Timeline
                    groups={group_pitch}
                    items={list_contract}
                    defaultTimeStart={moment().add(-12, 'hour')}
                    defaultTimeEnd={moment().add(12, 'hour')}
                />
            </div>
        </div>
    )
}

export default Home