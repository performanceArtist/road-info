import React from 'react';

interface State {
  date: Date;
  timer: NodeJS.Timeout | null;
}

class Clock extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      date: new Date(),
      timer: null
    };

    this.getDate = this.getDate.bind(this);
    this.getDay = this.getDay.bind(this);
  }

  addZeros(str: number) {
    return `0${str}`.slice(-2);
  }

  getDate() {
    const { date } = this.state;

    const day = this.addZeros(date.getUTCDate());
    const month = this.addZeros(date.getUTCMonth());
    const year = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
  }

  getDay() {
    const { date } = this.state;

    const hours = this.addZeros(date.getUTCHours());
    const minutes = this.addZeros(date.getUTCMinutes());
    const seconds = this.addZeros(date.getUTCSeconds());

    return `${hours}:${minutes}:${seconds}`;
  }

  componentDidMount() {
    const timer = setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);

    this.setState({ timer });
  }

  componentWillUnmount() {
    const { timer } = this.state;

    clearInterval(timer);
  }

  render() {
    return (
      <div className="clock">
        <div className="clock__wrapper">
          <span className="clock__title">UTC</span>
          <span className="clock__date">{this.getDate()}</span>
          <span className="clock__day">{this.getDay()}</span>
        </div>
      </div>
    );
  }
}

export default Clock;
