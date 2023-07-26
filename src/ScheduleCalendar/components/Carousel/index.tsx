import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {
  Dimensions,
  FlatList,
  LayoutChangeEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewProps,
  ActivityIndicator,
} from 'react-native';

import {PickerMonthProps, SchedulesInspectionsType, SelectedDate} from '../..';
import {getAllDaysOfYear} from './utils/getAllDaysOfYear';
import {isSameDay} from 'date-fns';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  ButtonIcon,
  Container,
  ContainerDayNumber,
  DayNumber,
  DayTitle,
  DayWrapperButton,
  Icon,
  Page,
} from './styles';

interface Props extends ViewProps {
  selectedDate: SelectedDate;
  changeSelectedDate: (date: SelectedDate) => void;
  selectedMonth: PickerMonthProps;
  changeSelectedMonth: (month: PickerMonthProps) => void;
  selectedYear: number;
  changeSelectedYear: (year: number) => void;
  months: PickerMonthProps[];
  schedulesInspections: SchedulesInspectionsType['scheduledAt'][];
}

export function Carousel({
  selectedDate,
  changeSelectedDate,
  selectedMonth,
  changeSelectedMonth,
  selectedYear,
  changeSelectedYear,
  months,
  schedulesInspections,
  ...viewProps
}: Props) {
  const [allDaysOfYear, setAllDaysOfYear] = useState<SelectedDate[][]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lastWeekInMonth, setLastWeekInMonth] = useState<number>(0);
  const [startWeekIndex, setStartWeekIndex] = useState<number>(0);
  const [startSelectedDay, setStartSelectedDay] = useState<SelectedDate>(
    {} as SelectedDate,
  );
  const [iconDimensions, setIconDimensions] = useState<number>(0);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [isNextMonth, setIsNextMonth] = useState(false);
  const [isCallable, setIsCallable] = useState(true);
  const [isUsedButton, setIsUsedButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  const screenWidth = Dimensions.get('window').width;
  const spaceMargeArea = screenWidth - (iconDimensions + RFValue(56));
  const dimension = spaceMargeArea / 7;

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentShowedMonth = allDaysOfYear?.[currentPage]?.[6]?.month;
  const currentShowedYear = allDaysOfYear?.[currentPage]?.[6]?.year;
  const lastMonth = months[selectedMonth?.monthNumber - 1];
  const nextMonth = months[selectedMonth?.monthNumber + 1];

  const onLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setIconDimensions(width * 2);
  };

  const getItemLayout = (_: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  const initialScrollIndex = () => {
    if (allDaysOfYear.length === 0 || !selectedMonth) {
      return;
    }

    if (allDaysOfYear.length > 0) {
      if (currentMonth === selectedMonth.monthNumber) {
        changeSelectedDate(startSelectedDay);
        setCurrentPage(startWeekIndex);
      }

      if (currentMonth !== selectedMonth.monthNumber) {
        const newSelectedDate = allDaysOfYear.find(week => {
          return week.find(day => day.day === 0o1);
        });
        const firstDayOfMonth = newSelectedDate?.find(day => day.day === 1);

        changeSelectedDate(firstDayOfMonth!);
        setCurrentPage(1);
      }
    }
  };

  const handleNextPage = (mode: 'next' | 'last') => {
    setIsUsedButton(true);
    setCurrentPage(prev => (mode === 'next' ? prev + 1 : prev - 1));
  };

  const renderItem = ({item}: ListRenderItemInfo<SelectedDate[]>) => {
    return (
      <Page>
        {item.map(date => {
          const weekend = date.weekday === 'Dom' || date.weekday === 'Sáb';
          const selectedDateOption = date === selectedDate;
          const dayWithInspection = schedulesInspections.some(s =>
            isSameDay(s, date.date!),
          );

          return (
            <DayWrapperButton
              key={date.day}
              onPress={() => changeSelectedDate(date)}
              selectedDate={selectedDateOption}
              weekend={weekend}
              activeOpacity={0.5}
              style={{
                height: 2 * dimension,
                width: dimension,
              }}>
              <DayTitle selectedDate={selectedDateOption} weekend={weekend}>
                {date.weekday}
              </DayTitle>

              <ContainerDayNumber
                selectedDate={selectedDateOption}
                dayWithInspection={dayWithInspection}
                weekend={weekend}>
                <DayNumber selectedDate={selectedDateOption} weekend={weekend}>
                  {String(date.day).padStart(2, '0')}
                </DayNumber>
              </ContainerDayNumber>
            </DayWrapperButton>
          );
        })}
      </Page>
    );
  };

  const changeScrollEnabled = () => {
    if (currentPage + 1 === lastWeekInMonth) {
      setScrollEnabled(false);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isCallable) {
      return;
    }

    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / screenWidth);

    setCurrentPage(page);
  };

  //NOTE: it's responsible to enable scroll when don't need wait to change month
  useEffect(() => {
    if (currentPage !== lastWeekInMonth) {
      setTimeout(() => {
        setScrollEnabled(true);
      }, 1500);
    }
  });

  //NOTE: it's responsible to show loading in the first time when the component is mounted
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  //NOTE: This useEffect is responsible to load days of selected month and select start week and selected current day
  useEffect(() => {
    const {daysPerWeek} = getAllDaysOfYear(
      selectedMonth.monthNumber,
      selectedYear,
    );

    const startWeekIndex = daysPerWeek.findIndex(week =>
      week.some(day => {
        const isSameDay =
          day.day === currentDay &&
          day?.month?.monthNumber === selectedMonth?.monthNumber;
        return isSameDay;
      }),
    );

    const startDay = daysPerWeek[startWeekIndex]?.find(
      day => day.day === currentDay,
    );

    const lastWeekInMonth = daysPerWeek.findIndex(week => {
      const monthOfReturnYear =
        selectedMonth.monthNumber === 11 ? 0 : selectedMonth.monthNumber + 1;

      const hasFirstDayNextMonth = week.some(
        day => day.day === 1 && day.month?.monthNumber === monthOfReturnYear,
      );

      return hasFirstDayNextMonth;
    });

    setAllDaysOfYear(daysPerWeek);
    setLastWeekInMonth(lastWeekInMonth);
    setStartWeekIndex(startWeekIndex);
    setStartSelectedDay(startDay!);
  }, [selectedMonth]);

  //NOTE: This useEffect is responsible to change page when user uses buttons to change week and change selected month when it pass to another month
  useEffect(() => {
    if (allDaysOfYear.length > 0 && currentPage >= 0) {
      const offsetX = currentPage * screenWidth;
      flatListRef.current?.scrollToOffset({
        offset: offsetX,
        animated: isCallable,
      });

      if (currentShowedMonth?.monthNumber === selectedMonth.monthNumber) {
        return;
      }

      if (currentShowedYear !== selectedYear && currentPage === 0) {
        setIsCallable(false);
        changeSelectedMonth(months[11]);
        changeSelectedYear(currentShowedYear!);
        return;
      }

      if (currentShowedYear !== selectedYear) {
        setIsCallable(false);
        setIsNextMonth(true);
        changeSelectedMonth(months[0]);
        changeSelectedYear(currentShowedYear!);
        return;
      }

      if (
        currentShowedMonth?.monthNumber !== selectedMonth.monthNumber &&
        currentPage === 0
      ) {
        setIsCallable(false);
        changeSelectedMonth(lastMonth!);
        return;
      }

      if (currentShowedMonth?.monthNumber! !== selectedMonth.monthNumber) {
        setIsCallable(false);
        setIsNextMonth(true);
        changeSelectedMonth(nextMonth);
      }
    }
  }, [currentPage]);

  //NOTE: it's responsible to change selected date to the current date of the month or the last week of last month
  useEffect(() => {
    if (isCallable) {
      initialScrollIndex();
    } else {
      if (isNextMonth) {
        isUsedButton
          ? setTimeout(() => {
              setCurrentPage(1);
            }, 300)
          : setCurrentPage(1);
      } else {
        isUsedButton
          ? setTimeout(() => {
              setCurrentPage(lastWeekInMonth - 1);
            }, 300)
          : setCurrentPage(lastWeekInMonth - 1);
      }
    }
    setIsUsedButton(false);

    setTimeout(() => {
      setIsCallable(true);
      setIsNextMonth(false);
    }, 500);
  }, [allDaysOfYear]);

  return (
    <Container style={{height: 2 * dimension}} {...viewProps}>
      <ButtonIcon onPress={() => handleNextPage('last')} onLayout={onLayout}>
        <Icon name="chevron-left" />
      </ButtonIcon>

      {isLoading ? (
        <ActivityIndicator size={22} style={{flex: 1}} />
      ) : (
        <FlatList
          ref={flatListRef}
          horizontal
          snapToInterval={screenWidth}
          decelerationRate={0.5}
          initialScrollIndex={currentPage}
          scrollEnabled={scrollEnabled}
          onMomentumScrollBegin={changeScrollEnabled}
          onMomentumScrollEnd={handleScroll}
          getItemLayout={getItemLayout}
          maxToRenderPerBatch={7}
          showsHorizontalScrollIndicator={false}
          data={allDaysOfYear}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => renderItem(item)}
        />
      )}

      <ButtonIcon onPress={() => handleNextPage('next')}>
        <Icon name="chevron-right" />
      </ButtonIcon>
    </Container>
  );
}
