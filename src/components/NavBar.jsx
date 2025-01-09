import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Switch,
  Text,
  useDisclosure,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SunIcon } from "@chakra-ui/icons";
import { BiSolidDashboard } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import AvatarImage from "../assets/imgs/my-avatar.png";

const NavBar = ({
  colorMode,
  toggleColorMode,
  setSearchQuery,
  setTypeValue,
  typeValue,
  cityName,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const typedValue = (e) => {
    setTypeValue(e.target.value);
  };

  const handelSubmit = () => {
    setSearchQuery(typeValue);
  };

  return (
    <Box
      as="nav"
      px={4}
      py={4}
      bg={colorMode === "light" ? "gray.100" : "gray.900"}
      shadow="sm"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Toggle Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} display={{ base: "none", md: "flex" }} ml={4}>
            <BiSolidDashboard size={"28px"} />
            <IoIosNotifications size={"28px"} />
            <IoLocationSharp size={"28px"} />
            <Text fontSize={"xl"}>{cityName}</Text>
          </HStack>
        </Flex>
        <HStack
          spacing={4}
          alignItems={"center"}
          display={{ base: "none", md: "flex" }}
        >
          <Input
            type="search"
            placeholder="Search City"
            w={"500px"}
            borderRadius={"16px"}
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
            width={"80px"}
            colorScheme={colorMode === "light" ? "gray" : "teal"}
          >
            Search
          </Button>
        </HStack>

        <Flex alignItems={"center"} gap={4}>
          <Switch
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
            size={"lg"}
            colorScheme="teal"
          />
          {colorMode === "light" ? (
            <SunIcon width={"25px"} height={"25px"} />
          ) : (
            <FaMoon width={"25px"} height={"25px"} />
          )}
          <Avatar width={"60px"} src={AvatarImage} />
        </Flex>
      </Flex>
      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <VStack spacing={4} align="start">
            <HStack>
              <BiSolidDashboard size={"28px"} />
              <Text>Dashboard</Text>
            </HStack>
            <HStack>
              <IoIosNotifications size={"28px"} />
              <Text>Notifications</Text>
            </HStack>
            <HStack>
              <IoLocationSharp size={"28px"} />
              <Text>{cityName}</Text>
            </HStack>
            <Input
              type="search"
              placeholder="Search City"
              w={"full"}
              borderRadius={"16px"}
              color={colorMode === "light" ? "gray.900" : "whitesmoke"}
              fontSize={"md"}
              _placeholder={{
                color: colorMode === "light" ? "gray.900" : "gray.50",
              }}
              h={"46px"}
              onChange={typedValue}
            />
            <Button
              onClick={handelSubmit}
              width={"full"}
              colorScheme={colorMode === "light" ? "gray" : "teal"}
            >
              Search
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
