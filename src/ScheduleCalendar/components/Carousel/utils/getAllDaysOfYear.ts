import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getDaysInMonth,
} from 'date-fns';
import { chunk } from 'lodash';
import { DayName, MonthName, SelectedDate } from '../../..';

export type ReturnAllDaysOfYear = {
  daysPerWeek: SelectedDate[][];
  lastDayMonth: number;
};

export function getAllDaysOfYear(
  selectedMonth: number,
  selectedYear: number
): ReturnAllDaysOfYear {
  const startDate = startOfMonth(new Date(selectedYear, selectedMonth, 1));
  const endDate = endOfMonth(new Date(selectedYear, selectedMonth));
  const daysOfYear = eachDayOfInterval({ start: startDate, end: endDate });

  //NOTE: this part add days to complete a week and more one week of last month
  const firstDay = startDate.getDay();
  const lastMonthDays = getDaysInMonth(
    new Date(selectedYear, selectedMonth - 1)
  );
  const howManyDaysHaveToAddAtBeginner = firstDay !== 0 ? firstDay + 7 : 7;
  const daysToAddAtBeginner = Array.from(
    { length: howManyDaysHaveToAddAtBeginner },
    (_, index) =>
      new Date(selectedYear, selectedMonth - 1, lastMonthDays - index)
  ).reverse();

  //NOTE: this part add days to complete a week and more one week of next month
  const lastDay = endDate.getDay();
  const howManyDaysHaveToAddAtEnd = lastDay !== 6 ? 6 - lastDay + 7 : 7;
  const daysToAddAtEnd = Array.from(
    { length: howManyDaysHaveToAddAtEnd },
    (_, index) => new Date(selectedYear, selectedMonth + 1, 1 + index)
  );

  const days = [...daysToAddAtBeginner, ...daysOfYear, ...daysToAddAtEnd].map(
    day => {
      const weekdayShort = new Date(day)
        .toLocaleString('pt-BR', { weekday: 'short' })
        .slice(0, 3) as DayName;

      return {
        day: day.getDate(),
        weekday: (weekdayShort.charAt(0).toUpperCase() +
          weekdayShort.slice(1)) as DayName,
        month: {
          name: getMonthName(day.getMonth()),
          monthNumber: day.getMonth(),
        },
        year: day.getFullYear(),
        date: new Date(
          new Date(
            day.getFullYear(),
            day.getMonth(),
            day.getDate()
          ).setUTCHours(0, 0, 0, 0)
        ),
      };
    }
  );

  const lastDayMonth = getDaysInMonth(new Date(selectedYear, selectedMonth));

  const daysPerWeek = chunk(days, 7);

  return { daysPerWeek, lastDayMonth };
}

function getMonthName(month: number): MonthName {
  const monthNames: MonthName[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  return monthNames[month];
}
