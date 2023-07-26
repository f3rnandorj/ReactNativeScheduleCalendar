import {addWeeks, getWeek, subDays} from 'date-fns';

const currentDate = new Date();

const currentWeek = getWeek(currentDate);

const schedulingBeginsTime1 = new Date(
  new Date().setHours(new Date().getHours() + 1),
);
const schedulingBeginsTime2 = new Date(
  new Date().setHours(new Date().getHours() + 2),
);
const schedulingBeginsTime3 = new Date(
  new Date().setHours(new Date().getHours() + 3),
);

const schedulingBeginsTime4 = new Date(
  new Date().setHours(new Date().getHours() + 4),
);

function calculateTwoDaysLater(date: Date) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 2);
  return newDate;
}

function calculateThreeDaysBeforeNextWeek(date: Date) {
  const nextWeek = addWeeks(date, 1);
  const threeDaysBeforeNextWeek = subDays(nextWeek, 3);
  return threeDaysBeforeNextWeek;
}

const twoDaysLater = calculateTwoDaysLater(currentDate);
const threeDaysBeforeNextWeek = calculateThreeDaysBeforeNextWeek(currentDate);

export const mock = [
  {
    district: 'Ahú',
    inspectionDatabaseId: 75391,
    scheduledAt: currentDate,
    schedulingBeginsTimeAt: schedulingBeginsTime1,
  },
  {
    district: 'Ahú',
    inspectionDatabaseId: 75392,
    scheduledAt: currentDate,
    schedulingBeginsTimeAt: schedulingBeginsTime2,
  },
  {
    district: 'Moema',
    inspectionDatabaseId: 75393,
    scheduledAt: currentDate,
    schedulingBeginsTimeAt: schedulingBeginsTime3,
  },
  {
    district: 'Moema',
    inspectionDatabaseId: 75394,
    scheduledAt: currentDate,
    schedulingBeginsTimeAt: schedulingBeginsTime4,
  },
  {
    district: 'Perdizes',
    inspectionDatabaseId: 75399,
    scheduledAt: twoDaysLater,
    schedulingBeginsTimeAt: schedulingBeginsTime2,
  },
  {
    district: 'Ahú',
    inspectionDatabaseId: 75409,
    scheduledAt: threeDaysBeforeNextWeek,
    schedulingBeginsTimeAt: threeDaysBeforeNextWeek,
  },
];
