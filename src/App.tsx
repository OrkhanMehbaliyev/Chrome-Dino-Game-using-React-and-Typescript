import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { DINO_STATES } from "./utils/types";
import WorldContainer from "./components/WorldContainer";
import Dino from "./components/Dino";
import Ground from "./components/Ground";

function App() {
  const [dinoState, setDinoState] = useState<DINO_STATES>(DINO_STATES.STATIC);
  const [speed, setSpeed] = useState<number>(10);
  const [dinoBottom, setDinoBottom] = useState<string>("17px");
  const [updater, setUpdater] = useState<number>(0);
  const [obstaclePositions, setObstaclePositions] = useState<number[]>([]);

  const groundRef = useRef<HTMLImageElement>(null);
  const score = useRef<HTMLHeadingElement>(null);
  const dinoRef = useRef<HTMLImageElement>(null);

  const handleStart = () => {
    setDinoState(DINO_STATES.RUNING);
  };

  const handleJump = (e: KeyboardEvent) => {
    if (e.key == " ") {
      setDinoState(DINO_STATES.JUMPING);
    }
  };

  const handleDedection = (position: number) => {
    obstaclePositions.forEach((cactiPos) => {
      if (
        position >= cactiPos - 15 &&
        position <= cactiPos + 15 &&
        dinoRef.current &&
        groundRef.current
      ) {
        const coordinates = dinoRef.current.getBoundingClientRect();
        if (coordinates.y > groundRef.current.getBoundingClientRect().y - 60)
          setDinoState(DINO_STATES.STATIC);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("beforeunload", () => sessionStorage.clear(), {
      once: true,
    });

    window.addEventListener("keydown", handleStart, { once: true });
    window.addEventListener("keydown", handleJump);

    return () => {
      window.removeEventListener("keydown", handleStart);
      window.removeEventListener("keydown", handleJump);
    };
  }, []);

  useEffect(() => {
    let pos = Number(sessionStorage.getItem("score")) || 1;
    if (dinoState == DINO_STATES.RUNING || dinoState == DINO_STATES.JUMPING) {
      const interval = setInterval(() => {
        if (groundRef.current) {
          let position = pos % 2500;
          --pos;
          groundRef.current.style.left = `${position * 3}px`;
          if (obstaclePositions.length > 0) {
            handleDedection(Math.abs(position * 3));
          }
          // console.log(dinoRef.current?.getBoundingClientRect());

          if (position == 0) setUpdater((prev) => prev + 1);
          if (pos % 2000 == 0) setSpeed((prev) => prev / 1.1);
        }
        if (score.current) score.current.innerText = `Score: ${-pos}`;
      }, speed);

      if (dinoState == DINO_STATES.JUMPING) {
        if (dinoRef.current) {
          setDinoBottom("125px");

          setTimeout(() => {
            if (dinoRef.current) {
              setDinoBottom("17px");
              setTimeout(() => {
                setDinoState(DINO_STATES.RUNING);
              }, 250);
            }
          }, 250);
        }
      }
      return () => {
        sessionStorage.setItem("score", String(pos));
        clearInterval(interval);
      };
    }
  }, [dinoState]);

  return (
    <Flex
      width={"100%"}
      height={"100vh"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Heading ref={score}>Score : 0</Heading>

      <WorldContainer border={"3px solid gray"} overflowX={"hidden"}>
        <Dino
          ref={dinoRef}
          state={dinoState}
          position={"absolute"}
          bottom={dinoBottom}
          width={"50px"}
          transition={"bottom 249ms ease"}
          border={"1px solid blue"}
        />
        <Ground
          obstaclePositions={obstaclePositions}
          setObstaclePositions={setObstaclePositions}
          updater={updater}
          ref={groundRef}
        />
      </WorldContainer>
    </Flex>
  );
}

export default App;
