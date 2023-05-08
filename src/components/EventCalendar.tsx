import React, {FC} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import {Calendar} from 'antd';
import {IEvent} from '../models/IEvent';

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = ({events}) => {
  const dateCellRender = (date: Dayjs) => {
    const formattedDate = dayjs(date).format('YYYY.MM.DD');
    const currentDayEvents = events.filter((event) => event.date === formattedDate);

    return (
      <div>
        {currentDayEvents.map(({description}, index) => (
          <div key={index}>{description}</div>
        ))}
      </div>
    );
  };
  return (
    <Calendar cellRender={dateCellRender} />
  );
};

export default EventCalendar;