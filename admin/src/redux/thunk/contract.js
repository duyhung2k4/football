import Cookies from "js-cookie";


export const getContract = () => async dispatch => {

    const jwt = Cookies.get("admin");

    await fetch("http://localhost:3000/admin/contract", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`
        },
    })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: "get_contract",
                payload: [...res],
            })
        })
}


export const cancelContract = (contract = {}) => async dispatch => {

    const jwt = Cookies.get("admin");

    console.log(contract);

    await fetch("http://localhost:3000/admin/cancelContract", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`,
        },
        body: JSON.stringify(contract)
    })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: "noti_cancel_contract",
                payload: res.Text,
            })
        })
}

export const authContract = (contract = {}) => async dispatch => {

    const jwt = Cookies.get("admin");

    contract.Pay = true;

    await fetch("http://localhost:3000/admin/authContract", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`,
        },
        body: JSON.stringify(contract)
    })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: "noti_auth_contract",
                payload: res.Text
            })
            dispatch({
                type: "info_contract",
                payload: {},
            })
        })
}