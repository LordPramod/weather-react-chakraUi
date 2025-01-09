import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const cities = ["Bhaktapur", "Kathmandu", "Lalitpur"];

const City = ({ colorMode }) => {
  const [cityDetail, setCityDetail] = useState([]);

  const weatherApi = async (cityNames, apiKey) => {
    const fetchPromises = cityNames.map((cityName) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      ).then((response) => response.json())
    );

    const results = await Promise.all(fetchPromises);
    setCityDetail(
      results.map((data) => ({
        name: data.name,
        weather: data.weather[0].main,
        image: data.weather[0].icon,
        windSpeed: data.wind.speed,
        temp: data.main.temp,
        coord: {
          lon: data.coord.lon,
          lat: data.coord.lat,
        },
        country: data.sys.country,
      }))
    );
  };

  useEffect(() => {
    weatherApi(cities, "9f241cd8968b49fcf5b429eb9d19e8d6");
  }, []);

  return (
    <Flex
      direction={{ base: "row", lg: "column" }}
      wrap="wrap"
      justifyContent={{ base: "center", lg: "flex-start" }}
      alignItems="center"
      gap="16px"
      width="100%"
    >
      {cityDetail.map((city, index) => {
        return (
          <Box
            width={{ base: "100%", sm: "48%", md: "30%", lg: "300px" }} 
            borderRadius="16px"
            overflow="hidden"
            key={index}
          >
            <Card bg={colorMode === "light" ? "gray.50" : "#1b1b1d"}>
              <CardBody color={colorMode === "light" ? "black" : "white"}>
                <HStack justifyContent="space-between">
                  <Box>
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      fontWeight="light"
                    >
                      {city.country}
                    </Text>
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      fontWeight="medium"
                    >
                      {city.name}
                    </Text>
                    <Text fontWeight="thin">{city.weather}</Text>
                  </Box>
                  <Box padding="0" margin="0" textAlign="center">
                    <Image
                      width="60px"
                      src={`https://openweathermap.org/img/wn/${city.image}@2x.png`}
                    />
                    <Text>{Math.round(city.temp - 273.15)}°</Text>
                  </Box>
                </HStack>
              </CardBody>
            </Card>
          </Box>
        );
      })}
    </Flex>
  );
};

export default City;
