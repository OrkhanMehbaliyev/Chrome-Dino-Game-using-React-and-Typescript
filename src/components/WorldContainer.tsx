import { Box, BoxProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren, BoxProps {}

const WorldContainer: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Box width={"75%"} height={"40%"} position={"relative"} {...props}>
      {children}
    </Box>
  );
};

export default WorldContainer;
