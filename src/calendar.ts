export type TWeekdays = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

const WEEKDAYS: { [key: number]: TWeekdays } = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
}

export type TNextMonth = {
  nextMonth: number;
  nextYear: number;
};

const next = (month: number, year: number): TNextMonth => {
  const nextYear = month === 11 ? year + 1 : year;
  const nextMonth = (month + 1) % 12;
  return { nextYear, nextMonth };
};

export type TPreviousMonth = {
  previousMonth: number;
  previousYear: number;
};

const previous = (month: number, year: number): TPreviousMonth => {
  const previousYear = month === 0 ? year - 1 : year;
  const previousMonth = month === 0 ? 11 : month - 1;
  return { previousYear, previousMonth };
};

export const daysInMonth = (month: number, year: number): number => {
  return 32 - new Date(year, month, 32).getDate();
};

export type TDate = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  weekday: TWeekdays
};

export interface ICalendar {
  calendar: TDate[][];
  month: number;
  year: number;
  next: {
    month: number;
    year: number;
  };
  previous: {
    month: number;
    year: number;
  };
}

export const getCalendar = (month: number, year: number, startingDay: number = 1): ICalendar => {
  let firstDay = new Date(year, month).getDay();

  // NOTE : getDay() will return 0 when 1st day of the week occurs on Sunday
  if (firstDay === 0) {
    firstDay = 7;
  }

  const daysInCalendar = daysInMonth(month, year);
  const calendar: TDate[][] = [];

  const { nextMonth, nextYear } = next(month, year);
  const { previousYear, previousMonth } = previous(month, year);
  const daysInPreviousCalendar = daysInMonth(previousMonth, previousYear);

  let date = 1;

  for (let i = 0; i < 6; i += 1) {
    // Create week array
    calendar.push([]);

    // creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j += 1) {
      if (i === 0 && j < firstDay - startingDay) {
        const previousMonthDate = new Date(previousYear, previousMonth, daysInPreviousCalendar - j)

        // Add previous month date
        calendar[i].unshift({
          date: previousMonthDate,
          day: daysInPreviousCalendar - j,
          weekday: WEEKDAYS[previousMonthDate.getDay()],
          isCurrentMonth: false,
        });
      } else if (date > daysInCalendar) {
        // Next month date
        const lastIndex = calendar.length - 1;
        const lastWeek = calendar[lastIndex];
        const lastWeekLength = lastWeek.length;
        const remainingDays = 7 - lastWeekLength;

        for (let x = 0; x < remainingDays; x += 1) {
          const nextMonthDate = new Date(nextYear, nextMonth, x + 1)

          lastWeek.push({
            date: nextMonthDate,
            day: x + 1,
            weekday: WEEKDAYS[nextMonthDate.getDay()],
            isCurrentMonth: false,
          });
        }

        break;
      } else {
        const currentMonthDate = new Date(year, month, date)

        // Add current month date
        calendar[i].push({
          date: currentMonthDate,
          day: date,
          weekday: WEEKDAYS[currentMonthDate.getDay()],
          isCurrentMonth: true,
        });

        date += 1;
      }
    }
  }

  return {
    calendar,
    month,
    year,
    next: {
      month: nextMonth,
      year: nextYear,
    },
    previous: {
      month: previousMonth,
      year: previousYear,
    },
  };
};
