import {
  motion,
  spring,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled, { css, useTheme } from "styled-components";
import { isDarkAtom, isTimeAtom } from "./Atom";

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
  color: ${(props) => props.theme.primaryColor};
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
const Wrapper = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  max-width: 800px;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.primaryColor};
`;

const ThemeBtn = styled(motion.button)`
  position: absolute;
  right: 30px;
  top: 20px;
  display: flex;
  background: none;
  border: none;
  width: 20px;
`;
const Button = styled(motion.button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  &:hover {
    > div {
      display: none;
    }
  }
`;
const Svg = styled.svg`
  color: white;
  width: 80%;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px;
  font-size: 40px;
  font-weight: 700;
  color: white;
  svg {
    width: 30px;
  }
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

const InfoMsg = styled(motion.div)`
  position: absolute;
  left: 0;
  top: -40px;
  color: white;
  display: flex;
  width: 100%;
  justify-content: center;
  white-space: nowrap;
  svg {
    margin-left: 4px;
    width: 16px;
  }
`;

// ----------------------------------------------
//  animate
// ----------------------------------------------
const panelMotion = {
  start: { scale: 0.6 },
  end: { scale: 1, transition: { type: "spring" } },
};
// ----------------------------------------------
//  function App()
// ----------------------------------------------
export default function App() {
  const togglePlay = () => setIsPlay((prev) => !prev);
  const [isPlay, setIsPlay] = useRecoilState(isTimeAtom);
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleTheme = () => setIsDark((prev) => !prev);
  const theme = useTheme();

  const [time, setTime] = useState(5); // 25분 = 1500초
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const second = String(time % 60).padStart(2, "0");

  const [round, setRound] = useState(0);
  const [goal, setGoal] = useState(0);

  const timePanelMotion = useMotionValue(time);
  useMotionValueEvent(timePanelMotion, "change", (latest) => {
    console.log(latest);
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlay && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000); // 밀리초, 1000 = 1초
    }

    if (time === 0) {
      setIsPlay(false);
      setRound((prev) => prev + 1);
      setTime(5);
    }
    return () => clearInterval(timer);
  }, [isPlay, time]);

  useEffect(() => {
    if (round === 4) {
      setGoal((prev) => prev + 1);
      setRound(0);
    }
  }, [round]);

  return (
    <Wrapper
      animate={{
        backgroundColor: theme.primaryColor,
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <ThemeBtn onClick={toggleTheme}>{isDark ? "🍅" : "🌙"}</ThemeBtn>
      <Title>Pomodoro</Title>
      <NumberPanel>
        <motion.div
          key={`min-${minutes}`}
          variants={panelMotion}
          initial="start"
          animate="end"
          className="minutes"
        >
          {minutes}
        </motion.div>
        <div className="icon"></div>
        <motion.div
          key={`sec-${second}`}
          variants={panelMotion}
          initial="start"
          animate="end"
          layout
          className="seconds"
        >
          {second}
        </motion.div>
      </NumberPanel>
      <Button
        onClick={togglePlay}
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
            <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z"></path>
          </Svg>
        ) : (
          <Svg
            data-slot="icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"></path>
          </Svg>
        )}
        {!isPlay ? (
          <InfoMsg
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              type: "spring",
              damping: 10,
            }}
          >
            click me
            <svg
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z"></path>
            </svg>
          </InfoMsg>
        ) : null}
      </Button>
      <StatusPanel>
        <div className="item">
          <span>{round}/4</span>
          <span>Round</span>
        </div>
        <div className="item">
          <span>{goal}/12</span>
          <span>Goal</span>
        </div>
      </StatusPanel>
    </Wrapper>
  );
}
