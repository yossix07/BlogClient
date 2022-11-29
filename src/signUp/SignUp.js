import React, { useRef } from "react";
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import { addUser } from "../DB";

const SignUp = ({ setUsername }) => {
  let navigate = useNavigate();
  const name = useRef("");
  const pass = useRef("");
  const rePass = useRef("");

  const handleSignUpSubmit = () => {
    console.log("handleSignUpSubmit", name.current.value, pass.current.value);

    if(pass.current.value === rePass.current.value && addUser()) {
      console.log("handleSignUpSubmit", name.current.value, pass.current.value);
      setUsername(name.current.value);
      navigate("/blog", { replace: true });
    }
  }

  
  return (
    <div className="sign-up-page">
      <SignUpForm name={name} pass={pass} rePass={rePass} handleSubmit={handleSignUpSubmit}></SignUpForm>
    </div>
  );
}

export default SignUp;