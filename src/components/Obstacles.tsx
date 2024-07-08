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
  const count = Math.floor(3 + Math.random() * 10);

  const positions: number[] = [];
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const newNumber = 1500 + Math.floor(Math.random() * 6000);
      let flag = true;
      positions.forEach((position) => {
        if (position <= newNumber + 250 && position >= newNumber - 250) {
          flag = false;
        }
      });
      if (flag) positions.push(newNumber);
      else i--;
    }

    setObstaclePositions(positions.sort());
  }, [updater]);

  return (
    <Box width={"7500px"}>
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
            border={"1px solid red"}
          />
        );
      })}
    </Box>
  );
};

export default Obstacles;
