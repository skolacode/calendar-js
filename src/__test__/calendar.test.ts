import { daysInMonth, getCalendar } from '../'

test('test daysInMonth function', () => {
  expect(daysInMonth(0, 2022)).toBe(31)
})

test('test getCalendar function', () => {
  const july2022Calendar = getCalendar(6, 2022)

  // First array in the calendar
  expect(july2022Calendar.calendar[0][0].day).toEqual(27)
  expect(july2022Calendar.calendar[0][0].isCurrentMonth).toEqual(false)
  expect(july2022Calendar.calendar[0][0].weekday).toEqual('Monday')

  // Last array in the calendar
  expect(july2022Calendar.calendar[5][6].day).toEqual(7)
  expect(july2022Calendar.calendar[5][6].isCurrentMonth).toEqual(false)
  expect(july2022Calendar.calendar[5][6].weekday).toEqual('Sunday')
})

// failed story : https://github.com/skolacode/calendar-js/issues/2
// sample data : November 2022 - Week 5 ended on the 4th, and Week 6 began on the 1st, not the 5th.
test('test first day of 6th week should be December 5, Monday', () => {
  const dateCal = getCalendar(10, 2022);
  const totalWeek = dateCal.calendar.length;
  expect(dateCal.calendar[totalWeek - 1][0].day).toEqual(5);
  expect(dateCal.calendar[totalWeek - 1][0].weekday).toEqual('Monday')
})
