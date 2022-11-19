import Cookies from "js-cookie";

export const getPitch = () => async dispatch => {

    const jwt = Cookies.get("admin");

    await fetch("http://localhost:3000/admin/pitch", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`,
        }
    })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: "get_pitch",
                payload: [...res],
            })
        })
}

export const addPitch = (pitch = {}) => async dispatch => {

    const jwt = Cookies.get("admin");

    console.log("Done");
    
    await fetch("http://localhost:3000/admin/addPitch", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(pitch)
    })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: "noti_add_pitch",
                payload: res.Text,
            })
        }) 
}

export const updatePitch = (pitch = {}) => async dispatch => {

    const jwt = Cookies.get("admin");

    console.log(pitch);

    await fetch("http://localhost:3000/admin/updatePitch", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(pitch)
    })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: "noti_update_pitch",
                payload: res.Text,
            })
        })
}

export const cancelPitch = (pitch) => async dispatch => {

    const jwt = Cookies.get("admin");
    
    await fetch("http://localhost:3000/admin/cancelPitch", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`,
        },
        body: JSON.stringify(pitch)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        }) 
}

