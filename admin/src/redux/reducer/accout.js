const initialValue = {
    noti_accout: "",
}

const reducer_accout = (state = initialValue, action) => {

    switch (action.type) {
        case "noti_accout":
            state = {
                ...state,
                noti_accout: action.payload,
            }
            break;
        default:
            break;
    }

    return state;
}

export default reducer_accout;