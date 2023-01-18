## CalendarJS [![NPM link](https://img.shields.io/badge/%40skolacode%2Fcalendar--js-npm-red)](https://www.npmjs.com/package/@skolacode/calendar-js)

> A simple and light weight JavaScript calendar generator.

### Installation

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save @skolacode/calendar-js
```

Install with [yarn](https://yarnpkg.com):

```sh
$ yarn add @skolacode/calendar-js
```

### Usage

```
import { getCalendar } from '@skolacode/calendar-js'

const july2022Calendar = getCalendar(6, 2022)

console.log(july2022Calendar)

/**
response:
{
  calendar: [
    [
      {
        date: 2022-06-25T16:00:00.000Z,
        day: 26,
        weekday: 'Sunday',
        isCurrentMonth: false
      },
      ...
    ],
    [...],
    ....
  month: 6,
  year: 2022,
  next: { month: 7, year: 2022 },
  previous: { month: 5, year: 2022 }
}
*/
```

### Methods

**getCalendar(month: number, year: number, options?: [IOptions](#types)): [ICalendar](#types)**

Parameters

| Name        | Type   | Required | Default | Description                                                    |
| ----------- | ------ | -------- | ------- | -------------------------------------------------------------- |
| month       | Number | Yes      | -       | The month of the calendar (0 to 11). 0 = January, 1 = February |
| year        | Number | Yes      | -       | The year of the calendar                                       |
| options.startingDay | [TStartingDay](#types) | No       | 1       | The starting day of the week (0 to 6). 0 = Sunday, 1 = Monday  |
| options.extraWeek | Boolean | No       | true       | Calendar rows are fixed to 6 regardless of all the 6th week consists of days for next month  |

---

**daysInMonth(month: number, year: number): number**

Return the total number of days in a month.

Parameters

| Name  | Type   | Required | Default | Description                                                    |
| ----- | ------ | -------- | ------- | -------------------------------------------------------------- |
| month | Number | Yes      | -       | The month of the calendar (0 to 11). 0 = January, 1 = February |
| year  | Number | Yes      | -       | The year of the calendar                                       |

### Types

```jsx
type TWeekdays = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

type TDate = {
  date: Date,
  day: number,
  isCurrentMonth: boolean,
  weekday: TWeekdays,
};

interface ICalendar {
  calendar: TDate[][];
  month: number;
  year: number;
  next: {
    month: number,
    year: number,
  };
  previous: {
    month: number,
    year: number,
  };
}

export type TStartingDay = 0 | 'SUNDAY' | 'Sunday' | 'sunday' | 1 | 'MONDAY' | 'Monday' | 'monday' | 2 | 'TUESDAY' | 'Tuesday' | 'tuesday' | 3 | 'WEDNESDAY' | 'Wednesday' | 'wednesday' | 4 | 'THURSDAY' | 'Thursday' | 'thursday' | 5 | 'FRIDAY' | 'Friday' | 'friday' | 6 | 'SATURDAY' | 'Saturday' | 'saturday';

export interface IOptions {
  startingDay?: TStartingDay | number;
  extraWeek?: boolean;
}
```

### Contributing

Pull Request:

- Fork this repo
- Create new branch for bug fixes or new feature
- Create/update test files
- Make sure build run successfully

Contribution are always open. Report issues or feature requests on [GitHub Issues](https://github.com/skolacode/calendar-js/issues)
