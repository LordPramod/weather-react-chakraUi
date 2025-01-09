import { useColorMode } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import WeatherData from "./components/WeatherData";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <WeatherData colorMode={colorMode} toggleColorMode={toggleColorMode} />
    </>
  );
}

export default App;
