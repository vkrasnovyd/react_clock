/* eslint-disable no-console */
import React from 'react';

type Props = { clockName: string };

type State = {
  today: Date;
  timerId: number;
};

export class Clock extends React.PureComponent<Props, State> {
  state: State = {
    today: new Date(),
    timerId: 0,
  };

  getNormalizedTime = () => this.state.today.toUTCString().slice(-12, -4);

  componentDidMount(): void {
    const currentTime = new Date();

    this.setState({
      today: currentTime,
      timerId: window.setInterval(
        () => this.setState({ today: new Date() }),
        1000,
      ),
    });
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
  ): void {
    if (prevState.today !== this.state.today) {
      console.log(this.getNormalizedTime());
    }

    if (prevProps.clockName !== this.props.clockName) {
      console.warn(
        `Renamed from ${prevProps.clockName} to ${this.props.clockName}`,
      );
    }
  }

  componentWillUnmount(): void {
    window.clearInterval(this.state.timerId);
  }

  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.clockName}</strong>

        {' time is '}

        <span className="Clock__time">{this.getNormalizedTime()}</span>
      </div>
    );
  }
}
