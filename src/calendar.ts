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

export type TStartingDay = 0 | 'SUNDAY' | 'Sunday' | 'sunday' | 1 | 'MONDAY' | 'Monday' | 'monday' | 2 | 'TUESDAY' | 'Tuesday' | 'tuesday' | 3 | 'WEDNESDAY' | 'Wednesday' | 'wednesday' | 4 | 'THURSDAY' | 'Thursday' | 'thursday' | 5 | 'FRIDAY' | 'Friday' | 'friday' | 6 | 'SATURDAY' | 'Saturday' | 'saturday';

export interface IOptions {
  startingDay?: TStartingDay | number;
  extraWeek?: boolean;
}

// NOTE : old version is populating `calendar[]` array for 6 indexes.
// the latest need to pass options `extraWeek` as `false` for un-populate the extra row
const MAX_WEEK_ROW = 6;

export const getCalendar = (
  month: number,
  year: number,
  options: IOptions | number = {}, // NOTE : type `number` is a fallback for old version
): ICalendar => {
  const startingDayDefault = 1;
  const extraWeekDefault = true;
  
  // NOTE : Fallback for old version.
  // the latest should use options as an object
  const isLegacy = typeof options === 'number';
  if (isLegacy) {
    options = {
      startingDay: options as number,
      extraWeek: extraWeekDefault
    };
  }

  const {
    startingDay = startingDayDefault,
    extraWeek = extraWeekDefault
  }: any = options;

  let startingDayReAssign = startingDay as number;
  if (typeof startingDay !== 'number') {
    Object.values(WEEKDAYS).forEach((dayName, index) => {
      if (`${startingDay}`.toLowerCase() === dayName.toLowerCase()) {
        startingDayReAssign = index;
      }
    });
  }

  let firstDay = new Date(year, month).getDay();
  // NOTE : `getDay()` will be used as cell-index for property `calendar[]`
  // so, `firstDay` will be offset if `startingDay` is not SUNDAY | 0
  if (startingDayReAssign > 0 && firstDay === 0) {
    firstDay = 7;
  }

  const offsetPrevMonth = firstDay - startingDayReAssign;
  const daysInCalendar = daysInMonth(month, year);
  const calendar: TDate[][] = [];

  const { nextMonth, nextYear } = next(month, year);
  const { previousYear, previousMonth } = previous(month, year);
  const daysInPreviousCalendar = daysInMonth(previousMonth, previousYear);

  let weekIsNextMonth = false;
  let i = 0;
  let date = 1;
  let dateNextMonth = 0;

  while (weekIsNextMonth === false) {
    // Create week array
    calendar.push([]);

    // creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j += 1) {
      if (i === 0 && j < offsetPrevMonth) {
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
        const wholeWeekIsNextMonth = j === 0 && weekIsNextMonth;
        const remainingDays = 7 - (wholeWeekIsNextMonth ? 0 : lastWeek.length);

        for (let x = 0; x < remainingDays; x += 1) {
          const nextMonthDate = new Date(nextYear, nextMonth, dateNextMonth + 1)
          
          dateNextMonth += 1;
          lastWeek.push({
            date: nextMonthDate,
            day: dateNextMonth,
            weekday: WEEKDAYS[nextMonthDate.getDay()],
            isCurrentMonth: false,
          });
        }

        weekIsNextMonth = true;
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

    i += 1;
    const shouldStopPopulate = extraWeek ? i >= MAX_WEEK_ROW : date > daysInCalendar === true;
    weekIsNextMonth = shouldStopPopulate;
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
