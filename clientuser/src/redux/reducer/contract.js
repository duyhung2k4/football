const initialValue = {
    list_contract: [],
    list_contract_iduser: [],
    notiAddContract: "",
    noti_auth_contract: "",
    info_contract: {},
    pitch: [],
    group_pitch: [],
}

export const reducer_contract = (state = initialValue, action) => {

    switch (action.type) {
        case "get_contract":
            state = {
                ...state,
                list_contract: [...action.payload],
            }
            break;
        case "get_contract_iduser":
            state = {
                ...state,
                list_contract_iduser: [...action.payload],
            }
            break;
        case "get_pitch":
            state = {
                ...state,
                pitch: [...action.payload],
            }
            break;
        case "noti_add_contract":
            state = {
                ...state,
                notiAddContract: action.payload,
            }
            break;
        case "noti_auth_contract":
            state = {
                ...state,
                noti_auth_contract: action.payload,
            }
            break;
        case "info_contract":
            state = {
                ...state,
                info_contract: action.payload,
            }
            break;
        case "group_pitch":
            state = {
                ...state,
                group_pitch: [...action.payload]
            }
            break;
        default:
            break;
    }

    return state

}