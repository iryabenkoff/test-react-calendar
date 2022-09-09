import React, { useState, useContext, useEffect } from 'react';
import { getMounth } from './utils/util';
import CalendarHeader from './components/CalendarHeader';
import SideBard from './components/SideBar';
import Mounth from './components/Month';
import GlobalContext from './context/GlobalContext';
import EventModal from './components/EventModal';
import s from './app.module.scss';

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(getMounth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMounth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div>
        <CalendarHeader />
        <div className={s.container}>
          <SideBard />
          <Mounth month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
