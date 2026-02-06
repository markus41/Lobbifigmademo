
  import { createRoot } from "react-dom/client";
  import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
  import App from "./app/App.tsx";
  import theme from "./app/theme.ts";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </>
  );
