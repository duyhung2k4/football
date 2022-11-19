import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login/Login';
import ContractId from './components/ContractId/ContractId';
import Component from './Component';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import AddPitch from './components/AddPitch/AddPitch';
import PitchId from './components/PitchId/PitchId';

function App() {

  const jwt = Cookies.get("admin");
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt === undefined) {
      navigate("/login");
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        {jwt && <Route path="/addpitch" element={<AddPitch/>} />}
        {jwt && <Route path="/contract/:id" element={<ContractId />} />}
        {jwt && <Route path="/pitch/:id" element={<PitchId/>} />}
        {jwt && <Route path="/*" element={<Component />} />}
      </Routes>
    </>
  );
}

export default App;
