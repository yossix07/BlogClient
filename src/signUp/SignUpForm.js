import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./signUpForm.css";

const SignUpForm = ({ username, password, rePass, fullName, handleSubmit }) => {
  return (
    <Card>
      <Card.Body>
        <div className="sign-up-form">
          <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
          <h6>Please Fill Your Info!</h6>
          <br></br>

          <div id="signUpForm" noValidate>
            <div className="form-floating form-white text-dark mb-4">
              <input ref={username} id="SignUpUsername" type="text" placeholder="Enter Username" className="form-control" autoFocus />
              <label htmlFor="SignUpUsername" className="form-label">Username</label>
            </div>

            <div className="form-floating form-white text-dark mb-4">
              <input ref={password} id="SignUpPassword" type="password" placeholder="Enter Password" className="form-control" />
              <label htmlFor="SignUpPassword" className="form-label">Password</label>
            </div>

            <div className="form-floating form-white text-dark mb-4">
              <input ref={rePass} id="SignUpRePassword" type="password" placeholder="Re-Enter Password" className="form-control" />
              <label htmlFor="SignUpRePassword" className="form-label">Verify Password</label>
            </div>

            <div className="form-floating form-white text-dark mb-4">
              <input ref={fullName} id="SignUpFullName" type="text" placeholder="Enter Name" className="form-control" />
              <label htmlFor="SignUpFullName" className="form-label">Name</label>
            </div>

            <div className="button-wrapper">
              <Button id="signUpButton" variant="primary" type="submit" onClick={handleSubmit}>Sign-Up</Button>
            </div>

          </div>
          <br></br>
          <div className="login-wrapper">
            <span className="mb-0">Already Signed? &nbsp;</span>
            <Link to="/" className="fw-bold">Log-In</Link>
          </div>

        </div>
      </Card.Body>
    </Card>

  );
}

export default SignUpForm;