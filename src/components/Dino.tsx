import React, { forwardRef, useEffect, useRef } from "react";
import { Img, ImgProps } from "@chakra-ui/react";
import { DINO_STATES } from "../utils/types";

import dino_stationary from "/imgs/dino-stationary.png";
import dino_run_0 from "/imgs/dino-run-0.png";
import dino_run_1 from "/imgs/dino-run-1.png";

interface Props extends ImgProps {
  state: DINO_STATES;
}

const Dino = forwardRef<HTMLImageElement, Props>(({ state, ...props }, ref) => {
  const localRef = useRef<HTMLImageElement>(null);
  const combinedRef = ref || localRef;

  useEffect(() => {
    if (!combinedRef || !("current" in combinedRef) || !combinedRef.current)
      return;

    const imgElement = combinedRef.current as HTMLImageElement;
    let interval: number | null = null;

    if (state === DINO_STATES.RUNING) {
      const images = [dino_run_0, dino_run_1];
      let currentIdx = 0;

      interval = setInterval(() => {
        currentIdx = (currentIdx + 1) % images.length;
        imgElement.src = images[currentIdx];
      }, 100);
    } else if (state === DINO_STATES.JUMPING) {
      imgElement.src = dino_stationary;
    } else {
      imgElement.src = dino_stationary;
    }

    console.log(state);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state]);

  return <Img ref={combinedRef} {...props} />;
});

export default Dino;
