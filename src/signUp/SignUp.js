import React, { useRef } from "react";
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import { signUp } from "../DB";

const SignUp = ({ setUsername }) => {
  let navigate = useNavigate();
  const username = useRef("");
  const password = useRef("");
  const rePass = useRef("");
  const fullName = useRef("");

  async function handleSignUpSubmit() {
    console.log("handleSignUpSubmit", username.current.value, password.current.value);
    const signUpResponse = await signUp(username.current.value, password.current.value, fullName.current.value);
    if(password.current.value === rePass.current.value && !(signUpResponse instanceof Promise) && signUpResponse) {
      console.log("handleSignUpSubmit", username.current.value, password.current.value);
      setUsername(username.current.value);
      navigate("/blog", { replace: true });
    }
  }

  
  return (
    <div className="sign-up-page">
      <SignUpForm username={username} password={password} rePass={rePass} fullName={fullName} handleSubmit={handleSignUpSubmit}></SignUpForm>
    </div>
  );
}

export default SignUp;