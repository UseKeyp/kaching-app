import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const helpers = createMultiStyleConfigHelpers(["field"]);

const Input = helpers.defineMultiStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    field: {
      bg: "white",
      fontWeight: "extrabold",
      py: "3.5rem",
      _placeholder: {
        px: "0.5rem",
      },
    },
  }),
  variants: {
    default: (props: StyleFunctionProps) => ({
      field: {
        fontSize: "80px",
        px: "0.5rem",
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
