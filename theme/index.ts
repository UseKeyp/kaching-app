import { extendTheme } from "@chakra-ui/react";
import Heading from "../components/Navbar";

export const theme = extendTheme({
  components: {
    Heading,
  },
  colors: {
    pink: "#FC3BAF",
  },
  fonts: {
    Sharpie: "Sharpie",
  },
  styles: {
    global: {
      html: {
        scrollBehavior: "smooth",
      },
      body: {
        m: 0,
        p: 0,
        bg: "white",
      },
      "&::-webkit-scrollbar": {
        width: "10px",
        bg: "transparent",
        display: "none",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "red",
        borderRadius: "5px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "white",
      },
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});
