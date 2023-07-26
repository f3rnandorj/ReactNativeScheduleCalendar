import {TouchableOpacityProps, ViewStyle} from 'react-native';
import {$shadowProps} from '../../../styles/theme';

import {
  Container,
  Hour,
  LeftSide,
  Marker,
  RightSide,
  SubTitle,
  TimeWrapper,
  Title,
} from './styles';

type Colors = {
  [key: string]: string;
};

interface Props extends TouchableOpacityProps {
  numberOfInspections: number;
  hour: string;
  osTitle: number;
  info: string;
}

export type ScheduleCardType = Pick<Props, 'hour' | 'osTitle' | 'info'>;

export function ScheduleCard({
  numberOfInspections,
  hour,
  osTitle,
  info,
  ...touchableOpacityProps
}: Props) {
  const cardColor = colors[getColorKey(numberOfInspections)];

  return (
    <Container>
      <LeftSide>
        <TimeWrapper>
          <Marker
            style={{
              backgroundColor: cardColor,
            }}
          />
          <Hour>{hour}</Hour>
        </TimeWrapper>
      </LeftSide>

      <RightSide
        style={[
          {...$shadowProps},
          {
            borderColor: cardColor,
          },
        ]}
        {...touchableOpacityProps}>
        <Title>OS {osTitle}</Title>
        <SubTitle>{info}</SubTitle>
      </RightSide>
    </Container>
  );
}

const colors: Colors = {
  first: '#F8BF65',
  second: '#5CBFBD',
  third: '#CE60C6',
  fourth: '#586FCE',
};

const getColorKey = (number: number): string => {
  const colorKeys = Object.keys(colors);
  const index = number % colorKeys.length;
  return colorKeys[index];
};
