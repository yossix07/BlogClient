import React, { useState } from "react";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import LogIn from "./logIn/Login";
import SignUp from "./signUp/SignUp";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.css';
import FeedPage from "./Feed/FeedPage";


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
          <Route path="/blog" element={<FeedPage></FeedPage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;