// Login.jsx
import React, { useState } from "react";
import './Login.css';
import Logo from '../../Assets/Images/I_H_H_LOGO.png';
import { login } from "../../Services/Api";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await login(username, password);
      if (response.status) {
        localStorage.setItem('token', response.login.auth_key);
        localStorage.setItem('user_id', response.login.id);
        
        window.location.href = "/";
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred while logging in');
    }
  };

  return (
    <section className="LoginSection Center">
      <div className="container">
        <div className="row Center LoginRow">
          <div className="col-lg-4 card LoginCol">
            <div className="ImageContainer">
              <img src={Logo} width="80px" alt="" />
              <span className='LogoWords Center'>
                <span className='Word-1'>I</span> <span className='Word-2 SecondWord'>HONEY</span><span className='Word-3'>HERB</span>
              </span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row Center LoginWithRow">
                <div className="col-lg-10 LoginWithCol">
                  <input 
                    className="col-lg-12 form-control EmailInput" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="col-lg-10 LoginWithCol">
                  <input 
                    type="password"
                    className="col-lg-12 form-control PasswordInput"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-lg-10 LoginWithCol">
                  <button type="submit" className="btn btn-warning col-12 LoginBtn">
                    <span className="Login"> Login </span>
                  </button>
                </div>
                {error && <div className="col-lg-10 LoginWithCol text-danger">{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
