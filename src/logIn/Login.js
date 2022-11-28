import React, { useState, useRef } from "react";
import LogInForm from "./LogInForm";
// import $ from "jquery"
// import LogInFailed from "./LogInFailure";
import { useNavigate } from "react-router-dom";
import "./login.css"


const LogIn = ({ setUsername, setToken }) => {
  const [isOpen, setIsOpen] = useState(false);

  const name = useRef("");
  const pass = useRef("");

  // const showModal = () => {
  //   setIsOpen(true);
  // };
  // const hideModal = () => {
  //   setIsOpen(false);
  // };



  // let navigate = useNavigate();

  // $(document).ready(function () {
  //   $("#logInForm").unbind().on("submit", async function (event) {
  //     event.preventDefault();
  //     var token = await LogInAsync(name?.current?.value, pass?.current?.value);
  //     if(token != -1) {
  //       setUsername(name?.current?.value);
  //       setToken(token);
  //       navigate("/chat", { replace: true });
  //     } else {
  //       showModal();
  //     }

  //   });
  // });

  return (
    <div className="login-page">
      <LogInForm name={ name } pass={ pass }></LogInForm>
    </div>
  );
}

export default LogIn;