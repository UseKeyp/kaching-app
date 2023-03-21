import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const helpers = createMultiStyleConfigHelpers(["field"]);

const Input = helpers.defineMultiStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    field: {
      bg: "white",
      fontWeight: "bold",
      py: ".1rem",
      _placeholder: {
        px: "0.1rem",
      },
    },
  }),
  variants: {
    default: (props: StyleFunctionProps) => ({
      field: {
        fontSize: "1.34rem",
        px: "0.1rem",
        color: props.color,
        _placeholder: {
          color: props.color,
        },
      },
    }),
  },

  defaultProps: {
    variant: "default",
  },
});

export default Input;
