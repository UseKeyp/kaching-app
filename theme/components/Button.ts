import { defineStyleConfig, StyleFunctionProps } from "@chakra-ui/react";

const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "lg",
    fontSize: "80px",
    _active: {
      transform: "translateY(2px)",
      bgColor: "#fafafa",
      // boxShadow: `6px 6px 0px 0px ${props.shadowColor || "socialIconsGray"}`,
    },
  },

  sizes: {
    sm: {
      fontSize: "sm",
      px: 4,
      py: 3,
    },
    md: {
      fontSize: "md",
      px: 6,
      py: 4,
    },
  },
  variants: {
    formGray: (props: StyleFunctionProps) => ({
      border: "1px",
      boxShadow: "4px 4px 0px 0px #B0B6C1, 5px 5px 0px 1px #80858E",
      fontSize: "80px",
      color: "socialIconsGray",
      my: "1rem",
      w: "full",
      h: "fit",
      _hover: {
        bgColor: "#fafafa",
      },
      _active: {
        transform: "translateY(2px) translateX(2px)",
        bgColor: "#fafafa",
        boxShadow: "0px 0px 0px 0px #B0B6C1, 2px 2px 0px 0px #80858E",
      },
    }),
    formBlue: (props: StyleFunctionProps) => ({
      border: "1px",
      boxShadow: "4px 4px 0px 0px #FCBF3B, 5px 5px 0px 1px #FF8643",
      fontSize: "80px",
      color: "formBlueDark",
      my: "1rem",
      w: "full",
      h: "fit",
      _hover: {
        bgColor: "#fafafa",
      },
      _active: {
        transform: "translateY(2px) translateX(2px)",
        bgColor: "#fafafa",
        boxShadow: "0px 0px 0px 0px #FCBF3B, 2px 2px 0px 0px #FF8643",
      },
    }),
    login: {
      w: "full",
      color: "loginBtnGray",
      fontFamily: "Inter",
      fontWeight: "normal",
      fontSize: "15px",
      lineHeight: "20.8px",
      border: "1px",
      borderColor: "#E5E7EB",
      textAlign: "left",
      justifyContent: "start",
    },

    ramps: (props: StyleFunctionProps) => ({
      w: "full",
      fontFamily: "inter",
      fontSize: "32px",
      lineHeight: "32px",
      justifyContent: "start",
      color: `${props.color}`,
      border: "solid #E5E7EB 1px",
      rounded: "6px",
      py: "2rem",
    }),
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "formGray",
  },
});

export default Button;
