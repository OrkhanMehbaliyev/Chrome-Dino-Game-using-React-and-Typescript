import { Box, Img } from "@chakra-ui/react";
import cactusImg from "/imgs/cactus.png";
import { useEffect } from "react";

interface Props {
  updater: number;
  obstaclePositions: number[];
  setObstaclePositions: React.Dispatch<React.SetStateAction<number[]>>;
}

const Obstacles: React.FC<Props> = ({
  updater,
  obstaclePositions,
  setObstaclePositions,
}) => {
  const count = 10;

  const positions: number[] = [];
  useEffect(() => {
    console.log("render obstacle");
    for (let i = 0; i < count; i++) {
      const newNumber = 1000 + Math.floor(Math.random() * 6000);
      let flag = true;
      positions.forEach((position) => {
        if (position <= newNumber + 150 && position >= newNumber - 150) {
          flag = false;
        }
      });
      if (flag) positions.push(newNumber);
      else i--;
    }

    setObstaclePositions(positions);
  }, [updater]);

  return (
    <Box width={"3000px"}>
      {obstaclePositions.map((position, key) => {
        return (
          <Img
            key={key}
            src={cactusImg}
            height={"40px"}
            width={"30px"}
            position={"absolute"}
            bottom={"15px"}
            left={position}
          />
        );
      })}
    </Box>
  );
};

export default Obstacles;
