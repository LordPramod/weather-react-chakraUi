import {
  Avatar,
  Box,
  Button,
  color,
  Flex,
  Icon,
  Input,
  Spacer,
  Switch,
  Text,
} from "@chakra-ui/react";
import { BiSolidDashboard } from "react-icons/bi";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import AvatarImage from "../assets/imgs/my-avatar.png";
import { useState } from "react";
import { SunIcon } from "@chakra-ui/icons";

const NavBar = ({
  colorMode,
  toggleColorMode,
  setSearchQuery,
  setTypeValue,
  typeValue,
  searchQuery,
  cityName,
}) => {
  const typedValue = (e) => {
    setTypeValue(e.target.value);
    // console.log(e.target.value);
  };
  const handelSubmit = () => {
    setSearchQuery(typeValue);
  };
  return (
    <>
      <Box as="nav" padding={"20px"} display={"flex"}>
        <Flex gap={"32px"}>
          <BiSolidDashboard size={"28px"} />
          <IoIosNotifications size={"28px"} />
          <IoLocationSharp size={"28px"} />
          <Text fontSize={"x-large"}>{cityName}</Text>
        </Flex>
        <Box alignItems={"center"} display={"flex"} gap={"20px"}>
          <Input
            ml={"200px"}
            type="search"
            placeholder="Search City"
            w={"500px"}
            borderRadius={"16px"}
            textAlign={""}
            color={colorMode === "light" ? "gray.900" : "whitesmoke"}
            fontSize={"larger"}
            _placeholder={{
              color: colorMode === "light" ? "gray.900" : "gray.50",
            }}
            h={"46px"}
            onChange={typedValue}
          />
          <Button
            onClick={handelSubmit}
            boxShadow={"md"}
            width={"80px"}
            colorScheme={colorMode === "light" ? "gray" : "teal"}
          >
            Search
          </Button>
        </Box>
        <Spacer />
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={"20px"}
          alignItems={"center"}
        >
          <Switch
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
            color={"#d7e6f7"}
            size={"lg"}
            colorScheme="teal"
          />
          {colorMode === "light" ? (
            <SunIcon width={"25px"} height={"25px"} />
          ) : (
            <FaMoon width={"25px"} height={"25px"} />
          )}
          <Avatar width={"60px"} src={AvatarImage} />
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
