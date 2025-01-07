import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();
createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </ChakraProvider>
);
