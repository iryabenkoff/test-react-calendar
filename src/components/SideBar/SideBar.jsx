import CreateEventButton from '../CreateEventButton';
import SmallCalendar from '../SmallCalendar';
import Labels from '../Labels';
import s from './side-bar.module.scss';

const SideBar = () => {
  return (
    <aside className={s.sideBar}>
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
};

export default SideBar;
