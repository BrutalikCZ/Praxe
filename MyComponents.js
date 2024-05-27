import React, { useState } from 'react';

export function LoginPane() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="pane">

      {showLogin ? <LoginForm /> : <SignupForm />}
      <div className="toggle-form">
        {showLogin ? (
          <p>
           <button onClick={() => setShowLogin(false)}>Sign Up</button>
          </p>
        ) : (
          <p>
            <button onClick={() => setShowLogin(true)}>Login</button>
          </p>
        )}
      </div>
    </div>
  );
}

export function LoginForm() {
  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="loginUsername">Username:</label>
        <input type="text" id="loginUsername" name="loginUsername" required />
      </div>
      <div className="form-group">
        <label htmlFor="loginEmail">Email:</label>
        <input type="email" id="loginEmail" name="loginEmail" required />
      </div>
      <div className="form-group">
        <label htmlFor="loginPassword">Password:</label>
        <input type="password" id="loginPassword" name="loginPassword" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export function SignupForm() {
  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="signupUsername">Username:</label>
        <input type="text" id="signupUsername" name="signupUsername" required />
      </div>
      <div className="form-group">
        <label htmlFor="signupEmail">Email:</label>
        <input type="email" id="signupEmail" name="signupEmail" required />
      </div>
      <div className="form-group">
        <label htmlFor="signupPassword">Password:</label>
        <input type="password" id="signupPassword" name="signupPassword" required />
      </div>
      <div className="form-group">
        <label htmlFor="signupConfirmPassword">Confirm Password:</label>
        <input type="password" id="signupConfirmPassword" name="signupConfirmPassword" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

function handleLogin(event) {
  event.preventDefault();
  const { loginUsername, loginEmail, loginPassword } = event.target.elements;

  // Accessing input values
  const username = loginUsername.value;
  const email = loginEmail.value;
  const password = loginPassword.value;

  // Now you can use these values as needed
}

function handleSignup(event) {
  event.preventDefault();
  const { signupUsername, signupEmail, signupPassword, signupConfirmPassword } = event.target.elements;

  // Accessing input values
  const username = signupUsername.value;
  const email = signupEmail.value;
  const password = signupPassword.value;
  const confirmPassword = signupConfirmPassword.value;

  if (password !== confirmPassword) {
    alert("Password doesn't match the confirmation password");
    return; // Abort further processing
  }

  // Continue with signup process
}