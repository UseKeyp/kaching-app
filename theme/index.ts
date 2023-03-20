import { extendTheme } from "@chakra-ui/react";
import Heading from "./components/Heading";
import Button from "./components/Button";
import Input from "./components/Input";
import Link from "./components/Link";
import Tooltip from "./components/Tooltip";

export const theme = extendTheme({
  components: {
    Heading,
    Button,
    Input,
    Link,
    Tooltip,
  },
  colors: {
    pink: "#F5287E",
    discordBlue: "#4E65F3",
    formGreen: "#5DBA14",
    formBlueDark: "#1499DA",
    formLightBlue: "#89DCFF",
    socialIconsGray: "#C5C8CC",
    cancelOrange: "#FFB489",
    assetOrange: "#F4AB00",
    lightGray: "#B0B6C1",
    loginGray: "#63676F",
    loginBtnGray: "#80858E",
  },
  fonts: {
    heading: `"sharpie", "Sharpie", sans-serif`,
    body: `"sharpie", "Sharpie", sans-serif`,
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
    },
  },
  // config: {
  //   initialColorMode: "light",
  //   useSystemColorMode: false,
  // },
});
