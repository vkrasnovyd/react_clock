/* eslint-disable no-console */
import { FC, useState } from 'react';

interface Props {
  clockName: string;
}

export const Clock: FC<Props> = ({ clockName }) => {
  const timerId = 0;
  const getCurrentTime = () => new Date().toUTCString().slice(-12, -4);
  const [time, setTime] = useState(getCurrentTime());

  // componentDidMount(): void {
  //   this.timerId = window.setInterval(() => {
  //     const currentTime = this.getCurrentTime();

  //     this.setState({ time: currentTime });
  //     console.log(currentTime);
  //   }, 1000);
  // }

  // componentDidUpdate(prevProps: Readonly<Props>) {
  //   if (prevProps.clockName !== this.props.clockName) {
  //     console.warn(
  //       `Renamed from ${prevProps.clockName} to ${this.props.clockName}`,
  //     );
  //   }
  // }

  // componentWillUnmount(): void {
  //   if (this.timerId) {
  //     window.clearInterval(this.timerId);
  //   }
  // }

  return (
    <div className="Clock">
      <strong className="Clock__name">{clockName}</strong>

      {' time is '}

      <span className="Clock__time">{time}</span>
    </div>
  );
};
