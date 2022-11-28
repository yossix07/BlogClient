import React, { useState } from "react";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import LogIn from "./logIn/Login";
import SignUp from "./signUp/SignUp";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.css';


const App = () => {

  const [username, setUsername] = useState("");

  const changeUsername = (user) => {
    setUsername(user);
    sessionStorage.setItem("username", user);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <LogIn setUsername={ changeUsername }/> }></Route>
          <Route path="/signup" element={ <SignUp setUsername={ changeUsername }/> }></Route>
          {/* <Route path="/blog" element={}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;