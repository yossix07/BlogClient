import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import LogInForm from "./LogInForm";
import { logIn } from "../DB";
import "./login.css";

const LogIn = () => {
  let navigate = useNavigate();
  const name = useRef("");
  const pass = useRef("");

  async function handleSubmitLogIn() {
    const loginResponse = await logIn(name.current.value, pass.current.value);

      if(!(loginResponse instanceof Promise) && loginResponse === 200) {
        localStorage.setItem('username', name.current.value);
        navigate('/blog');
        //window.location.replace('http://localhost:3000/blog');

      }
    };

  return (
    <div className="login-page">
      <LogInForm name={name} pass={pass} handleSubmit={handleSubmitLogIn}></LogInForm>
    </div>
  );
}

export default LogIn;