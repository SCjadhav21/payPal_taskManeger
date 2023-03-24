import { Navigate } from "react-router-dom";
const Privateroute = ({ children }) => {
  let token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Privateroute;
