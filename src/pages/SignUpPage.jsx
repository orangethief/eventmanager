import { baseUrl } from '../../config';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

  const navigate = useNavigate();

  const signUp = async(event) => {
    event.preventDefault();
    console.log(email, password);
    try {
        const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {"Accept" : "application/json", "Content-Type" : "application/json"}
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An unknown error occurred');

      }
      const userData = await response.json();
      console.log(userData);
      alert('Your account has been created successfully! You will be redirected to the login page.');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="w-1/3 mx-auto">
        <h1 className="text-3xl font-bold text-primary my-6">Register now!</h1>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="email" id="email" className="grow" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email || ''}/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input type="password" id="password" placeholder="Password (min. 8 characters)" className="grow" onChange={(e) => setPassword(e.target.value)} value={password || ''}  />
        </label>
        <button onClick={signUp} className="btn btn-accent my-2">Sign Up</button>
      </div>
    </>
  )
}

export default SignUpPage
