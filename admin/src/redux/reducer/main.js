import { combineReducers } from "redux";

import reducer_contract from "./contract";
import reducer_pitch from "./pitch";
import reducer_accout from "./accout";

const reducer = combineReducers({
    contract: reducer_contract,
    pitch: reducer_pitch,
    accout: reducer_accout,
})

export default function reducers(state, action) {
    return reducer(state, action);
}