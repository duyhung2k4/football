import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/Navbar";
import Home from "./components/Home/Home";
import MyContract from "./components/MyContract/MyContract";
import Cookies from "js-cookie";

export function Component() {

    const jwt = Cookies.get("user");

    return (
        <div>
            <NavBar></NavBar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                {jwt && <Route path="/mycontract/*" element={<MyContract/>} />}
            </Routes>
        </div>
    )
}