import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Title = styled.h1`
  padding: 20px;
  font-size: 18px;
  color: white;
`;

const Svg = styled.svg``;

export default function App() {
  const [isPlay, setIsPlay] = useState(false);
  const togglePlay = () => setIsPlay((prev) => !prev);
  return (
    <Wrapper>
      <AnimatePresence>
        <Title>Pomodoro</Title>
        <div>timer number</div>
        <Button onClick={togglePlay}>
          {isPlay ? (
            <Svg
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"></path>
            </Svg>
          ) : (
            <Svg
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z"></path>
            </Svg>
          )}
        </Button>
        <div>
          <div>
            <span>0/4</span>
            <span>Round</span>
          </div>
          <div>
            <span>0/12</span>
            <span>Goal</span>
          </div>
        </div>
      </AnimatePresence>
    </Wrapper>
  );
}
