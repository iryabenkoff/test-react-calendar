import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { getMounth } from '../../utils/util';
import s from './small-calendar.module.scss';

const SmallCalendar = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMounth());

  useEffect(() => {
    setCurrentMonth(getMounth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  const handleToggleMonth = e => {
    const { children } = e.currentTarget;

    if (e.target === children[0]) {
      setCurrentMonthIdx(currentMonthIdx - 1);
    } else {
      setCurrentMonthIdx(currentMonthIdx + 1);
    }
  };

  const getCurrentDayClass = day => {
    const format = 'DD-MM-YY';
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);

    if (nowDay === currDay) {
      return `${s.current}`;
    } else if (currDay === slcDay) {
      return `${s.currentSlc}`;
    } else {
      return '';
    }
  };

  return (
    <div className={s.container}>
      <header className={s.header}>
        <h2 className={s.title}>
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM YYYY')}
        </h2>
        <div onClick={handleToggleMonth}>
          <button className={`${s.button} ${s.btn}`} type="button">
            &#10094;
          </button>
          <button className={`${s.button} ${s.btn}`} type="button">
            &#10095;
          </button>
        </div>
      </header>
      <div className={s.daysOfTheWeek}>
        {currentMonth[0].map((day, i) => (
          <p className={s.dayOfTheWeek} key={i}>
            {day.format('dd').charAt(0)}
          </p>
        ))}
      </div>
      <div className={s.list}>
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                className={`${s.btn} ${getCurrentDayClass(day)}`}
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
              >
                {day.format('D')}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
