import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import s from './create-event-button.module.scss';

const CreateEventButton = () => {
    const {setShowEventModal} = useContext(GlobalContext);

    return (
        <button className={s.btn} onClick={() => setShowEventModal(true)}><span className={s.plus}>+</span> Create</button>
    )
}

export default CreateEventButton;