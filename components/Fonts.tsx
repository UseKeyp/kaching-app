import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: "Sharpie-Variable";
        url("fonts/sharpie/Sharpie-Variable.woff") format("woff"),
        url("fonts/sharpie/Sharpie-Variable.ttf") format("truetype");
        url("fonts/sharpie/Sharpie-Variable.otf") format("opentype");
      font-weight: 300 900;
      font-display: swap;
      font-style: normal;
    }

    @font-face {
      font-family: "Sharpie-Light";
      src: url("fonts/sharpie/Sharpie-Light.woff2") format("woff2"),
        url("fonts/sharpie/Sharpie-Light.woff") format("woff"),
        url("fonts/sharpie/Sharpie-Light.ttf") format("truetype");
        url("fonts/sharpie/Sharpie-Light.otf") format("opentype");
      font-weight: 300;
      font-display: swap;
      font-style: normal;
    }

    @font-face {
      font-family: "Sharpie-Regular";
      src: url("fonts/sharpie/Sharpie-Regular.woff2") format("woff2"),
        url("fonts/sharpie/Sharpie-Regular.woff") format("woff"),
        url("fonts/sharpie/Sharpie-Regular.ttf") format("truetype");
        url("fonts/sharpie/Sharpie-Regular.otf") format("opentype");
      font-weight: 400;
      font-display: swap;
      font-style: normal;
    }

    @font-face {
      font-family: "Sharpie-Bold";
      src: url("fonts/sharpie/Sharpie-Bold.woff2") format("woff2"),
        url("fonts/sharpie/Sharpie-Bold.woff") format("woff"),
        url("fonts/sharpie/Sharpie-Bold.ttf") format("truetype");
        url("fonts/sharpie/Sharpie-Bold.otf") format("opentype");
      font-weight: 700;
      font-display: swap;
      font-style: normal;
    }

    @font-face {
      font-family: "Sharpie-Extrabold";
      src: url("fonts/sharpie/Sharpie-Extrabold.woff2") format("woff2"),
        url("fonts/sharpie/Sharpie-Extrabold.woff") format("woff"),
        url("fonts/sharpie/Sharpie-Extrabold.ttf") format("truetype");
        url("fonts/sharpie/Sharpie-Extrabold.otf") format("opentype");
      font-weight: 800;
      font-display: swap;
      font-style: normal;
    }

    @font-face {
      font-family: "Sharpie-Black";
      src: url("fonts/sharpie/Sharpie-Black.woff2") format("woff2"),
        url("fonts/sharpie/Sharpie-Black.woff") format("woff"),
        url("fonts/sharpie/Sharpie-Black.ttf") format("truetype");
        url("fonts/sharpie/Sharpie-Black.otf") format("opentype");
      font-weight: 900;
      font-display: swap;
      font-style: normal;
    }
  `}
  />
);

export default Fonts;
