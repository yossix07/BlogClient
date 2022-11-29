import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import LogInForm from "./LogInForm";
import "./login.css"

const LogIn = ({ setUsername }) => {
  let navigate = useNavigate();

  const name = useRef("");
  const pass = useRef("");

  const handleSubmitLogIn = () => {
    // TODO - check if username and password exist in DB
    setUsername(name.current.value);
    navigate("/blog", { replace: true });
  }

  return (
    <div className="login-page">
      <LogInForm name={name} pass={pass} handleSubmit={handleSubmitLogIn}></LogInForm>
    </div>
  );
}

export default LogIn;