import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import { FaUserCircle, FaRegHeart } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Dashboard from "../pages/dashboard";

import {
  Box,
  MenuItem,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Privateroute from "./privateroute";
import Task from "../pages/Task";

const Navbar = () => {
  let path = useSearchParams();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();
  let [data0, setData] = useState({
    name: "",

    email: "",
  });
  useEffect(() => {
    let token = localStorage.getItem("token");
    let userData = JSON.parse(localStorage.getItem("userData"));

    let data = userData.name.trim().split(" ");
    let bag = "";
    for (let i = 0; i < data.length; i++) {
      bag += data[i][0].toUpperCase();
    }
    setUser(bag);

    setToken(token);
  }, [path]);
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    setData({ ...data0, name: userData.name, email: userData.email });
  }, [token]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <>
      <Box
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
        {!token ? (
          <Box display="flex" gap={10}>
            <h1>
              <Link to="/login">SignIn</Link>
            </h1>
            <h1>
              <Link to="/signup">Signup</Link>
            </h1>
          </Box>
        ) : (
          <Menu>
            <MenuButton
              border={"none"}
              backgroundColor={"transparent"}
              fontWeight={"500"}
              as={IconButton}
              aria-label="Options"
              icon={
                <Text bg="orange.400" p="10px" borderRadius="50%">
                  {user}
                </Text>
              }
              variant="outline"
            />
            <MenuList
              p="0px"
              boxShadow="rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
            >
              <Box
                borderRadius="5px 5px 0% 0%"
                bgColor="#D14A8E"
                h="65px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={5}
              >
                <FaUserCircle fontSize="35px" color="#fff" />

                <Box>
                  {" "}
                  <Text color="#fff" fontWeight="bold">
                    {data0.name.toUpperCase()}
                  </Text>
                  <Text color="#fff" fontSize={13}>
                    {data0.email}
                  </Text>
                </Box>
              </Box>

              <MenuItem
                color={"black"}
                p="8px 15px 15px 15px"
                onClick={() => handleLogout()}
                fontSize="18px"
                icon={<BiLogOut />}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
      <Box>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/task"
            element={
              <Privateroute>
                <Task />
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
