const initialValue = {
    isValidAccout: "",
}


export const reducer_accout = (state = initialValue, action) => {

    switch (action.type) {
        case "is_valid_accout":
            state = {
                ...state,
                isValidAccout: action.payload,
            }
            break;
        default:
            break;
    }

    return state;
}