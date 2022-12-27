import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./loginForm.css";

const LogInForm = ({ name, pass, handleSubmit }) => {
  return (
    <Card>
      <Card.Body>
        <h2 className="fw-bold mb-2 text-uppercase">Log-In</h2>
        <h6>Please Fill Your Info!</h6>
        <br></br>
        <div className="login-form">
          <form id="logInForm">
            <div className="form-floating form-white text-dark mb-4">
              <input type="text" ref={name} className="form-control" id="floatingInput" placeholder="Username" required autoFocus />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating form-white text-dark mb-4">
              <input type="password" ref={pass} className="form-control" id="floatingPassword" placeholder="Password" required />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="button-wrapper">
              <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
            </div>
          </form>

          <div className="sign-up-wrapper">
            <div>Don't have an account?</div>
            <Link to="/signup" className="fw-bold">Sign Up</Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LogInForm;