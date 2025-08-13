import { FC, useState } from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: FC = () => {
  const [clockName, setClockName] = useState('Clock-0');
  const [timerId, setTimerId] = useState(0);
  const [hasClock, setHasClock] = useState(true);

  const hideClock = (event: MouseEvent): void => {
    event.preventDefault();
    setHasClock(false);
  };

  const showClock = (): void => setHasClock(true);

  // componentDidMount(): void {
  //   this.setState({
  //     timerId: window.setInterval(
  //       () => this.setState({ clockName: getRandomName() }),
  //       3300,
  //     ),
  //   });

  //   document.addEventListener('mousedown', this.showClock);
  //   document.addEventListener('contextmenu', this.hideClock);
  // }

  // componentWillUnmount(): void {
  //   if (this.state.timerId) {
  //     window.clearInterval(this.state.timerId);
  //   }

  //   document.removeEventListener('mousedown', this.showClock);
  //   document.removeEventListener('contextmenu', this.hideClock);
  // }

  return (
    <div className="App">
      <h1>React clock</h1>

      {hasClock && <Clock clockName={clockName} />}
    </div>
  );
};
