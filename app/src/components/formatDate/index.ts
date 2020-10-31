import dayjs from 'dayjs';

export const formatDateToDay = (date: string | Date): string => {
  return dayjs(date).format('DD.MM. YYYY');
};

export const formatDateToMinute = (date: string | Date): string => {
  return dayjs(date).format('DD.MM. YYYY HH:mm');
};

export const formatDateToSecond = (date: string | Date): string => {
  return dayjs(date).format('DD.MM. YYYY HH:mm:ss');
};
