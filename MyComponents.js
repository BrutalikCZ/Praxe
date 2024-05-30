// MyComponents.js
import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

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
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    const { loginUsername, loginEmail, loginPassword } = event.target.elements;

    const username = loginUsername.value;
    const email = loginEmail.value;
    const password = loginPassword.value;

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (data.success) {
      login(data.user, data.token);
    } else {
      alert(data.message);
    }
  };

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
  const { login } = useAuth();

  const handleSignup = async (event) => {
    event.preventDefault();
    const { signupUsername, signupEmail, signupPassword, signupConfirmPassword } = event.target.elements;

    const username = signupUsername.value;
    const email = signupEmail.value;
    const password = signupPassword.value;
    const confirmPassword = signupConfirmPassword.value;

    if (password !== confirmPassword) {
      alert("Password doesn't match the confirmation password");
      return;
    }

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (data.success) {
      login(data.user, data.token);
    } else {
      alert(data.message);
    }
  };

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




export function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => setEvents(data.events))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="events-container">
      {events.map((event, index) => (
        <div key={index} className="event-card">
          <div className="event-name">Event: {event.event_name}</div>
          <div className="event-time">Date: {event.date} | Time: {event.starts} - {event.ends}</div>
        </div>
      ))}
    </div>
  );
}