import Cookies from "js-cookie";
import Axios from "axios";

export const getContract = () => async dispatch => {

    let list_contract = [];

    await fetch("http://localhost:3000/user/contract")
        .then(res => res.json())
        .then(res => {
            list_contract = [...res];
        })

    const newList = list_contract.map((obj, i) => {

        const start_time = new Date(obj.StartTime);
        const end_time = new Date(obj.EndTime);

        const contract = {
            id: obj.Id,
            group: obj.Pitch.Index,
            canMove: false,
            start_time: start_time,
            end_time: end_time,
        }

        return contract;
    })

    dispatch({
        type: "get_contract",
        payload: newList,
    })
}

export const getContractIdUser = () => async dispatch => {

    let jwt = Cookies.get("user");

    await fetch("http://localhost:3000/user_post/contract", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`,
        }
    })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: "get_contract_iduser",
                payload: res,
            })
        })
}

export const getPitch = () => async dispatch => {

    const jwt = Cookies.get("user");

    await fetch("http://localhost:3000/user_post/pitch", {
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
                payload: res,
            })
        })
}

export const addContract = (contract) => async dispatch => {

    const jwt = Cookies.get("user");

    console.log(contract);

    await fetch("http://localhost:3000/user_post/addContract", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(contract),
    })
        .then(res => res.json())
        .then(res => {
            console.log("Text: ", res.Text);
            if (res.Text === "Done") {
                dispatch({
                    type: "noti_add_contract",
                    payload: res.Text
                })
            } else {
                dispatch({
                    type: "noti_add_contract",
                    payload: res.Text
                })
            }
        })
}

export const cancelContract = (contract) => async dispatch => {

    const jwt = Cookies.get("user");

    await fetch("http://localhost:3000/user_post/cancelContract", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`,
        },
        body: JSON.stringify(contract)
    })
        .then(res => res.json())
        .then(res => {
            if (res.Text === "Done") {
                console.log("Done");
                dispatch({
                    type: "noti_cancel_contract",
                    payload: res.Text
                })
            }
        })
}

export const postImageCloud = (contract) => async dispatch => {

    const jwt = Cookies.get("user");

    const formData = new FormData();

    formData.append("file", contract.image);
    formData.append("upload_preset", "k56buict");

    let urlImage = "";

    await Axios.post(
        "https://api.cloudinary.com/v1_1/dfv5gjyja/image/upload",
        formData)
        .then(res => {
            urlImage = res.data.url;
        })

    delete contract.image;

    contract.ImagePay = urlImage;

    await fetch("http://localhost:3000/user_post/imageauth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(contract)
    })
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: "noti_auth_contract",
                payload: res.Text,
            })

        })


}

export const imageAuth = (id, link_image) => async dispatch => {

    const jwt = Cookies.get("user");

    const image = {
        Id: id,
        LinkImage: link_image,
    }

    await fetch("http://localhost:3000/user_post/imageauth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`,
        },
        body: JSON.stringify(image),
    })
        .then(res => res.json())
        .then(res => {
            if (res.Text === "Done") {
                dispatch({
                    type: "image_auth",
                    payload: res.Text
                })
            }
        })
}