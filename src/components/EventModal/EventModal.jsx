import { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../context/GlobalContext';
import sprite from '../../assets/sprite.svg';
import s from './event-modal.module.scss';
import { createPortal } from 'react-dom';

const labelClasses = ['indigo', 'grey', 'green', 'blue', 'red', 'purple'];
const modalPlace = document.getElementById('modal-root');

const EventModal = () => {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );
  const [time, setTime] = useState(selectedEvent ? selectedEvent.time : '');
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelClasses.find(lbl => lbl === selectedEvent.label)
      : labelClasses[0]
  );

  const handleClose = e => {
    const { target, currentTarget, code } = e;
    if (target === currentTarget || code === 'Escape') {
      setShowEventModal(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleClose = e => {
      const { target, currentTarget, code } = e;
      if (target === currentTarget || code === 'Escape') {
        setShowEventModal(false);
      }
    };

    document.addEventListener('keydown', handleClose);

    const remove = () => {
      document.removeEventListener('keydown', handleClose);
      document.body.style.overflow = '';
    };
    return () => remove();
  }, [setShowEventModal]);

  const handleSubmit = e => {
    e.preventDefault();
    const calendarEvent = {
      time,
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (selectedEvent) {
      dispatchCalEvent({ type: 'update', payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: 'push', payload: calendarEvent });
    }

    setShowEventModal(false);
  };

  return createPortal(
    <div className={s.backdrop} onClick={handleClose}>
      <div className={s.modal}>
        <form>
          <header>
            <div className={s.wrapSvg}>
              {selectedEvent && (
                <button
                  className={s.btn}
                  onClick={() => {
                    dispatchCalEvent({
                      type: 'delete',
                      payload: selectedEvent,
                    });
                    setShowEventModal(false);
                  }}
                >
                  <svg className={s.svg}>
                    <use href={sprite + '#icon-bin'} />
                  </svg>
                </button>
              )}
              <button
                className={s.btn}
                onClick={() => setShowEventModal(false)}
              >
                <svg className={s.svg}>
                  <use href={sprite + '#icon-close'} />
                </svg>
              </button>
            </div>
          </header>
          <div>
            <input
              className={s.inpt}
              type="text"
              name="title"
              placeholder="Add title"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              className={s.inpt}
              type="text"
              name="description"
              placeholder="Add description"
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <div className={s.date}>
              <p>{daySelected.format('dddd, MMMM DD')}</p>
              <input
                type="time"
                name="time"
                value={time}
                onChange={e => setTime(e.target.value)}
              />
            </div>
            <div className={s.wrapLabels}>
              {labelClasses.map((lblClass, idx) => (
                <span
                  className={`${s.label} ${lblClass}`}
                  key={idx}
                  onClick={() => setSelectedLabel(lblClass)}
                >
                  {selectedLabel === lblClass && <span>&#10003;</span>}
                </span>
              ))}
            </div>
          </div>
          <footer>
            <button className={s.btnSave} type="submit" onClick={handleSubmit}>
              Save
            </button>
          </footer>
        </form>
      </div>
    </div>,
    modalPlace
  );
};

export default EventModal;
