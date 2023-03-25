import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Box,
  useDisclosure,
  Heading,
  Text,
  MenuItem,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { BiBorderAll } from "react-icons/bi";
import { AiFillBug } from "react-icons/ai";
import { TbBrandStorybook } from "react-icons/tb";
import { MdOutlineFeaturedVideo } from "react-icons/md";
const Task = () => {
  const [type, setType] = useState("all");
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(() => {
    axios(`http://localhost:4500/task/${type}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, [type]);

  console.log(data);

  const SearchByType = (query) => {
    setType(query);
    onClose();
  };

  return (
    <Box bg="lightblue" mt="-10px" h="100vh">
      <Box pt="10px">
        <RiArrowRightSLine
          style={{
            border: "1px solid red",
            fontSize: "40px",
            borderRadius: "50%",
            color: "#fff",
            margin: "5px",
            background: "blue",
          }}
          ref={btnRef}
          onClick={onOpen}
        />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Box
            bg="#2B6CB0"
            display={"flex"}
            justifyContent="space-between"
            p="20px 10px"
          >
            <Text fontSize={"3xl"} color={"#fff"}>
              My WorkSpace
            </Text>
            <RiArrowLeftSLine
              style={{
                border: "1px solid red",
                fontSize: "40px",
                borderRadius: "50%",
                color: "#fff",
                margin: "5px",
                background: "blue",
              }}
              onClick={onClose}
            />
          </Box>

          <DrawerBody>
            <Text p="20px" fontSize={27} fontWeight="bold">
              Task-Types
            </Text>
            <Box m="10px" display={"flex"} gap={10}>
              {" "}
              <BiBorderAll
                cursor={"pointer"}
                onClick={() => SearchByType("all")}
                fontSize={30}
              />
              <Text
                cursor={"pointer"}
                onClick={() => SearchByType("all")}
                fontSize={20}
                fontWeight="bold"
              >
                All
              </Text>
            </Box>
            <Box m="10px" display={"flex"} gap={10}>
              {" "}
              <AiFillBug
                cursor={"pointer"}
                onClick={() => SearchByType("all")}
                fontSize={30}
              />
              <Text
                cursor={"pointer"}
                onClick={() => SearchByType("bug")}
                fontSize={20}
                fontWeight="bold"
              >
                Bugs
              </Text>
            </Box>
            <Box m="10px" display={"flex"} gap={10}>
              {" "}
              <TbBrandStorybook
                cursor={"pointer"}
                onClick={() => SearchByType("story")}
                fontSize={30}
              />
              <Text
                cursor={"pointer"}
                onClick={() => SearchByType("story")}
                fontSize={20}
                fontWeight="bold"
              >
                Story
              </Text>
            </Box>
            <Box m="10px" display={"flex"} gap={10}>
              {" "}
              <MdOutlineFeaturedVideo
                cursor={"pointer"}
                onClick={() => SearchByType("feature")}
                fontSize={30}
              />
              <Text
                cursor={"pointer"}
                onClick={() => SearchByType("feature")}
                fontSize={20}
                fontWeight="bold"
              >
                Feature
              </Text>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Heading>Task Board</Heading>
      <Box display="flex" p="10px 10%">
        <Box
          w="370px"
          bgColor={"#fff"}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        >
          <Text
            align={"left"}
            p="20px"
            fontWeight={"bold"}
            fontSize="22px"
            color="#172B4D"
          >
            To Do
          </Text>
          <SimpleGrid>
            {data?.map((el) => {
              if (el.TaskStatus == "new") {
                return <Box>{el.Task}</Box>;
              }
            })}
          </SimpleGrid>
        </Box>
        <Box
          ml={20}
          w="370px"
          bgColor={"#fff"}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        >
          <Text
            align={"left"}
            p="20px"
            fontWeight={"bold"}
            fontSize="22px"
            color="#172B4D"
          >
            In Progress
          </Text>
          <SimpleGrid>
            {data?.map((el) => {
              if (el.TaskStatus == "doing") {
                return <Box>{el.Task}</Box>;
              }
            })}
          </SimpleGrid>
        </Box>
        <Box
          ml={20}
          width="370px"
          // h="100vh"
          bgColor={"#fff"}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        >
          <Text
            align={"left"}
            p="20px"
            fontWeight={"bold"}
            fontSize="22px"
            color="#172B4D"
          >
            Done
          </Text>
          <SimpleGrid>
            {data?.map((el) => {
              if (el.TaskStatus == "done") {
                return <Box>{el.Task}</Box>;
              }
            })}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Task;
