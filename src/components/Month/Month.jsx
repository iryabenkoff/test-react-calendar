import React from 'react';
import Day from '../Day';
import s from './month.module.css';

const Month = ({ month }) => {
    return (
        <div className={s.container}>
                {month.map((row, i) =>
                    <React.Fragment key={i}>
                        {row.map((day, idx) => <Day day={day} key={idx} rowIdx={i}/>)}
                    </React.Fragment>)}
        </div>
    )
}

export default Month;