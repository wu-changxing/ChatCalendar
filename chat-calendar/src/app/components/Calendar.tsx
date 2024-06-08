// components/Calendar.tsx
import { useEffect, useRef } from 'react';
import Calendar from '@toast-ui/calendar';

const MyCalendar = () => {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current!, {
      defaultView: 'month',
      taskView: true,
      scheduleView: true,
      useCreationPopup: true,
      useDetailPopup: true,
      template: {
        monthDayname: (dayname) => `<span class="calendar-week-dayname-name">${dayname.label}</span>`,
      },
    });

    calendar.createSchedules([
      {
        id: '1',
        calendarId: '1',
        title: 'TOAST UI Calendar',
        category: 'time',
        dueDateClass: '',
        start: '2023-06-18T22:30:00+09:00',
        end: '2023-06-19T02:30:00+09:00',
      },
    ]);

    return () => calendar.destroy();
  }, []);

  return <div ref={calendarRef} style={{ height: '800px' }} />;
};

export default MyCalendar;
