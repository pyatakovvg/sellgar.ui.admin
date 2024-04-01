import React from 'react';
import moment, { type Moment } from 'moment';

import { Month } from './Month';
import { Control } from './Control';

import type { ICalendar, ICalendarDay } from './types';

import cn from 'classnames';
import st from './styles/default.module.scss';

class CalendarClass {
  constructor() {
    moment.locale('ru');
  }

  getFirstDayOfMoth(date: Moment) {
    return moment(date).startOf('month').weekday();
  }

  getLastDayOfMoth(date: Moment) {
    return moment(date).endOf('month').weekday();
  }

  getLastDayOfLastMonth(date: Moment) {
    return moment(date).subtract(1, 'months').endOf('month').weekday();
  }

  getLastDateOfLastMonth(date: Moment) {
    return moment(date).subtract(1, 'months').endOf('month').date();
  }

  getLastDateOfMoth(date: Moment) {
    return moment(date).endOf('month').date();
  }

  getCurrentYear(date: Moment) {
    return moment(date).year();
  }

  getCurrentMonth(date: Moment) {
    return moment(date).month();
  }

  getCurrentDay(date: Moment) {
    return moment(date).date();
  }

  getMonthDays(date: Moment) {
    let dayIndex: number = 1;
    let weekIndex: number = 0;

    const monthDays: ICalendarDay[][] = [];

    const currentYear = this.getCurrentYear(date);
    const currentMonth = this.getCurrentMonth(date);

    const firstDayOfMonth = this.getFirstDayOfMoth(date);
    const lastDateOfLastMonth = this.getLastDateOfLastMonth(date);
    const lastDateOfMonth = this.getLastDateOfMoth(date);

    do {
      let dow = moment(date).set('date', dayIndex).weekday();

      if (dow === 0) {
        weekIndex++;
      }

      if (!monthDays[weekIndex]) {
        monthDays[weekIndex] = [];
      }

      // Если первый день недели не понедельник показать последние дни предидущего месяца
      if (dow !== 0 && dayIndex === 1) {
        let k = lastDateOfLastMonth - firstDayOfMonth + 1;
        for (let j = 1; j <= firstDayOfMonth; j++) {
          const day = moment(date).subtract(1, 'month').date(k);
          monthDays[weekIndex].push({
            type: 'prev-month-day',
            isWeekend: day.weekday() === 5 || day.weekday() === 6,
            value: day,
          });
          k++;
        }
      }

      // Записываем текущий день в цикл
      const chk = moment();

      if (chk.year() === currentYear && chk.month() === currentMonth && chk.date() === dayIndex) {
        monthDays[weekIndex].push({
          type: 'today',
          isWeekend: dow === 5 || dow === 6,
          value: moment(date).date(dayIndex),
        });
      } else {
        monthDays[weekIndex].push({
          type: 'day',
          isWeekend: dow === 5 || dow === 6,
          value: moment(date).date(dayIndex),
        });
      }

      if (dayIndex === lastDateOfMonth) {
        // Если последний день месяца не воскресенье, показать первые дни следующего месяца
        let k = 1;
        for (dow; dow < 6; dow++) {
          const day = moment(date).add(1, 'month').set('date', k);
          monthDays[weekIndex].push({
            type: 'next-month-day',
            isWeekend: day.weekday() === 5 || day.weekday() === 6,
            value: day,
          });
          k++;
        }
      }

      dayIndex++;
    } while (dayIndex <= lastDateOfMonth);

    return monthDays;
  }
}

export const Calendar = (props: ICalendar) => {
  const init = React.useRef(false);
  const { current: calendar } = React.useRef<CalendarClass>(new CalendarClass());

  const [date, setDate] = React.useState<Moment>(moment(props.value || undefined));
  const [value, setValue] = React.useState<Moment | null>(props.value ? moment(props.value) : null);
  const weeks = React.useMemo(() => calendar.getMonthDays(date), [date]);

  React.useEffect(() => {
    if (init.current) {
      setDate(moment(props.value || undefined));
    }
  }, [props.value]);

  React.useEffect(() => {
    if (init.current) {
      if (!value) {
        return void 0;
      }
      if (props.isUTC) {
        props.onChange(value.utc().format(props?.format ?? 'YYYY-MM-DDTHH:mm:ss.SSSZ'));
        return void 0;
      }
      props.onChange(value.format(props?.format ?? 'YYYY-MM-DDTHH:mm:ss.SSSZ'));
    } else {
      init.current = true;
    }
  }, [value]);

  const handleSetDate = (day: ICalendarDay) => {
    setValue(day.value);
  };

  const handlePrevMonth = () => {
    setDate(moment(date).subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setDate(moment(date).add(1, 'month'));
  };

  const handlePrevYear = () => {
    setDate(moment(date).subtract(1, 'year'));
  };

  const handleNextYear = () => {
    setDate(moment(date).add(1, 'year'));
  };

  return (
    <div className={st.wrapper}>
      <div className={st.control}>
        <Control
          value={date}
          disabled={props.disabled}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onPrevYear={handlePrevYear}
          onNextYear={handleNextYear}
        />
      </div>
      <div className={st.days}>
        <div className={st.day}>Пн</div>
        <div className={st.day}>Вт</div>
        <div className={st.day}>Ср</div>
        <div className={st.day}>Чт</div>
        <div className={st.day}>Пт</div>
        <div className={cn(st.day, st.weekend)}>Сб</div>
        <div className={cn(st.day, st.weekend)}>Вс</div>
      </div>
      <div className={st.dates}>
        <Month
          isUTC={props.isUTC}
          value={value}
          weeks={weeks}
          fromDate={props.fromDate}
          toDate={props.toDate}
          disabled={props.disabled}
          onChange={handleSetDate}
        />
      </div>
    </div>
  );
};
