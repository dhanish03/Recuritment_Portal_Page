import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

// Reusable TextInput component
const TextInput = ({ type, placeholder, value, onChange }) => (
  <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
);

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    dateOfBirth: ''
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(false); // Set to false to show signup form initially
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [mobileValid, setMobileValid] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false); // New state for success
  const [storedUser, setStoredUser] = useState(null); // Store user credentials after signup

  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(formData.password);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateMobileNumber = (mobileNumber) => {
    const regex = /^\d{10}$/; // Assumes a 10-digit number format
    return regex.test(mobileNumber);
  };

  const handleLogin = () => {
    // Validate login with stored credentials
    if (storedUser) {
      const { username, password } = formData;
      if (username === storedUser.username && password === storedUser.password) {
        setLoggedIn(true);
      } else {
        alert('Invalid username or password.');
      }
    } else {
      alert('No user found. Please sign up first.');
    }
  };

  const handleSignup = () => {
    if (!validatePassword()) {
      setPasswordValid(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailValid(false);
      return;
    }

    if (!validateMobileNumber(formData.mobileNumber)) {
      setMobileValid(false);
      return;
    }

    // Store user credentials after signup
    setStoredUser({
      username: formData.username,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      password: formData.password,
      dateOfBirth: formData.dateOfBirth
    });
    setSignupSuccess(true);
    setFormData({
      username: '',
      email: '',
      mobileNumber: '',
      password: '',
      dateOfBirth: ''
    });
    // Redirect to login page after signup
    setIsLoginForm(true);
  };

  const handleChange = (fieldName, value) => {
    if (fieldName === 'password') {
      setPasswordValid(true);
    }
    if (fieldName === 'email') {
      setEmailValid(true);
    }
    if (fieldName === 'mobileNumber') {
      setMobileValid(true);
    }
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  return (
    <div className={`App ${loggedIn ? 'logged-in' : ''}`}>
      <div className="container">
        {loggedIn ? (
          <div>
            <h2>Welcome, {storedUser.username}!</h2>
            <div>
              <h3>User Profile</h3>
              <select id="userProfileSelect">
                <option value="editProfile">Edit Profile</option>
                <option value="changePassword">Change Password</option>
                <option value="logout">Logout</option>
              </select>

              <h3>Notifications</h3>
              <select id="notificationSelect">
                <option value="email">Email Notifications</option>
                <option value="push">Push Notifications</option>
                <option value="sms">SMS Notifications</option>
              </select>

              <h3>Alerts</h3>
              <select id="alertSelect">
                <option value="alert1">Alert 1</option>
                <option value="alert2">Alert 2</option>
                <option value="alert3">Alert 3</option>
              </select>
            </div>
            <button onClick={() => setLoggedIn(false)}>Logout</button>
          </div>
        ) : (
          <div>
            <h1>Recruitment Portal</h1>
            {signupSuccess && <p style={{ color: 'green' }}>Signup successful!</p>}
            {!isLoginForm ? (
              <>
                <h2>Signup</h2>
                <TextInput
                  type="text"
                  placeholder="Name"
                  value={formData.username}
                  onChange={e => handleChange('username', e.target.value)}
                />
                <br />
                <TextInput
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                />
                {!emailValid && (
                  <p style={{ color: 'red' }}>Please enter a valid email address.</p>
                )}
                <br />
                <TextInput
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={e => handleChange('mobileNumber', e.target.value)}
                />
                {!mobileValid && (
                  <p style={{ color: 'red' }}>Please enter a valid 10-digit mobile number.</p>
                )}
                <br />
                <TextInput
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={e => handleChange('password', e.target.value)}
                />
                <br />
                {!passwordValid && (
                  <p style={{ color: 'red' }}>Password must include at least one uppercase letter, one lowercase letter, one numeric digit, one special character (!@#$%^&*), and have a minimum length of 8 characters.</p>
                )}
                <br />
                <button onClick={handleSignup}>Signup</button>
                <br />
                <button onClick={() => setIsLoginForm(true)}>Switch to Login</button>
              </>
            ) : (
              <>
                <h2>Login</h2>
                <TextInput
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={e => handleChange('username', e.target.value)}
                />
                <br />
                <TextInput
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={e => handleChange('password', e.target.value)}
                />
                <br />
                <button onClick={handleLogin}>Login</button>
                <br />
                <button onClick={() => setIsLoginForm(false)}>Switch to Signup</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
