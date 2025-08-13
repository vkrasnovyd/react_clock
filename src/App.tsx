import { FC, useEffect, useRef, useState } from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: FC = () => {
  const timerId = useRef(0);
  const [clockName, setClockName] = useState('Clock-0');
  const [hasClock, setHasClock] = useState(true);

  const hideClock = (event: MouseEvent): void => {
    event.preventDefault();
    setHasClock(false);
  };

  const showClock = (): void => setHasClock(true);

  useEffect(() => {
    timerId.current = window.setInterval(
      () => setClockName(getRandomName()),
      3300,
    );

    document.addEventListener('mousedown', showClock);
    document.addEventListener('contextmenu', hideClock);

    return () => {
      if (timerId.current) {
        window.clearInterval(timerId.current);
      }

      document.removeEventListener('mousedown', showClock);
      document.removeEventListener('contextmenu', hideClock);
    };
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>

      {hasClock && <Clock clockName={clockName} />}
    </div>
  );
};
