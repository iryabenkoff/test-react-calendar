import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import dayjs from 'dayjs';
import logo from '../../assets/logo.png';
import s from './calendar-header.module.scss';

const CalendarHeader = () => {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    const handleToggleMonth = (e) => {
        const { children } = e.currentTarget;

        if (e.target === children[0]) {
            setMonthIndex(monthIndex - 1);
        } else {
            setMonthIndex(monthIndex + 1);
        }
    }


    const handleReset = () => {
        setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
    }

    return (<>
        <header className={s.header}>
            <img className={s.img} src={logo} width="44" hight="40" alt="logo" />
            <h1 className={s.title}>Calendar</h1>
            <button className={s.btnToday} onClick={handleReset}>Today</button>
            <div onClick={handleToggleMonth}>
                <button className={s.btn} type='button' >&#10094;</button>
                <button className={s.btn} type='button' >&#10095;</button>
            </div>
            <div className={s.date}>{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}</div>
        </header>
        </>
    );
};

export default CalendarHeader;
