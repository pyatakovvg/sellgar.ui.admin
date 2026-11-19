import moment from 'moment';

export const timeFormat = (date: string) => {
  return moment(date).format('HH:mm:ss');
};
