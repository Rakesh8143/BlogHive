import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { context } from "../ContexProvider";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(context);
  // console.log("ProtectedRoute LoggedIn =", LoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
