/* eslint-disable no-console */
import { FC, useEffect, useRef, useState } from 'react';

interface Props {
  clockName: string;
}

export const Clock: FC<Props> = ({ clockName }) => {
  const timerId = useRef(0);
  const getCurrentTime = (): string => new Date().toUTCString().slice(-12, -4);
  const [time, setTime] = useState(getCurrentTime());

  const firstRender = useRef(true);
  const prevClockName = useRef(clockName);

  useEffect(() => {
    timerId.current = window.setInterval(() => {
      const currentTime = getCurrentTime();

      setTime(currentTime);
      console.log(currentTime);
    }, 1000);

    return () => {
      if (timerId.current) {
        window.clearInterval(timerId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else if (prevClockName.current !== clockName) {
      console.warn(`Renamed from ${prevClockName.current} to ${clockName}`);
      prevClockName.current = clockName;
    }
  }, [clockName]);

  return (
    <div className="Clock">
      <strong className="Clock__name">{clockName}</strong>

      {' time is '}

      <span className="Clock__time">{time}</span>
    </div>
  );
};
