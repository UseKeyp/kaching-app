import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: "Sharpie";
      src: url("/fonts/sharpie/Sharpie-Regular.woff2") format("woff2"),
        url("/fonts/sharpie/Sharpie-Regular.woff") format("woff"),
        url("/fonts/sharpie/Sharpie-Regular.ttf") format("truetype");
      font-weight: 400;
      font-display: swap;
      font-style: normal;
    }
    @font-face {
      font-family: "Sharpie";
      src: url("/fonts/sharpie/Sharpie-Extrabold.woff2") format("woff2"),
        url("/fonts/sharpie/Sharpie-Extrabold.woff") format("woff"),
        url("/fonts/sharpie/Sharpie-Extrabold.ttf") format("truetype");
      font-weight: 800;
      font-display: swap;
      font-style: normal;
    }
    @font-face {
      font-family: "Satoshi";
      src: url("/fonts/satoshi/Satoshi-Regular.woff2") format("woff2"),
        url("/fonts/sharpie/Satoshi-Regular.woff") format("woff"),
        url("/fonts/sharpie/Satoshi-Regular.ttf") format("truetype");
      font-weight: 400;
      font-display: swap;
      font-style: normal;
    }
    @font-face {
      font-family: "Satoshi";
      src: url("/fonts/satoshi/Satoshi-Medium.woff2") format("woff2"),
        url("/fonts/sharpie/Satoshi-Medium.woff") format("woff"),
        url("/fonts/sharpie/Satoshi-Medium.ttf") format("truetype");
      font-weight: 500;
      font-display: swap;
      font-style: normal;
    }
    @font-face {
      font-family: "Satoshi";
      src: url("/fonts/satoshi/Satoshi-Bold.woff2") format("woff2"),
        url("/fonts/sharpie/Satoshi-Bold.woff") format("woff"),
        url("/fonts/sharpie/Satoshi-Bold.ttf") format("truetype");
      font-weight: 700;
      font-display: swap;
      font-style: normal;
    }
    @font-face {
      font-family: "Satoshi";
      src: url("/fonts/satoshi/Satoshi-Black.woff2") format("woff2"),
        url("/fonts/sharpie/Satoshi-Black.woff") format("woff"),
        url("/fonts/sharpie/Satoshi-Black.ttf") format("truetype");
      font-weight: 900;
      font-display: swap;
      font-style: normal;
    }
  `}
  />
);

export default Fonts;
