import Cookies from "js-cookie";

export const loginAdmin = (accout = {}) => async dispatch => {

    console.log(accout);

    await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(accout)
    })
        .then(res => res.json())
        .then(res => {
            if(res.Warn) {
                dispatch({
                    type: "noti_accout",
                    payload: res.Warn
                })
            } else {
                dispatch({
                    type: "noti_accout",
                    payload: "Done",
                })
                Cookies.set("admin", res.Token, { expires: 1, path: "/" });
                window.location.href = "http://localhost:3002/contract";
            }
        }) 
}