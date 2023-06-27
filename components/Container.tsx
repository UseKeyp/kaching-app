import { ReactNode } from "react";

import { Box } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return <Box width="343px">{children}</Box>;
};

export default Container;
