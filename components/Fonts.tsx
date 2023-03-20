import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: "Sharpie-Variable";
      src: url("fonts/sharpie/Sharpie-Variable.woff") format("woff");
      font-weight: 300 900;
      font-display: swap;
      font-style: normal;
    }

    @font-face {
      font-family: "Sharpie-Light";
      src: url("fonts/sharpie/Sharpie-Light.woff");
      font-weight: 300;
      font-display: swap;
      font-style: normal;
    }

    @font-face {
      font-family: "Sharpie-Regular";
      src: url("fonts/sharpie/Sharpie-Regular.woff");
      font-weight: 400;
      font-display: swap;
      font-style: normal;
    }

    @font-face {
      font-family: "Sharpie-Bold";
      src: url("fonts/sharpie/Sharpie-Bold.woff");
      font-weight: 700;
      font-display: swap;
      font-style: normal;
    }

    @font-face {
      font-family: "Sharpie-Extrabold";
      src: url("fonts/sharpie/Sharpie-Extrabold.woff");
      font-weight: 800;
      font-display: swap;
      font-style: normal;
    }

    @font-face {
      font-family: "Sharpie-Black";
      src: url("fonts/sharpie/Sharpie-Black.woff");
      font-weight: 900;
      font-display: swap;
      font-style: normal;
    }
  `}
  />
);

export default Fonts;
