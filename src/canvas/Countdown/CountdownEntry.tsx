import { FC, useEffect, useState } from 'react';
import classnames from 'classnames';
import { CountdownProps } from '.';
import { getLabelStyle, getLabelWrapperStyle } from './helpers';

const CountdownItem = ({ value }: { value: number }) => {
  //eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return <span data-test="ignore" style={{ '--value': value }}></span>;
};

const calculateTimeRemaining = (targetDate: string) => {
  const isNotInLocalFormat = new RegExp(/.*[+-]\d{2}:\d{2}$/g).test(targetDate);

  const targetTime = !isNotInLocalFormat
    ? new Date(new Date(targetDate).toString()).getTime()
    : new Date(new Date(targetDate).toUTCString()).getTime();

  const currentTime = !isNotInLocalFormat
    ? new Date(new Date().toString()).getTime()
    : new Date(new Date().toUTCString()).getTime();

  const timeDifference = targetTime - currentTime;

  if (timeDifference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export const CountdownEntry: FC<CountdownProps> = ({ targetDate, size, component }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [targetDate]);

  return (
    <>
      <div className="grid grid-flow-row md:grid-flow-col gap-5 text-center auto-cols-max">
        {Boolean(timeRemaining.days) && (
          <div className={classnames('flex', getLabelWrapperStyle(component?.variant))}>
            <span className={classnames('countdown font-mono', getLabelStyle(size))}>
              <CountdownItem value={timeRemaining.days} />
            </span>
            days
          </div>
        )}
        <div className={classnames('flex', getLabelWrapperStyle(component?.variant))}>
          <span className={classnames('countdown font-mono', getLabelStyle(size))}>
            <CountdownItem value={timeRemaining.hours} />
          </span>
          hours
        </div>
        <div className={classnames('flex', getLabelWrapperStyle(component?.variant))}>
          <span className={classnames('countdown font-mono', getLabelStyle(size))}>
            <CountdownItem value={timeRemaining.minutes} />
          </span>
          minutes
        </div>
        <div className={classnames('flex', getLabelWrapperStyle(component?.variant))}>
          <span className={classnames('countdown font-mono', getLabelStyle(size))}>
            <CountdownItem value={timeRemaining.seconds} />
          </span>
          seconds
        </div>
      </div>
    </>
  );
};
