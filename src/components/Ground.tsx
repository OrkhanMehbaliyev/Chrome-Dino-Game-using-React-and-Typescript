import { Box, Img } from "@chakra-ui/react";
import ground from "/imgs/ground.png";
import React, { SetStateAction, forwardRef, memo } from "react";
import Obstacles from "./Obstacles";

interface Props {
  updater: number;
  obstaclePositions: number[];
  setObstaclePositions: React.Dispatch<React.SetStateAction<number[]>>;
}

const Ground = forwardRef<HTMLDivElement, Props>(
  ({ updater, obstaclePositions, setObstaclePositions }, ref) => {
    return (
      <Box
        ref={ref}
        width={"100%"}
        position={"absolute"}
        bottom={0}
        display={"inline"}
      >
        <Box display={"inline-flex"}>
          <Box width={"2500px"} height={"23px"}>
            <Img
              src={ground}
              width={"100%"}
              height={"100%"}
              objectFit={"cover"}
            />
          </Box>
          <Box width={"2500px"} height={"25px"}>
            <Img
              src={ground}
              width={"100%"}
              height={"100%"}
              objectFit={"cover"}
            />
          </Box>
          <Box width={"2500px"} height={"25px"}>
            <Img
              src={ground}
              width={"100%"}
              height={"100%"}
              objectFit={"cover"}
            />
          </Box>
          ,
          <Box width={"2500px"} height={"25px"}>
            <Img
              src={ground}
              width={"100%"}
              height={"100%"}
              objectFit={"cover"}
            />
          </Box>
          <Obstacles
            obstaclePositions={obstaclePositions}
            updater={updater}
            setObstaclePositions={setObstaclePositions}
          />
        </Box>
      </Box>
    );
  }
);

export default memo(Ground);
