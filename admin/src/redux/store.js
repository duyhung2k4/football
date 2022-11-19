import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducer/main";

const middleware = [thunk];

export const store = createStore(
    reducers,
    applyMiddleware(...middleware),
)