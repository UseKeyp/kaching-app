import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const helpers = createMultiStyleConfigHelpers(["field"]);

const Input = helpers.defineMultiStyleConfig({
  baseStyle: {
    field: {
      bg: "white",
      fontWeight: "extrabold",
      px: "0.25rem",
      _placeholder: {
        px: "0.25rem",
        fontWeight: "extrabold",
      },
    },
  },
  variants: {
    default: (props: StyleFunctionProps) => ({
      field: {
        fontSize: "5rem",
        // TODO: if py < 3.7, text disappears. Figure out this idiosyncrasy
        py: "4rem",
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
