/* eslint-disable no-console */
import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  today: Date;
  clockName: string;
  clockNameTimerId: number;
  todayTimerId: number;
  hasClock: boolean;
};

export class App extends React.Component<{}, State> {
  state: State = {
    today: new Date(),
    clockName: 'Clock-0',
    clockNameTimerId: 0,
    todayTimerId: 0,
    hasClock: true,
  };

  hideClock = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  showClock = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: true });
  };

  // This code starts a timer
  componentDidMount(): void {
    const currentTime = new Date();

    this.setState({
      today: currentTime,
      clockNameTimerId: window.setInterval(
        () => this.setState({ clockName: getRandomName() }),
        3300,
      ),
      todayTimerId: window.setInterval(
        () => this.setState({ today: new Date() }),
        1000,
      ),
    });

    document.addEventListener('click', this.showClock);
    document.addEventListener('contextmenu', this.hideClock);
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<State>,
  ): void {
    if (this.state.hasClock) {
      if (prevState.today !== this.state.today) {
        console.log(this.state.today.toUTCString().slice(-12, -4));
      }

      if (prevState.clockName !== this.state.clockName) {
        console.warn(
          `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
        );
      }
    }
  }

  // this code stops the timer
  componentWillUnmount(): void {
    window.clearInterval(this.state.clockNameTimerId);
    window.clearInterval(this.state.todayTimerId);

    document.removeEventListener('click', this.showClock);
    document.removeEventListener('contextmenu', this.hideClock);
  }

  render() {
    const { today, clockName, hasClock } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && (
          <div className="Clock">
            <strong className="Clock__name">{clockName}</strong>

            {' time is '}

            <span className="Clock__time">
              {today.toUTCString().slice(-12, -4)}
            </span>
          </div>
        )}
      </div>
    );
  }
}
