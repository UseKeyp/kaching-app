import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: "Sharpie-Variable";
      src: url("../public/fonts/Sharpie-Variable.woff2") format("woff2"),
        url("../public/fonts/Sharpie-Variable.woff") format("woff"),
        url("../public/fonts/Sharpie-Variable.ttf") format("truetype");
      font-weight: 300 900;
      font-display: swap;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: "Sharpie-Light";
      src: url("../public/fonts/Sharpie-Light.woff2") format("woff2"),
        url("../public/fonts/Sharpie-Light.woff") format("woff"),
        url("../public/fonts/Sharpie-Light.ttf") format("truetype");
      font-weight: 300;
      font-display: swap;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: "Sharpie-Regular";
      src: url("../public/fonts/Sharpie-Regular.woff2") format("woff2"),
        url("../public/fonts/Sharpie-Regular.woff") format("woff"),
        url("../public/fonts/Sharpie-Regular.ttf") format("truetype");
      font-weight: 400;
      font-display: swap;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: "Sharpie-Bold";
      src: url("../public/fonts/Sharpie-Bold.woff2") format("woff2"),
        url("../public/fonts/Sharpie-Bold.woff") format("woff"),
        url("../public/fonts/Sharpie-Bold.ttf") format("truetype");
      font-weight: 700;
      font-display: swap;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: "Sharpie-Extrabold";
      src: url("../public/fonts/Sharpie-Extrabold.woff2") format("woff2"),
        url("../public/fonts/Sharpie-Extrabold.woff") format("woff"),
        url("../public/fonts/Sharpie-Extrabold.ttf") format("truetype");
      font-weight: 800;
      font-display: swap;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: "Sharpie-Black";
      src: url("../public/fonts/Sharpie-Black.woff2") format("woff2"),
        url("../public/fonts/Sharpie-Black.woff") format("woff"),
        url("../public/fonts/Sharpie-Black.ttf") format("truetype");
      font-weight: 900;
      font-display: swap;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
  `}
  />
);

export default Fonts;
