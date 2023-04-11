import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
const helpers = createMultiStyleConfigHelpers(["field"]);

const Input = helpers.defineMultiStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    field: {
      // py: "4rem",
      py: "2rem",
      h: "fit",
      mb: "-1.5rem",
      fontWeight: "extrabold",
      _placeholder: {
        fontSize: "9vh",
        color: props.color,
        px: "0.25rem",
      },
    },
  }),
  variants: {
    default: (props: StyleFunctionProps) => ({
      field: {
        fontSize: "9vh",
        px: ".5rem",
      },
    }),
  },

  defaultProps: {
    variant: "default",
  },
});

export default Input;
