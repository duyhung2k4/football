const initialValue = {
    list_pitch: [],
    noti_add_pitch: "",
    noti_update_pitch: "",
    info_pitch: {},
}

const reducer_pitch = (state = initialValue, action) => {

    switch (action.type) {
        case "get_pitch":
            state = {
                ...state,
                list_pitch: [...action.payload],
            }
            break;
        case "noti_add_pitch":
            state = {
                ...state,
                noti_add_pitch: action.payload,
            }
            break;
        case "info_pitch":
            state = {
                ...state,
                info_pitch: action.payload
            }
            break;
        case "noti_update_pitch":
            state = {
                ...state,
                noti_update_pitch: action.payload,
            }
            break;
        default:
            break;
    }

    return state;
}

export default reducer_pitch;