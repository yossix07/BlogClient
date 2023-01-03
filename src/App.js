import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./logIn/Login";
import SignUp from "./signUp/SignUp";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.css';
import FeedPage from "./Feed/FeedPage";
import AddProjectPage from "./AddProject/AddProjectPage";
import UsersPage from "./UsersPage/UsersPage";
import ProjectInfoPage from "./ProjectInfoPage/ProjectInfoPage";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LogIn /> }></Route>
          <Route path='/signup' element={ <SignUp /> }></Route>
          <Route path='/blog' element={<FeedPage ></FeedPage>}></Route>
          <Route path='/addProject' element={<AddProjectPage ></AddProjectPage>}></Route>
          <Route path='/projectInfo' element={<ProjectInfoPage></ProjectInfoPage>}></Route>
          <Route path='/users' element={<UsersPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;