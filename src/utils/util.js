import dayjs from 'dayjs';

export const getMounth = (month = dayjs().month()) => {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount += 1;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
};
