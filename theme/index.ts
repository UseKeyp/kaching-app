import { extendTheme } from "@chakra-ui/react";
import Heading from "./components/Heading";
import Button from "./components/Button";
import Input from "./components/Input";
import Link from "./components/Link";
import Tooltip from "./components/Tooltip";
import sharpie from "../components/layout";

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
    discordBlue: "#5865F2",
    googleBlue: "#4285F4",
    formGreen: "#5DBA14",
    formBlueDark: "#1499DA",
    formLightBlue: "#89DCFF",
    socialIconsGray: "#C5C8CC",
    socialIconsGrayBorder: "#E9EBED",
    socialIconsDarkGrayBg: "#4A4D53",
    cancelOrange: "#FFB489",
    assetOrange: "#F4AB00",
    errorOrange: "#FF8643",
    errorEmailRed: "#E45200",
    lightGray: "#B0B6C1",
    loginGray: "#63676F",
    loginBtnGray: "#80858E",
  },
  fonts: {
    heading: `"Sharpie", sans-serif`,
    body: `"Sharpie", sans-serif`,
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
        overflowX: "hidden",
      },
    },
  },
});
