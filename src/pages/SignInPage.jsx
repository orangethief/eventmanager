import { useState } from 'react'
import { baseUrl } from '../../config'
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';
import { AlertBoxSuccess, AlertBoxError } from "../components/AlertBoxes";
import InputBox from '../components/InputBox';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';

const SignInPage = () => {
  const navigate = useNavigate();
  const [alertSuccess, setAlertSuccess] = useState({show: false, message: ''});
  const [alertError, setAlertError] = useState({show: false, message: ''});

  const logIn = async(event) => {
    event.preventDefault();
    setAlertSuccess({ show: false, message: '' });
    setAlertError({ show: false, message: '' });

    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email: email, password:password }),
      headers: {"Accept" : "application/json", "Content-Type" : "application/json"}
    });
    const result = await response.json();
    if (!response.ok) {
      setAlertError({ show: true, title: 'Error', message: result.error || 'An unknown error occurred. Please reload the page.'});

      return;
    }
    setToken(result.token);

    setAlertSuccess({ show: true, title: 'Success', message: 'You have been successfully logged in! You will be redirected to the homepage shortly.' });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {alertSuccess.show && <AlertBoxSuccess message={alertSuccess.message}  /> }
      {alertError.show && <AlertBoxError message={alertError.message}  /> }
      <section className="py-20">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <Logo />
              </div>
              <form>
                <InputBox type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email || ''} />
                <InputBox type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
                <div className="mb-10">
                  <Button type="button" onClick={logIn}>Login</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignInPage
