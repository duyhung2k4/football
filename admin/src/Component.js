import { Route, Routes } from "react-router-dom";
import Contract from "./components/Contract/Contract";
import Navbar from "./components/Navbar/Navbar";
import Pitch from "./components/Pitch/Pitch";


function Component() {

    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Contract/>}/>
                <Route path="/contract" element={<Contract/>}/>
                <Route path="/pitch" element={<Pitch/>} />
            </Routes>
        </>
    )
}

export default Component;