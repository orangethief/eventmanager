import { Link } from "react-router-dom"

export const Logo = () => {
  return (
    <Link to="/" className="mx-auto inline-block max-w-[160px]">
      <img
        src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
        alt="logo"
      />
    </Link>
  )
}
