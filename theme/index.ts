import { extendTheme } from "@chakra-ui/react";
import Heading from "./components/Heading";
import Button from "./components/Button";
import Link from "./components/Link";
import Tooltip from "./components/Tooltip";

export const theme = extendTheme({
  components: {
    Heading,
    Button,
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
        height: '100%',
      },
      body: {
        position: 'relative',
        m: 0,
        p: 0,
        overflowX: "hidden",    
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: `
            radial-gradient(75.75% 62.84% at 76.03% 30.97%, #76B500 0%, #76B500 35.42%, rgba(118, 181, 0, 0) 100%), 
            radial-gradient(33.67% 62.25% at 15.49% 45.81%, #0660FF 1.77%, #0660FF 30.47%, rgba(6, 96, 255, 0) 100%),
            radial-gradient(51.09% 94.46% at 52.17% 30.85%, #FF4552 0%, #FF4552 39.06%, rgba(255, 69, 82, 0) 100%),
            radial-gradient(71.41% 118.27% at 85.14% 75.73%, #FF9F28 0%, #FF9F28 26.7%, rgba(255, 159, 40, 0) 77.57%)
            `,
          zIndex: -1,
        },
        
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: `
            radial-gradient(78.9% 68.41% at 17.27% 82.57%, #BE06FF 0%, #BE06FF 35.42%, rgba(190, 6, 255, 0) 100%), 
            radial-gradient(71.3% 61.82% at 50.04% 62.25%, #00B57F 0%, #00B57F 37.5%, rgba(0, 181, 127, 0) 100%)`,
          mixBlendMode: 'overlay',
          zIndex: -1,
          
        },
        backgroundImage: 'url("Noise.svg")',
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
      },
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
  
});
