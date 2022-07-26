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