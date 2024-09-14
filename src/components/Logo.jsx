import { Link } from "react-router-dom";
import logoSvg from '../assets/logo.svg';

export const Logo = () => {
  return (
    <Link to="/" className="mx-auto inline-block w-[160px]">
      <img src={logoSvg} alt="logo" />
      {/* <img
        src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
        alt="logo"
      /> */}
    </Link>
  )
}
