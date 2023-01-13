import React, { useRef } from "react";
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import { signUp } from "../DB";

const SignUp = () => {
  let navigate = useNavigate();
  const username = useRef("");
  const password = useRef("");
  const rePass = useRef("");
  const fullName = useRef("");

  async function handleSignUpSubmit() {
    if (password.current.value === rePass.current.value) {
      const signUpResponse = await signUp(username.current.value, password.current.value, fullName.current.value);
      if (!(signUpResponse instanceof Promise) && signUpResponse == 200) {
        localStorage.setItem('username', username.current.value)
        navigate("/blog");
      } else {
        alert("Invalid values, try again!");
      }
    }
  }

  return (
    <div className="sign-up-page">
      <SignUpForm username={username} password={password} rePass={rePass} fullName={fullName} handleSubmit={handleSignUpSubmit}></SignUpForm>
    </div>
  );
}

export default SignUp;