import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  clockName: string;
  timerId: number;
  hasClock: boolean;
};

export class App extends React.Component<{}, State> {
  state: State = {
    clockName: 'Clock-0',
    timerId: 0,
    hasClock: true,
  };

  hideClock = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  showClock = () => {
    this.setState({ hasClock: true });
  };

  componentDidMount(): void {
    this.setState({
      timerId: window.setInterval(
        () => this.setState({ clockName: getRandomName() }),
        3300,
      ),
    });

    document.addEventListener('mousedown', this.showClock);
    document.addEventListener('contextmenu', this.hideClock);
  }

  componentWillUnmount(): void {
    if (this.state.timerId) {
      window.clearInterval(this.state.timerId);
    }

    document.removeEventListener('mousedown', this.showClock);
    document.removeEventListener('contextmenu', this.hideClock);
  }

  render() {
    const { clockName, hasClock } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && <Clock clockName={clockName} />}
      </div>
    );
  }
}
