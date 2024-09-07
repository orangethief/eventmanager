import { useState } from 'react'
import { baseUrl } from '../../config'
import Navbars from "../Pages/Navbar";

const SignInPage = () => {

  const logIn = async(event) => {
    event.preventDefault();
    console.log(email, password);

    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email: email, password:password }),
      headers: {"Accept" : "application/json", "Content-Type" : "application/json"}
      // ...
    });
    console.log(await response.json());

   }

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  return (
    <div>
      <Navbars></Navbars>
      <form>
        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email || ""}/>
        <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
        <button onClick={logIn}>Log In</button>
      </form>
    </div>

  )
}

export default SignInPage