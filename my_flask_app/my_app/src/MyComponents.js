import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
    const { loginUsername, loginPassword } = event.target.elements;

    const username = loginUsername.value;
    const password = loginPassword.value;

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
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
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const eventData = await response.json();
        setEvents(eventData.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-container">
    {events.map((event, index) => (
      <Link key={index} to={`/events/${event.id}`}>
      <div className="event-card">
      <div className="event-name">Event: {event.event_name}</div>
      <div className="event-time">
      Date: {event.date} | Time: {event.starts} - {event.ends}
      </div>
      </div>
      </Link>
    ))}
    </div>
  );
}

export function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const eventData = await response.json();
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details-container">
    <h2>{event.event_name}</h2>
    <p><strong>Owner:</strong> {event.owner.username} ({event.owner.mail})</p>
    <p><strong>Date:</strong> {event.date}</p>
    <p><strong>Time:</strong> {event.starts} - {event.ends}</p>
    <p><strong>Location:</strong> {event.location}</p>
    <p><strong>Description:</strong> {event.description}</p>
    <h3>Attendees:</h3>
    <ul>
    {event.users.map((attendee, index) => (
      <li key={index}>{attendee.username} ({attendee.mail})</li>
    ))}
    </ul>
    </div>
  );
}
