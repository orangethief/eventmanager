import { baseUrl } from '../../config';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AlertBoxSuccess, AlertBoxError } from "../components/AlertBoxes";
import InputBox from '../components/InputBox';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';

const SignUpPage = () => {

  const navigate = useNavigate();
  const [alertSuccess, setAlertSuccess] = useState({show: false, message: ''});
  const [alertError, setAlertError] = useState({show: false, message: ''});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async(event) => {
    event.preventDefault();
    setAlertSuccess({ show: false, message: '' });
    setAlertError({ show: false, message: '' });
    try {
      if (confirmPassword != password) {
        setAlertError({ show: true, title: 'Error', message: 'Password must be confirmed'});
        return;
      }

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

      setAlertSuccess({ show: true, title: 'Success', message: 'Your account has been created successfully! You will be redirected to the login page.' });
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setAlertError({ show: true, title: 'Error', message: error.message || 'An unknown error occurred. Please reload the page.' });
    }
  };



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
                <InputBox type="password" placeholder="Confirm assword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ""}/>
                <div className="mb-10">
                  <Button type="button" onClick={signUp}>Register</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUpPage
