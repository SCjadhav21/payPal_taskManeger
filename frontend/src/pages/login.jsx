import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Img,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const toast = useToast();
  const [nav, setNav] = useState(false);
  let [user, setUser] = useState({
    Email: "",
    Password: "",
  });
  const handelSubmit = (e) => {
    e.preventDefault();
    const { Email, Password } = user;

    axios
      .post("https://plum-grumpy-bluefish.cyclic.app/login", {
        Email,
        Password,
      })

      .then((res) => {
        if (res.data) {
          if (res.data.res == "Login Successfull") {
            toast({
              title: res.data.res,
              description: "logged in",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userData", JSON.stringify(res.data.data));
            setNav(true);
          } else {
            toast({
              title: res.data,
              description: "not able to login",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        }
      })
      .catch((err) =>
        toast({
          title: "Error to create account",
          description: "err",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      );
  };
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  if (nav) {
    return <Navigate to="/" />;
  }
  return (
    <Box
      bgColor="#D2FBFD"
      height={"100vh"}
      display={"flex"}
      justifyContent="space-evenly"
    >
      <Img
        borderRadius="25% 25% 0px 0px"
        alignSelf={"self-end"}
        w="25%"
        src="https://thumbs.dreamstime.com/b/print-216977617.jpg"
      ></Img>
      <form
        style={{ width: "40%", marginTop: "70px" }}
        action=""
        onSubmit={handelSubmit}
      >
        <Box
          borderRadius="20px"
          bgColor={"#fff"}
          m={10}
          p={8}
          display={"flex"}
          boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
          flexDir="column"
          gap={6}
        >
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              onChange={handelChange}
              value={user.Email}
              required
              type="email"
              name="Email"
              placeholder="Email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              required
              onChange={handelChange}
              value={user.Password}
              type="password"
              name="Password"
              placeholder="Enter Password"
            />
          </FormControl>

          <Button bgColor={"#0065FF"} color="#fff" type="submit">
            Log In
          </Button>
          <a
            style={{ textDecoration: "underline", color: "blue" }}
            href="/signup"
          >
            Not have an acount? Sign Up.
          </a>
        </Box>
      </form>
      <Img
        alignSelf={"end"}
        w="25%"
        borderRadius="25% 25% 0px 0px"
        src="https://img.freepik.com/premium-vector/task-manager-vector-illustration-effective-time-management_427922-187.jpg"
      ></Img>
    </Box>
  );
};

export default Login;
