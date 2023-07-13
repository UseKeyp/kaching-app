import { Box, BoxProps } from "@chakra-ui/react";

interface BackgroundImageProps extends BoxProps {
  image: string;
  opacity?: number;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  children,
  image,
  opacity = 0.5,
  ...props
}) => {
  return (
    <Box position="relative" {...props}>
      <Box
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        backgroundImage={image}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        opacity={opacity}
        zIndex={-1}
      />
      {children}
    </Box>
  );
};
