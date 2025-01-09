import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Day = ({
  colorMode,
  toggleColorMode,
  setSearchQuery,
  searchQuery,
  setCityName,
}) => {
  const [forecast, setForecast] = useState(null);
  const fetchWeek = async () => {
    const apiKey = "79c50f013bfe56f8a19f17750e56738c";
    const city = "kathmandu";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${apiKey}`
    );
    const data = await response.json();
    setForecast(data);
    setCityName(data.city.name);
    console.log(data);
  };

  useEffect(() => {
    fetchWeek();
  }, [searchQuery]);

  return (
    <>
      {forecast && (
        <Flex
          direction={{ base: "column", sm: "row", md: "row" }}
          alignItems="flex-start"
          mt={"10px"}
          width={{
            base: "100%",
            sm: "fit-content",
            md: "fit-content",
            lg: "100%",
          }}
        >
          {forecast.list
            .filter((_, index) => index % 8 === 0)
            .map((item, index) => {
              return (
                <Flex
                  borderRadius={"20px"}
                  width={{ base: "100%", sm: "100%", md: "min-content" }}
                  height={"fit-content"}
                  mb={"20px"}
                  ml={{ base: "20px", sm: "20px" }}
                  overflow={"hidden"}
                  key={index}
                  display={"flex"}
                  boxShadow={"base"}
                >
                  <Card
                    minWidth={{ base: "100%", sm: "200px" }}
                    maxHeight={"270px"}
                    borderRadius={"20px"}
                    color={colorMode === "light" ? "black" : "white"}
                  >
                    <CardHeader bg={"#accbdf"}>
                      <HStack justifyContent={"space-between"}>
                        <Heading fontSize={{ base: "md", md: "lg" }}>
                          {new Date(item.dt * 1000).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                            }
                          )}
                        </Heading>
                        <Heading
                          fontWeight={"light"}
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          Feels Like {Math.round(item.main.feels_like - 273.15)}
                          °
                        </Heading>
                      </HStack>
                    </CardHeader>
                    <CardBody bg={"#c0d4ec"}>
                      <Flex
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Heading fontSize={{ base: "xl", md: "xx-large" }}>
                          {Math.round(item.main.temp - 273.15)}°
                        </Heading>
                        <Image
                          width={"65px"}
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        />
                      </Flex>
                      <Text fontWeight={"medium"}>
                        Humidity {item.main.humidity} %
                      </Text>
                      <Text fontWeight={"medium"}>
                        Pressure {item.main.pressure}
                      </Text>
                      <Text fontWeight={"medium"}>
                        Wind {Math.round(item.wind.speed * 3.6)} km/h
                      </Text>
                      <Text fontWeight={"medium"}>
                        Wind{" "}
                        {item.weather[0].description.charAt(0).toUpperCase() +
                          item.weather[0].description.slice(1)}
                      </Text>
                    </CardBody>
                  </Card>
                </Flex>
              );
            })}
        </Flex>
      )}
    </>
  );
};

export default Day;
