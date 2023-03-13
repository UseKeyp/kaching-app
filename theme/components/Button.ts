import { defineStyleConfig, StyleFunctionProps } from "@chakra-ui/react";

const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "lg",
    fontSize: "80px",
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
    form: (props: StyleFunctionProps) => ({
      border: "1px",
      boxShadow: `6px 6px 0px 0px ${props.shadowColor || "socialIconsGray"}`,
      fontSize: "80px",
      color: "socialIconsGray",
      my: "1rem",
      w: "full",
      h: "fit",
      _hover: {
        textDecoration: "none",
        bg: "#fafafa",
      },
      _active: {
        // transform: "translateY(4px)",
        boxShadow: `6px 6px 0px 0px ${props.shadowColor || "socialIconsGray"}`,
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
    // logout: {
    //   fontSize: "xs",
    //   color: "loginBtnGray",
    //   border: "1px solid gray",
    //   px: "1rem",
    // },
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
    variant: "form",
  },
});

export default Button;
