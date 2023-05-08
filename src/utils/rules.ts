import dayjs, {Dayjs} from 'dayjs';

export const rules = {
  required: (message: string = 'Required field') => ({
    required: true,
    message
  }),
  isDateAfter: (message: string) => ({
    validator(_: any, date: Dayjs) {
      if (!date || date.isAfter(dayjs().format('YYYY.MM.DD'))) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message));
    }
  })
};

export const capitalize = (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;