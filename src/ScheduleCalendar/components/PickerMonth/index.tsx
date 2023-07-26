import React, {useState} from 'react';
import {Dimensions, LayoutChangeEvent, View, ViewProps} from 'react-native';

import {PickerMonthProps} from '../..';

import {
  ButtonIcon,
  ButtonWrapper,
  Container,
  DropDown,
  DropDownButton,
  Icon,
  MonthAndYear,
  MonthButton,
  MonthTitle,
  Wrapper,
} from './styles';

interface Props extends ViewProps {
  months: PickerMonthProps[];
  showPicker: boolean;
  changeShowPicker: (value: boolean) => void;
  selectedMonth: PickerMonthProps;
  changeSelectedMonth: (month: PickerMonthProps) => void;
  selectedYear: number;
  changeSelectedYear: (year: number) => void;
}

export function PickerMonth({
  months,
  showPicker,
  changeShowPicker,
  selectedMonth,
  changeSelectedMonth,
  selectedYear,
  changeSelectedYear,
  children,
  ...viewProps
}: Props) {
  const [top, setTop] = useState(0);

  const dimension = Dimensions.get('window').width;
  const left = (dimension - 170) / 2;

  const onLayout = (event: LayoutChangeEvent) => {
    const {height, y} = event.nativeEvent.layout;
    setTop(height + y);
  };

  const changeMonth = (mode: 'last' | 'next') => {
    const currentMonthNumber = selectedMonth.monthNumber;
    const isFirstMonth = currentMonthNumber === 0;
    const isLastMonth = currentMonthNumber === 11;

    const changeMonthMap = {
      last: months[currentMonthNumber - 1],
      next: months[currentMonthNumber + 1],
    };

    if (mode === 'next' && isLastMonth) {
      changeSelectedMonth(months[0]);
      changeSelectedYear(selectedYear + 1);
    } else if (mode === 'last' && isFirstMonth) {
      changeSelectedMonth(months[11]);
      changeSelectedYear(selectedYear - 1);
    } else {
      changeSelectedMonth(changeMonthMap[mode]);
    }
  };

  return (
    <Container {...viewProps}>
      <ButtonWrapper onLayout={onLayout}>
        <ButtonIcon onPress={() => changeMonth('last')}>
          <Icon name="chevron-left" />
        </ButtonIcon>

        <DropDownButton
          activeOpacity={0.7}
          onPress={() => changeShowPicker(showPicker)}>
          <MonthAndYear>
            {selectedMonth?.name}, {selectedYear}
          </MonthAndYear>
        </DropDownButton>

        <ButtonIcon onPress={() => changeMonth('next')}>
          <Icon name="chevron-right" />
        </ButtonIcon>
      </ButtonWrapper>

      {showPicker && (
        <Wrapper
          style={{
            top,
            left,
            width: 170,
            zIndex: 1,
          }}>
          <DropDown>
            {months.map((month, index) => (
              <MonthButton
                key={month.name}
                hitSlop={10}
                onPress={() => {
                  changeShowPicker(showPicker);
                  changeSelectedMonth(month);
                }}>
                <MonthTitle>{month.name}</MonthTitle>
              </MonthButton>
            ))}
          </DropDown>
        </Wrapper>
      )}

      <View style={{flex: 1}}>{children}</View>
    </Container>
  );
}
