import React, { useState } from "react";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import LogIn from "./logIn/Login";
import SignUp from "./signUp/SignUp";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.css';
import FeedPage from "./Feed/FeedPage";
import AddProjectPage from "./AddProject/AddProjectPage";


const App = () => {
  
  const [username, setUsername] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <LogIn setUsername={ setUsername }/> }></Route>
          <Route path="/signup" element={ <SignUp setUsername={ setUsername }/> }></Route>
          <Route path="/blog" element={<FeedPage username={ username }></FeedPage>}></Route>
          <Route path="/addProject" element={<AddProjectPage username={ username }></AddProjectPage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;