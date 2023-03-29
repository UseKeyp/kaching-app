import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
const helpers = createMultiStyleConfigHelpers(["field"]);

const Input = helpers.defineMultiStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    field: {
      py: "4rem",
      h: "fit",
      mb: "-1.5rem",
      fontWeight: "extrabold",
      _placeholder: {
        fontSize: "5rem",
        color: props.color,
        px: "0.25rem",
      },
    },
  }),
  variants: {
    default: (props: StyleFunctionProps) => ({
      field: {
        fontSize: "5rem",
        px: ".5rem",
      },
    }),
  },

  defaultProps: {
    variant: "default",
  },
});

export default Input;
