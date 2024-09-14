import { useState } from 'react'
import { baseUrl } from '../../config'
import Navbars from "../Pages/Navbar";
import { Link, redirect } from 'react-router-dom';
import { setToken } from '../utils/auth';
import InputBox from '../components/InputBox';

const SignInPage = () => {

  const logIn = async(event) => {
    event.preventDefault();

    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email: email, password:password }),
      headers: {"Accept" : "application/json", "Content-Type" : "application/json"}
    });
    const result = await response.json();
    setToken(result.token);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="py-20">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
            <div className="mb-10 text-center md:mb-16">
              <Link to="/" className="mx-auto inline-block max-w-[160px]">
                <img
                  src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
                  alt="logo"
                />
              </Link>
            </div>
            <form>
              <InputBox type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email || ''} />
              <InputBox type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
              <div className="mb-10">
                <button className='w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90' onClick={logIn}>Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignInPage
