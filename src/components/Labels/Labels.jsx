import React, { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import s from './labels.module.css';

const Labels = () => {
  const { labels, updateLabel } = useContext(GlobalContext);

  return (
    <React.Fragment>
      <h3 className={s.title}>Label</h3>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label className={s.label} key={idx}>
          <input
            className={lbl}
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
          />
          <span>{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );
};

export default Labels;
