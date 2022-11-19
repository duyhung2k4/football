import Cookies from "js-cookie"


export const getPitch = () => async dispatch => {

    const jwt = Cookies.get("user");

    await fetch("http://localhost:3000/user_post/pitch", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`
        }
    })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: "get_pitch",
                payload: res
            })

            const newList = res.map((obj, i) => {
                const pitch = {
                    id: obj.Index,
                    title: `Pitch Index: ${obj.Index}`
                }

                return pitch;
            })

            newList.sort((a, b) => a.id - b.id);

            dispatch({
                type: "group_pitch",
                payload: newList
            })
        })
}