import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";

import { Box } from "@chakra-ui/react";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Privateroute from "./privateroute";
const Navbar = () => {
  return (
    <>
      <Box
        h="50px"
        display="flex"
        justifyItems="center"
        alignItems="center"
        fontWeight="bold"
        justifyContent="space-evenly"
      >
        <h1>
          <Link to="/">Dashboard</Link>
        </h1>
        <h1>
          <Link to="/login">SignIn</Link>
        </h1>
        <h1>
          <Link to="/signup">Signup</Link>
        </h1>
      </Box>
      <Box>
        <Routes>
          <Route
            path="/"
            element={
              <Privateroute>
                <Dashboard />
              </Privateroute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Box>
    </>
  );
};

export default Navbar;
