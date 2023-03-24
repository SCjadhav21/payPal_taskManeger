import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";

import { Box, Heading, Text } from "@chakra-ui/react";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Privateroute from "./privateroute";
const Navbar = () => {
  return (
    <>
      <Box
        // h="50px"
        display="flex"
        justifyItems="center"
        alignItems="center"
        fontWeight="bold"
        justifyContent="space-between"
        p="10px 40px 10px 40px"
        color={"#fff"}
        bgGradient="linear(to-r, green.200, pink.500)"
      >
        <Box>
          {" "}
          <Text
            color="black"
            bgClip="text"
            p="5px"
            fontSize="3xl"
            fontWeight="bold"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
          >
            <Link to="/">TaskManeger</Link>
          </Text>
        </Box>
        <Box display="flex" gap={10}>
          <h1>
            <Link to="/login">SignIn</Link>
          </h1>
          <h1>
            <Link to="/signup">Signup</Link>
          </h1>
        </Box>
      </Box>
      <Box>
        <Routes>
          <Route
            path="/"
            element={
              // <Privateroute>
              <Dashboard />
              // </Privateroute>
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
