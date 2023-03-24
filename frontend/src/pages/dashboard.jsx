import { Box, Button, Heading, Image, Img } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const handelClick = () => {
    let token = localStorage.getItem("token");
    if (!token) {
      alert("please Login first");
      navigate("/login");
    } else {
      navigate("/task");
    }
  };

  return (
    <Box
      h={["full", "full", "100vh"]}
      bgGradient={[
        "linear(to-tr, teal.300, yellow.400)",
        "linear(to-t, blue.200, teal.500)",
        "linear(to-b, orange.100, purple.300)",
      ]}
      display={"flex"}
      alignItems="center"
      flexDir={["column", "column", "row"]}
    >
      <Box w="50%" padding="10%">
        {" "}
        <Heading>
          Task Manager allows administrators to terminate applications and
          processes, adjust processing priorities and set processor affinity as
          needed for best performance
        </Heading>
        <Button
          onClick={handelClick}
          w="70%"
          bgGradient="linear(to-r, green.200, pink.500)"
          color={"#fff"}
          mt="30px"
          fontWeight={"bold"}
          fontSize="20px"
          h="60px"
        >
          Set Up Tasks
        </Button>
      </Box>
      <Box w="50%">
        <Img
          mt="9%"
          src="https://images.ctfassets.net/rz1oowkt5gyp/3ZjLCD2fANfXYSN3ar9WpE/dc84a408c6a3ee89bee4a646ff6d5966/Lists_2x.png"
        ></Img>
      </Box>
    </Box>
  );
}

export default Dashboard;
