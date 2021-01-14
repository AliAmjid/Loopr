import dayjs from 'dayjs';

export const dateToDayFormat = 'DD. MM. YYYY';
export const dateToMinuteFormat = 'DD. MM. YYYY HH:mm';

export const formatDateToDay = (date: string | Date): string => {
  return dayjs(date).format(dateToDayFormat);
};

export const formatDateToMinute = (date: string | Date): string => {
  return dayjs(date).format(dateToMinuteFormat);
};
