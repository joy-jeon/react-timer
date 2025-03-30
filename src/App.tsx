import { motion } from "framer-motion";
import { useState } from "react";
import styled, { css } from "styled-components";

// ----------------------------------------------
//  css mixin
// ----------------------------------------------
const panelStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 160px;
  border-radius: 4px;
  color: #e84d3f;
  font-size: 50px;
  font-weight: 700;
  background-color: white;
`;
const colonDot = css`
  content: "";
  display: flex;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
`;

// ----------------------------------------------
//  styled components
// ----------------------------------------------
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  max-width: 800px;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  background: #e84d3f;
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
`;
const Svg = styled.svg`
  color: white;
  width: 80%;
`;

const Title = styled.h1`
  padding: 10px;
  font-size: 40px;
  font-weight: 700;
  color: white;
`;

const NumberPanel = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  .minutes {
    ${panelStyle};
  }
  .seconds {
    ${panelStyle};
  }

  .icon {
    display: flex;
    flex-direction: column;
    gap: 10px;
    ::before,
    ::after {
      ${colonDot}
    }
  }
`;

const StatusPanel = styled(motion.div)`
  display: flex;
  gap: 20px;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    text-transform: uppercase;
    span:first-child {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.5);
    }
    span:last-child {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.7);
      text-shadow: 1px 1px 2px #666;
    }
  }
`;

// ----------------------------------------------
//  animate
// ----------------------------------------------

// ----------------------------------------------
//  function App()
// ----------------------------------------------
export default function App() {
  const [isPlay, setIsPlay] = useState(false);
  const togglePlay = () => setIsPlay((prev) => !prev);
  return (
    <Wrapper>
      <Title>Pomodoro</Title>
      <NumberPanel>
        <div className="minutes">
          <span>2</span>
          <span>5</span>
        </div>
        <div className="icon"></div>
        <div className="seconds">
          <span>0</span>
          <span>0</span>
        </div>
      </NumberPanel>
      <Button
        onClick={togglePlay}
        // initial={{ scale: 1.2 }}
        // animate={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
      >
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
      <StatusPanel>
        <div className="item">
          <span>0/4</span>
          <span>Round</span>
        </div>
        <div className="item">
          <span>0/12</span>
          <span>Goal</span>
        </div>
      </StatusPanel>
    </Wrapper>
  );
}
