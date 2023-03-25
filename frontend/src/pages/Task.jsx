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
  Center,
  Select,
  Menu,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  RiArrowRightSLine,
  RiDeleteBinLine,
  RiArrowLeftSLine,
  RiTodoLine,
} from "react-icons/ri";
import { BiBorderAll } from "react-icons/bi";
import { AiFillBug } from "react-icons/ai";
import { TbBrandStorybook } from "react-icons/tb";
import { MdOutlineFeaturedVideo } from "react-icons/md";
import { GrEdit, GrAdd } from "react-icons/gr";
import { FaExchangeAlt } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { BsCheckCircleFill } from "react-icons/bs";

const Task = () => {
  const [type, setType] = useState("all");
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [render, setRender] = useState(false);
  useEffect(() => {
    axios(`https://plum-grumpy-bluefish.cyclic.app/task/${type}`, {
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
  }, [type, render]);

  const SearchByType = (query) => {
    setType(query);
    onClose();
  };

  const handelTaskChange = (id) => {
    let promt = prompt("Please enter changed Task", "");
    if (promt !== null && promt !== "") {
      axios(`https://plum-grumpy-bluefish.cyclic.app/task/${id}`, {
        method: "PATCH",
        data: { Task: promt },
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          setRender(!render);
        })
        .catch((err) => console.error(err));
    }
  };
  const handelChangeStatus = (id, status) => {
    axios(`https://plum-grumpy-bluefish.cyclic.app/task/${id}`, {
      method: "PATCH",
      data: { TaskStatus: status },
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setRender(!render);
      })
      .catch((err) => console.error(err));
  };

  const handelAddTask = (status) => {
    let promt = prompt("Please enter new Task", "");

    if (promt !== null && promt !== "") {
      axios(`https://plum-grumpy-bluefish.cyclic.app/task`, {
        method: "POST",
        data: {
          TaskStatus: status,
          TaskType: type,
          Task: promt,
          Start_Date: Date.now(),
        },
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          setRender(!render);
        })
        .catch((err) => console.error(err));
    }
  };

  const handelDelete = (id) => {
    axios(`https://plum-grumpy-bluefish.cyclic.app/task/${id}`, {
      method: "DELETE",

      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setRender(!render);
      })
      .catch((err) => console.error(err));
  };

  const getColor = (q) => {
    if (q == "bug") {
      return "#F79B76";
    } else if (q == "story") {
      return "#F4CBF6";
    } else {
      return "#8BE68D";
    }
  };

  const openModel = () => {};

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
          <SimpleGrid gap={2} p="5px">
            {data?.map((el) => {
              if (el.TaskStatus == "new") {
                return (
                  <Box
                    bgColor={getColor(el.TaskType)}
                    p="5px"
                    boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                  >
                    <Box
                      display={"flex"}
                      p="5px"
                      justifyItems="center"
                      justifyContent={"space-between"}
                    >
                      <Text fontSize="22px" align={"left"}>
                        {el.Task}
                      </Text>
                      <Center>
                        <GrEdit onClick={() => handelTaskChange(el._id)} />
                      </Center>
                    </Box>
                    <Box
                      display={"flex"}
                      p="5px"
                      justifyItems="center"
                      justifyContent={"space-between"}
                    >
                      <Menu>
                        <MenuButton>
                          <FaExchangeAlt />
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() => handelChangeStatus(el._id, "doing")}
                            aria-label="Options"
                            icon={<GiProgression />}
                            variant="outline"
                          >
                            In Progress
                          </MenuItem>
                          <MenuItem
                            onClick={() => handelChangeStatus(el._id, "done")}
                            aria-label="Options"
                            icon={<BsCheckCircleFill />}
                            variant="outline"
                          >
                            Done
                          </MenuItem>
                        </MenuList>
                      </Menu>

                      <RiDeleteBinLine onClick={() => handelDelete(el._id)} />
                    </Box>
                  </Box>
                );
              }
            })}
          </SimpleGrid>
          <Box
            display={"flex"}
            as={Button}
            ml="5px"
            p="5px 10px"
            justifyItems="center"
            justifyContent={"space-between"}
            onClick={() => handelAddTask("new")}
            gap={3}
          >
            <GrAdd />
            <Text>Add Card</Text>
          </Box>
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
          <SimpleGrid gap={2} p="5px">
            {data?.map((el) => {
              if (el.TaskStatus == "doing") {
                return (
                  <Box
                    bgColor={getColor(el.TaskType)}
                    p="5px"
                    boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                  >
                    <Box
                      display={"flex"}
                      p="5px"
                      justifyItems="center"
                      justifyContent={"space-between"}
                    >
                      <Text fontSize="22px" align={"left"}>
                        {el.Task}
                      </Text>
                      <Center>
                        <GrEdit onClick={() => handelTaskChange(el._id)} />
                      </Center>
                    </Box>
                    <Box
                      display={"flex"}
                      p="5px"
                      justifyItems="center"
                      justifyContent={"space-between"}
                    >
                      <Menu>
                        <MenuButton>
                          <FaExchangeAlt />
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() => handelChangeStatus(el._id, "new")}
                            aria-label="Options"
                            icon={<RiTodoLine />}
                            variant="outline"
                          >
                            To Do
                          </MenuItem>
                          <MenuItem
                            onClick={() => handelChangeStatus(el._id, "done")}
                            aria-label="Options"
                            icon={<BsCheckCircleFill />}
                            variant="outline"
                          >
                            Done
                          </MenuItem>
                        </MenuList>
                      </Menu>

                      <RiDeleteBinLine onClick={() => handelDelete(el._id)} />
                    </Box>
                  </Box>
                );
              }
            })}
          </SimpleGrid>
          <Box
            display={"flex"}
            as={Button}
            ml="5px"
            p="5px 10px"
            justifyItems="center"
            justifyContent={"space-between"}
            onClick={() => handelAddTask("doing")}
            gap={3}
          >
            <GrAdd />
            <Text>Add Card</Text>
          </Box>
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
          <SimpleGrid gap={2} p="5px">
            {data?.map((el) => {
              if (el.TaskStatus == "done") {
                return (
                  <Box
                    bgColor={getColor(el.TaskType)}
                    p="5px"
                    boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                  >
                    <Box
                      display={"flex"}
                      p="5px"
                      justifyItems="center"
                      justifyContent={"space-between"}
                    >
                      <Text fontSize="22px" align={"left"}>
                        {el.Task}
                      </Text>
                      <Center>
                        <GrEdit onClick={() => handelTaskChange(el._id)} />
                      </Center>
                    </Box>
                    <Box
                      display={"flex"}
                      p="5px"
                      justifyItems="center"
                      justifyContent={"space-between"}
                    >
                      <Menu>
                        <MenuButton>
                          <FaExchangeAlt />
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() => handelChangeStatus(el._id, "new")}
                            aria-label="Options"
                            icon={<RiTodoLine />}
                            variant="outline"
                          >
                            To Do
                          </MenuItem>
                          <MenuItem
                            onClick={() => handelChangeStatus(el._id, "doing")}
                            aria-label="Options"
                            icon={<GiProgression />}
                            variant="outline"
                          >
                            In Progress
                          </MenuItem>
                        </MenuList>
                      </Menu>

                      <RiDeleteBinLine onClick={() => handelDelete(el._id)} />
                    </Box>
                  </Box>
                );
              }
            })}
          </SimpleGrid>
          <Box
            display={"flex"}
            as={Button}
            ml="5px"
            p="5px 10px"
            justifyItems="center"
            justifyContent={"space-between"}
            onClick={() => handelAddTask("done")}
            gap={3}
          >
            <GrAdd />
            <Text>Add Card</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Task;
