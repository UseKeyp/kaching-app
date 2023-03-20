import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: "Sharpie;
        url("fonts/sharpie/Sharpie-Variable.woff") format("woff"),
        url("fonts/sharpie/Sharpie-Variable.ttf") format("truetype");
        url("fonts/sharpie/Sharpie-Variable.otf") format("opentype");
      font-weight: 300 900;
      font-display: swap;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: "Sharpi";
      src: url("fonts/sharpie/Sharpie-Light.woff2") format("woff2"),
        url("fonts/sharpie/Sharpie-Light.woff") format("woff"),
        url("fonts/sharpie/Sharpie-Light.ttf") format("truetype");
        url("fonts/sharpie/Sharpie-Light.otf") format("opentype");
      font-weight: 300;
      font-display: swap;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: "Sharpie";
      src: url("fonts/sharpie/Sharpie-Regular.woff2") format("woff2"),
        url("fonts/sharpie/Sharpie-Regular.woff") format("woff"),
        url("fonts/sharpie/Sharpie-Regular.ttf") format("truetype");
        url("fonts/sharpie/Sharpie-Regular.otf") format("opentype");
      font-weight: 400;
      font-display: swap;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: "Sharpie";
      src: url("fonts/sharpie/Sharpie-Bold.woff2") format("woff2"),
        url("fonts/sharpie/Sharpie-Bold.woff") format("woff"),
        url("fonts/sharpie/Sharpie-Bold.ttf") format("truetype");
        url("fonts/sharpie/Sharpie-Bold.otf") format("opentype");
      font-weight: 700;
      font-display: swap;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: "Sharpie";
      src: url("fonts/sharpie/Sharpie-Extrabold.woff2") format("woff2"),
        url("fonts/sharpie/Sharpie-Extrabold.woff") format("woff"),
        url("fonts/sharpie/Sharpie-Extrabold.ttf") format("truetype");
        url("fonts/sharpie/Sharpie-Extrabold.otf") format("opentype");
      font-weight: 800;
      font-display: swap;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: "Sharpie";
      src: url("fonts/sharpie/Sharpie-Black.woff2") format("woff2"),
        url("fonts/sharpie/Sharpie-Black.woff") format("woff"),
        url("fonts/sharpie/Sharpie-Black.ttf") format("truetype");
        url("fonts/sharpie/Sharpie-Black.otf") format("opentype");
      font-weight: 900;
      font-display: swap;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
  `}
  />
);

export default Fonts;
