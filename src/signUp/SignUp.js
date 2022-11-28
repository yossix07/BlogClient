import React from "react";
import SignUpForm from "./SignUpForm";
import "./signUp.css";

const SignUp = ({ setUsername, setToken }) => {

  return (
    <div className="sign-up-page">
      <SignUpForm></SignUpForm>
    </div>
  );
}

export default SignUp;