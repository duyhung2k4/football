import Cookies from "js-cookie";

export const login = (name, pass, phone) => async dispatch => {

    const user = {
        name,
        pass,
        phone
    };

    await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(res => {
            if (res.Text) {
                dispatch({
                    type: "is_valid_accout",
                    payload: res.Text,
                })
            } else {
                dispatch({
                    type: "is_valid_accout",
                    payload: "",
                })
                Cookies.set("user", res.Token, { expires: 1, path: "/" });
                window.location.href = "http://localhost:3001/"
            }
        })
}

export const signIn = (name, pass, phone) => async dispatch => {

    const user = {
        name,
        pass,
        phone,
    }

    await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then(res => res.json())
        .then(res => {
            if (res.Warn) {
                dispatch({
                    type: "is_valid_accout",
                    payload: res.Warn,
                })
            } else {
                Cookies.set("user", res.Token, { expires: 1, path: "/" })
                window.location.href = "http://localhost:3001/"
            }
        })
}