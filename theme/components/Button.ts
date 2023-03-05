import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  // The styles all button have in common
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
    form: {
      border: "1px",
      shadow: "lg",
      fontSize: "80px",
      color: "#C5C8CC",
      my: "1rem",
      w: "full",
      h: "fit",
      _hover: {
        textDecoration: "none",
      },
    },
    login: {
      w: "full",
      color: "black",
      fontFamily: "Inter",
      fontSize: "15px",
      lineHeight: "20.8px",
      border: "1px",
      borderColor: "#E5E7EB",
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "form",
  },
});

export default Button;
