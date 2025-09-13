import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { context } from "../ContexProvider";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useContext(context);
  // console.log("PublicRoute LoggedIn =", LoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
