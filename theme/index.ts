import { extendTheme } from "@chakra-ui/react";
import Heading from "./components/Heading";
import Button from "./components/Button";
import Input from "./components/Input";

export const theme = extendTheme({
  components: {
    Heading,
    Button,
    Input,
  },
  colors: {
    pink: "#F5287E",
    discordBlue: "#4E65F3",
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
      a: {
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});
