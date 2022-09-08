import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../context/GlobalContext';
import s from './day.module.css';

const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent } =
    useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      evt => dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY'),
    );

    setDayEvents(events)
  }, [filteredEvents, day]);

  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? `${s.current}`
      : '';
  };

  return (
    <div
      className={s.wrap}
      onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}
    >
      <header className={s.header}>
        {rowIdx === 0 && (
          <p className={s.dayOfTheMonth}>{day.format('ddd').toUpperCase()}</p>
        )}
        <p className={`${getCurrentDayClass()} ${s.date}`}>
          {day.format('DD')}
        </p>
      </header>
          {dayEvents.map((evt, idx) => (
            <div className={evt.label} key={idx} onClick={() => setSelectedEvent(evt)}>
              {evt.title}
            </div>
          ))}
    </div>
  );
};

export default Day;
