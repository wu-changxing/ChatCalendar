"use client";

import { useEffect, useRef, useState, useCallback, ChangeEvent, MouseEvent } from 'react';
import Calendar from '@toast-ui/calendar';
import { TZDate } from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

type ViewType = 'month' | 'week' | 'day';

const today = new TZDate();

const initialCalendars = [
  {
    id: '0',
    name: 'Private',
    backgroundColor: '#9e5fff',
    borderColor: '#9e5fff',
    dragBackgroundColor: '#9e5fff',
  },
  {
    id: '1',
    name: 'Company',
    backgroundColor: '#00a9ff',
    borderColor: '#00a9ff',
    dragBackgroundColor: '#00a9ff',
  },
];

const initialEvents = [
  {
    id: '1',
    calendarId: '0',
    title: 'TOAST UI Calendar Study',
    category: 'time',
    start: today,
    end: new TZDate(new Date().setHours(today.getHours() + 3)),
  },
  {
    id: '2',
    calendarId: '0',
    title: 'Practice',
    category: 'milestone',
    start: new TZDate(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    end: new TZDate(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    isReadOnly: true,
  },
  {
    id: '3',
    calendarId: '0',
    title: 'FE Workshop',
    category: 'allday',
    start: new TZDate(today.getFullYear(), today.getMonth(), today.getDate() - 2),
    end: new TZDate(today.getFullYear(), today.getMonth(), today.getDate() - 1),
    isReadOnly: true,
  },
  {
    id: '4',
    calendarId: '0',
    title: 'Report',
    category: 'time',
    start: today,
    end: new TZDate(new Date().setHours(today.getHours() + 1)),
  },
];

const viewModeOptions = [
  {
    title: 'Monthly',
    value: 'month',
  },
  {
    title: 'Weekly',
    value: 'week',
  },
  {
    title: 'Daily',
    value: 'day',
  },
];

const MyCalendar = () => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('');
  const [selectedView, setSelectedView] = useState<ViewType>('month');
  const [calendarInstance, setCalendarInstance] = useState<Calendar | null>(null);

  const getCalInstance = useCallback(() => {
    return calendarInstance;
  }, [calendarInstance]);

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance();
    if (!calInstance) {
      setSelectedDateRangeText('');
      return;
    }

    const viewName = calInstance.getViewName();
    const calDate = calInstance.getDate();
    const rangeStart = calInstance.getDateRangeStart();
    const rangeEnd = calInstance.getDateRangeEnd();

    let year = calDate.getFullYear();
    let month = calDate.getMonth() + 1;
    let date = calDate.getDate();
    let dateRangeText: string;

    switch (viewName) {
      case 'month': {
        dateRangeText = `${year}-${month}`;
        break;
      }
      case 'week': {
        year = rangeStart.getFullYear();
        month = rangeStart.getMonth() + 1;
        date = rangeStart.getDate();
        const endMonth = rangeEnd.getMonth() + 1;
        const endDate = rangeEnd.getDate();

        const start = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
        const end = `${year}-${endMonth < 10 ? '0' : ''}${endMonth}-${
          endDate < 10 ? '0' : ''
        }${endDate}`;
        dateRangeText = `${start} ~ ${end}`;
        break;
      }
      default:
        dateRangeText = `${year}-${month}-${date}`;
    }

    setSelectedDateRangeText(dateRangeText);
  }, [getCalInstance]);

  useEffect(() => {
    updateRenderRangeText();
  }, [selectedView, updateRenderRangeText]);

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = new Calendar(calendarRef.current, {
        defaultView: 'month',
        taskView: true,
        scheduleView: true,
        useCreationPopup: true,
        useDetailPopup: true,
        template: {
          monthDayname: (dayname) => `<span class="calendar-week-dayname-name">${dayname.label}</span>`,
        },
      });

      calendar.createEvents(initialEvents);

      calendar.on('beforeCreateEvent', (eventData) => {
        const event = {
          id: String(Math.random()),
          calendarId: eventData.calendarId || '',
          title: eventData.title,
          category: eventData.isAllday ? 'allday' : 'time',
          start: eventData.start,
          end: eventData.end,
          isAllday: eventData.isAllday,
          location: eventData.location,
          state: eventData.state,
          isPrivate: eventData.isPrivate,
          dueDateClass: '',
        };

        calendar.createEvents([event]);
      });

      calendar.on('beforeDeleteEvent', ({ id, calendarId }) => {
        calendar.deleteEvent(id, calendarId);
      });

      calendar.on('beforeUpdateEvent', ({ event, changes }) => {
        const { id, calendarId } = event;
        calendar.updateEvent(id, calendarId, changes);
      });

      setCalendarInstance(calendar);

      return () => {
        calendar.destroy();
      };
    }
  }, []);

  const onClickNavi = (ev: MouseEvent<HTMLButtonElement>) => {
    if ((ev.target as HTMLButtonElement).tagName === 'BUTTON') {
      const button = ev.target as HTMLButtonElement;
      const actionName = (button.getAttribute('data-action') ?? 'month').replace('move-', '');
      getCalInstance()?.[actionName]();
      updateRenderRangeText();
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <select 
            onChange={(ev: ChangeEvent<HTMLSelectElement>) => setSelectedView(ev.target.value as ViewType)} 
            value={selectedView}
            className="select select-bordered"
          >
            {viewModeOptions.map((option, index) => (
              <option value={option.value} key={index}>
                {option.title}
              </option>
            ))}
          </select>
          <span className="space-x-1">
            <button
              type="button"
              className="btn btn-sm btn-outline"
              data-action="move-today"
              onClick={onClickNavi}
            >
              Today
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              data-action="move-prev"
              onClick={onClickNavi}
            >
              Prev
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              data-action="move-next"
              onClick={onClickNavi}
            >
              Next
            </button>
          </span>
        </div>
        <span className="render-range">{selectedDateRangeText}</span>
      </div>
      <div ref={calendarRef} className="h-[900px] bg-white rounded-lg shadow-md" />
    </div>
  );
};

export default MyCalendar;
