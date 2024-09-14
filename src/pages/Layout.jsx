import { Navigate, Outlet, useLoaderData, useLocation, useMatch, useMatches, useRouteLoaderData } from "react-router-dom";
import Navbar from "./Navbar";
import { isAuthenticated } from "../utils/auth";

export const Layout = ({ children }) => {
  const matches = useMatches();
  const routeData = useRouteLoaderData(matches[matches.length-1].id);
  const isProtected = routeData?.isProtected || false;
  if (isProtected) {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />
    }
  }
  const anonymous = routeData?.anonymous || false;
  if (anonymous && isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <main className="container mx-auto">
        <Navbar />
        <Outlet />
      </main>
    </>
  )
}
