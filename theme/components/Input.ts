import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const helpers = createMultiStyleConfigHelpers(["field"]);

const Input = helpers.defineMultiStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    field: {
      bg: "white",
      fontWeight: "extrabold",
      py: "1rem",
      overflow: "visible !important",
      _placeholder: {
        px: "0.5rem",
      },
    },
  }),
  variants: {
    default: (props: StyleFunctionProps) => ({
      field: {
        // border: "1px solid",
        fontSize: "5rem",
        py: "2.5rem",
        px: "-1rem",
        color: props.color,
        overflow: "visible !important",
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
