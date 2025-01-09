import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  useQuery,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-router";
import Day from "./Day";
import City from "./City";
import NavBar from "./NavBar";

const WeatherData = ({ colorMode, toggleColorMode }) => {
  const [weatherData, setWeatherData] = useState({});
  const [searchQuery, setSearchQuery] = useState("Kathmandu");
  const [typeValue, setTypeValue] = useState("");
  const [cityName, setCityName] = useState("Kathmandu");

  const weatherApi = async (cityName, apiKey) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    );
    const data = await response.json();
    console.log(data);
    setWeatherData({
      name: data.name,
      weather: data.weather[0].main,
      image: data.weather[0].icon,
      windSpeed: data.wind.speed,
      coord: {
        lon: data.coord.lon,
        lat: data.coord.lat,
      },
    });
    console.log(data.coord.lon, data.coord.lat);
    return data;
    // console.log(Object.values(data.weather));
    // console.log(data.weather[0].icon);
    // 9f241cd8968b49fcf5b429eb9d19e8d6
  };
  useEffect(() => {
    weatherApi("Kathmandu", "9f241cd8968b49fcf5b429eb9d19e8d6");
  }, []);

  // This useQuery is not returning data or isloading

  const { data, isLoading } = useQuery({
    queryKey: ["weatherData"],
    queryFn: () => weatherApi("Kathmandu", "9f241cd8968b49fcf5b429eb9d19e8d6"),
  });
  console.log(data, isLoading);
  return (
    <>
      <NavBar
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        setSearchQuery={setSearchQuery}
        setTypeValue={setTypeValue}
        typeValue={typeValue}
        searchQuery={searchQuery}
        cityName={cityName}
      />
      {/* <Card
        maxW={"400px"}
        color={"whiteAlpha.400"}
        shadow={"sm"}
        boxShadow={"2xl"}
        style={{ backgroundColor: "#1B1B1D" }}
      >
        <CardHeader fontSize={"4xl"}>{weatherData.name}</CardHeader>
        <CardBody>
          <HStack>
            <Text fontSize={"xl"}>
              Weather Currently : {weatherData.weather}
            </Text>
            <Image
              src={`https://openweathermap.org/img/wn/${weatherData.image}@2x.png`}
            />
          </HStack>
          <Box>
            <Text fontSize={"2xl"} mt={"-30px"}>
              Wind Speed : km/h
            </Text>
          </Box>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In ullam
            facere ducimus ipsum natus dolore labore hic est quibusdam
            voluptatibus, delectus quasi, dolorum qui quos libero accusamus
            molestias esse non.<
          </Text>
        </CardBody>
      </Card> */}

      <Flex>
        <Day
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
          setCityName={setCityName}
        />
      </Flex>
      <HStack
        display={"inline-flex"}
        justifyContent={"space-between"}
        mt={"20px"}
        gap={"65px"}
      >
        <Box
          borderRadius="20px"
          ml={"20px"}
          boxShadow="2xl"
          overflow="hidden"
          bg="gray.800"
          width="1100px"
        >
          <iframe
            style={
              colorMode === "light"
                ? {}
                : { border: "none", filter: "grayscale(1) invert(1)" }
            }
            width={"100%"}
            height={"400px"}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31397712412!2d85.3025764582031!3d27.668968399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19d3cf18ca51%3A0x2b7185c6e7d87a8b!2sLalitpur%2C%20Nepal!5e0!3m2!1sen!2s!4v1709799171899!5m2!1sen!2s"
          />
        </Box>
        <City colorMode={colorMode} toggleColorMode={toggleColorMode} />
      </HStack>
    </>
  );
};

export default WeatherData;
