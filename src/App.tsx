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
  timerId: number;
};

export class App extends React.Component<{}, State> {
  state: State = {
    today: new Date(),
    clockName: 'Clock-0',
    timerId: 0,
  };

  // This code starts a timer
  componentDidMount(): void {
    this.setState({
      timerId: window.setInterval(
        () => this.setState({ clockName: getRandomName() }),
        3300,
      ),
    });

    window.setInterval(() => this.setState({ today: new Date() }), 1000);
  }

  componentDidUpdate(prevState: Readonly<State>): void {
    if (prevState.today !== this.state.today) {
      console.log(this.state.today.toUTCString().slice(-12, -4));
    }

    if (prevState.clockName !== this.state.clockName) {
      console.warn(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }
  }

  // this code stops the timer
  componentWillUnmount(): void {
    window.clearInterval(this.state.timerId);
    this.setState({ timerId: 0 });
  }

  render() {
    const { today, clockName } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        <div className="Clock">
          <strong className="Clock__name">{clockName}</strong>

          {' time is '}

          <span className="Clock__time">
            {today.toUTCString().slice(-12, -4)}
          </span>
        </div>
      </div>
    );
  }
}
