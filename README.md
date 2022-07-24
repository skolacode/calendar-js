## CalendarJS

A simple and light weight JavaScript calendar generator.

### Installation

```
npm install @skolacode/calendar-js

// or

yarn add @skolacode/calendar-js
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
      {
        date: 2022-06-26T16:00:00.000Z,
        day: 27,
        weekday: 'Monday',
        isCurrentMonth: false
      },
      {
        date: 2022-06-27T16:00:00.000Z,
        day: 28,
        weekday: 'Tuesday',
        isCurrentMonth: false
      },
      {
        date: 2022-06-28T16:00:00.000Z,
        day: 29,
        weekday: 'Wednesday',
        isCurrentMonth: false
      },
      {
        date: 2022-06-29T16:00:00.000Z,
        day: 30,
        weekday: 'Thursday',
        isCurrentMonth: false
      },
      {
        date: 2022-06-30T16:00:00.000Z,
        day: 1,
        weekday: 'Friday',
        isCurrentMonth: true
      },
      {
        date: 2022-07-01T16:00:00.000Z,
        day: 2,
        weekday: 'Saturday',
        isCurrentMonth: true
      }
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

**getCalendar(month: number, year: number, startingDay?: number)**

Parameters

| Name        | Type   | Required | Default | Description                                                    |
| ----------- | ------ | -------- | ------- | -------------------------------------------------------------- |
| month       | Number | Yes      | -       | The month of the calendar (0 to 11). 0 = January, 1 = February |
| year        | Number | Yes      | -       | The year of the calendar                                       |
| startingDay | Number | No       | 1       | The starting day of the week (0 to 6). 0 = Sunday, 1 = Monday  |

---

**daysInMonth(month: number, year: number)**

Return the total number of days in a month.

Parameters

| Name  | Type   | Required | Default | Description                                                    |
| ----- | ------ | -------- | ------- | -------------------------------------------------------------- |
| month | Number | Yes      | -       | The month of the calendar (0 to 11). 0 = January, 1 = February |
| year  | Number | Yes      | -       | The year of the calendar                                       |

### Contributing

Pull Request:

- Fork this repo
- Create new branch for bug fixes or new feature
- Create/update test files
- Make sure build run successfully

Contribution are always open. Report issues or feature requests on [GitHub Issues](https://github.com/skolacode/calendar-js/issues)
