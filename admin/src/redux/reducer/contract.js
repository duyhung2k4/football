const initialValue = {
    list_contract: [],
    info_contract: {},
    noti_auth_contract: "",
    noti_cancel_contract: "",
}

const reducer_contract = (state = initialValue, action) => {
    switch (action.type) {
        case "get_contract":
            state = {
                ...state,
                list_contract: [...action.payload],
            }
            break;
        case "info_contract":
            state = {
                ...state,
                info_contract: action.payload,
            }
            break;
        case "noti_auth_contract":
            state = {
                ...state,
                noti_auth_contract: action.payload,
            }
            break;
        case "noti_cancel_contract":
            state = {
                ...state,
                noti_cancel_contract: action.payload
            }
            break;
        default:
            break;
    }

    return state;
}

export default reducer_contract;