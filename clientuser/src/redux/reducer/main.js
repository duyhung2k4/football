import { combineReducers } from "redux";

import { reducer_contract } from "./contract";
import { reducer_accout } from "./accout";

const reducer = combineReducers({
    contract: reducer_contract,
    accout: reducer_accout,
})

export default function reducers(state, action) {
    return reducer(state, action);
}