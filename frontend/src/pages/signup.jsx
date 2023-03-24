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
const Signup = () => {
  const toast = useToast();
  const [nav, setNav] = useState(false);
  let [user, setUser] = useState({
    Full_Name: "",
    Email: "",
    Password: "",
  });
  const handelSubmit = (e) => {
    e.preventDefault();
    const { Full_Name, Email, Password } = user;

    axios
      .post("http://localhost:4500/signup", {
        Full_Name,
        Email,
        Password,
      })

      .then((res) => {
        if (res.data == "email is already registered") {
          toast({
            title: "email is already registered.",
            description: "Create account with new email address",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Account Created",
            description: "We've created account for you.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setNav(true);
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
    return <Navigate to="/login" />;
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
        src="https://img.freepik.com/free-vector/task-management-abstract-concept-illustration_335657-2127.jpg"
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
            <FormLabel>Full Name</FormLabel>
            <Input
              onChange={handelChange}
              value={user.Full_Name}
              required
              type="text"
              name="Full_Name"
              placeholder="Enter full name"
            />
          </FormControl>
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
            Sign Up
          </Button>
          <a
            style={{ textDecoration: "underline", color: "blue" }}
            href="/login"
          >
            Alredy have an acount? Log In.
          </a>
        </Box>
      </form>
      <Img
        alignSelf={"end"}
        w="25%"
        borderRadius="25% 25% 0px 0px"
        src="https://img.freepik.com/premium-vector/task-manager-vector-illustration-effective-time-management_427922-186.jpg?w=2000"
      ></Img>
    </Box>
  );
};

export default Signup;
