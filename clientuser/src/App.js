import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

import Login from './components/Login/Login';
import SignIn from './components/SignIn/SignIn';
import Contract from './components/Contract/Contract';
import { Component } from './Component';
import Cookies from 'js-cookie';
import ContractId from './components/ContractId/ContractId';

function App() {

  const jwt = Cookies.get("user");
  const navigate = useNavigate();

  useEffect(() => {
    if(jwt === undefined) {
      navigate("/login");
    }
  }, [])

  return (
    <>
      <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signin" element={<SignIn />}/>
          <Route path="/*" element={<Component/>}/>
          {jwt && <Route path="/contract" element={<Contract/>} />}
          {jwt && <Route path="/contract/:id" element={<ContractId/>} />}
      </Routes>
    </>
  );
}

export default App;
