import React, {useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Carousel} from './components/Carousel';
import {PickerMonth} from './components/PickerMonth';
import {ScheduleCard, ScheduleCardType} from './components/ScheduleCard';

import {format, isSameDay} from 'date-fns';

import {
  Container,
  ContainerEmptyComponent,
  Day,
  EmptyMessage,
  Header,
  SubHeaderWrapper,
  SubHeader,
  InfoDate,
  Title,
} from './styles';
import {$shadowProps} from '../styles/theme';
import {mock} from './../mock/mockData';

export type DayName = 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb' | 'Dom';

export type MonthName =
  | 'Janeiro'
  | 'Fevereiro'
  | 'Março'
  | 'Abril'
  | 'Maio'
  | 'Junho'
  | 'Julho'
  | 'Agosto'
  | 'Setembro'
  | 'Outubro'
  | 'Novembro'
  | 'Dezembro';

export type PickerMonthProps = {
  name: MonthName;
  monthNumber: number;
};

export type SelectedDate = {
  day: number;
  weekday?: DayName;
  month?: PickerMonthProps;
  year?: number;
  date?: Date;
};

export type SchedulesInspectionsType = {
  inspectionDatabaseId: number;
  scheduledAt: Date;
  schedulingBeginsTimeAt: Date;
  district: string;
};

export function ScheduleCalendar() {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(
    {} as SelectedDate,
  );
  const [selectedMonth, setSelectedMonth] =
    useState<PickerMonthProps>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [schedulesInspections, setSchedulesInspections] =
    useState<SchedulesInspectionsType[]>();

  const schedulesData =
    schedulesInspections && schedulesInspections.length > 0
      ? schedulesInspections?.map(inspections => {
          return inspections.scheduledAt;
        })
      : [];

  const handleGetDate = (chosenDay: SelectedDate) => {
    setSelectedDate(chosenDay);
  };

  const handleGetMonth = (chosenMonth: PickerMonthProps) => {
    setSelectedMonth(chosenMonth);
  };

  const handleGetYear = (chosenYear: number) => {
    setSelectedYear(chosenYear);
  };

  const handleShowPicker = (value: boolean) => {
    setShowPicker(!value);
  };

  const handleShowPickerWithoutFeedBack = () => {
    if (showPicker) {
      setShowPicker(prev => !prev);
    }
  };

  const fetchSchedules = () => {
    const schedulesInspections: SchedulesInspectionsType[] = mock.map(mock => {
      const schedulingBeginsTimeAt = mock.schedulingBeginsTimeAt;
      const scheduledAt = mock.scheduledAt;

      return {
        inspectionDatabaseId: mock.inspectionDatabaseId,
        scheduledAt: new Date(scheduledAt),
        schedulingBeginsTimeAt: new Date(schedulingBeginsTimeAt),
        district: mock.district,
      };
    });

    setSchedulesInspections(schedulesInspections);
  };

  const renderItem = ({item, index}: ListRenderItemInfo<ScheduleCardType>) => {
    return (
      <View onStartShouldSetResponder={() => (showPicker ? false : true)}>
        <ScheduleCard
          numberOfInspections={index}
          hour={item.hour}
          osTitle={item.osTitle}
          info={item.info}
          disabled={showPicker}
        />
      </View>
    );
  };

  const listEmptyComponent = useMemo(() => {
    return (
      <ContainerEmptyComponent style={{...$shadowProps}}>
        <EmptyMessage>Nenhum evento agendado</EmptyMessage>
      </ContainerEmptyComponent>
    );
  }, []);

  const scheduleSelectedDay = useMemo(() => {
    if (!schedulesInspections || schedulesInspections.length === 0) {
      return [];
    }

    return schedulesInspections
      .filter(inspection =>
        isSameDay(inspection.scheduledAt, selectedDate.date!),
      )
      .map(schedule => ({
        osTitle: schedule.inspectionDatabaseId,
        hour: format(schedule.schedulingBeginsTimeAt, 'HH:mm'),
        info: `Bairro: ${schedule.district}`,
      }));
  }, [selectedDate, schedulesInspections]);

  useEffect(() => {
    fetchSchedules();
  }, [selectedDate, selectedMonth, selectedYear]);

  return (
    <TouchableWithoutFeedback onPress={handleShowPickerWithoutFeedBack}>
      <Container>
        <Header>
          <Title>Agenda</Title>
        </Header>

        <SubHeaderWrapper>
          <SubHeader>
            <Day>Hoje</Day>
            <InfoDate>{formattedDate}</InfoDate>
          </SubHeader>
        </SubHeaderWrapper>

        <PickerMonth
          showPicker={showPicker}
          changeShowPicker={handleShowPicker}
          selectedMonth={selectedMonth}
          changeSelectedMonth={handleGetMonth}
          selectedYear={selectedYear}
          changeSelectedYear={handleGetYear}
          months={months}>
          <Carousel
            selectedDate={selectedDate}
            changeSelectedDate={handleGetDate}
            selectedMonth={selectedMonth}
            changeSelectedMonth={handleGetMonth}
            selectedYear={selectedYear}
            changeSelectedYear={handleGetYear}
            months={months}
            schedulesInspections={schedulesData}
          />

          <FlatList
            data={scheduleSelectedDay}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={listEmptyComponent}
          />
        </PickerMonth>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const months: PickerMonthProps[] = [
  {name: 'Janeiro', monthNumber: 0},
  {name: 'Fevereiro', monthNumber: 1},
  {name: 'Março', monthNumber: 2},
  {name: 'Abril', monthNumber: 3},
  {name: 'Maio', monthNumber: 4},
  {name: 'Junho', monthNumber: 5},
  {name: 'Julho', monthNumber: 6},
  {name: 'Agosto', monthNumber: 7},
  {name: 'Setembro', monthNumber: 8},
  {name: 'Outubro', monthNumber: 9},
  {name: 'Novembro', monthNumber: 10},
  {name: 'Dezembro', monthNumber: 11},
];

const weekdays = [
  {name: 'Segunda-feira', day: 0},
  {name: 'Terça-feira', day: 1},
  {name: 'Quarta-feira', day: 2},
  {name: 'Quinta-feira', day: 3},
  {name: 'Sexta-feira', day: 4},
  {name: 'Sábado', day: 5},
  {name: 'Domingo', day: 6},
];

const currentDate = new Date();

const currentMonthIndex = new Date().getMonth();

const currentWeekday = weekdays[currentDate.getDay() - 1].name;
const currentDay = currentDate.getDate();
const currentMonth = months[currentMonthIndex];
const currentYear = new Date().getFullYear();

const formattedDate = `${currentWeekday}, ${currentDay} de ${currentMonth.name} de ${currentYear}`;
