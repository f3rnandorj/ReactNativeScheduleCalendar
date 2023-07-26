import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconProps from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';
import {Styled} from 'styled-components/dist/constructors/constructWithOptions';

type IconNameProps = typeof MaterialIconProps;

type IconType = Styled<
  'native',
  typeof MaterialIcon,
  {name: keyof IconNameProps},
  never
> &
  IconNameProps;

interface ButtonVariants {
  selectedDate?: boolean;
  weekend?: boolean;
  dayWithInspection?: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: ${RFValue(30)}px;
  margin-bottom: ${RFValue(30)}px;

  background-color: ${({theme}) => theme.colors.background_shape};
`;

export const Page = styled.View`
  width: ${Dimensions.get('window').width}px;
  flex-direction: row;
`;

export const DayWrapperButton = styled.TouchableOpacity<ButtonVariants>`
  align-items: center;
  justify-content: center;

  margin: 0 ${RFValue(4)}px 0 ${RFValue(4)}px;
  margin-left: ${RFValue(4)}px;
  margin-right: ${RFValue(4)}px;

  border: 2px solid ${({theme}) => theme.colors.background_gray_200};
  border-radius: ${RFValue(20)}px;

  elevation: 0.2;

  background-color: ${({theme}) => theme.colors.shape};

  ${({selectedDate}) =>
    selectedDate &&
    css`
      background-color: ${({theme}) => theme.colors.background_blue};
    `}

  ${({weekend}) =>
    weekend &&
    css`
      background-color: ${({theme}) => theme.colors.background_gray_200};
    `}

  ${({weekend, selectedDate}) =>
    weekend &&
    selectedDate &&
    css`
      background-color: ${({theme}) => theme.colors.background_blue};
    `}
`;

export const DayTitle = styled.Text<ButtonVariants>`
  color: ${({theme}) => theme.colors.background_blue};
  font-size: ${({theme}) => theme.font_size.sm}px;
  font-weight: bold;

  ${({selectedDate}) =>
    selectedDate &&
    css`
      color: ${({theme}) => theme.colors.shape};
    `}
  ${({weekend}) =>
    weekend &&
    css`
      color: ${({theme}) => theme.colors.background_blue};
    `}
    ${({weekend, selectedDate}) =>
    weekend &&
    selectedDate &&
    css`
      color: ${({theme}) => theme.colors.shape};
    `};
`;

export const DayNumber = styled.Text<ButtonVariants>`
  color: ${({theme}) => theme.colors.background_blue};
  font-size: ${({theme}) => theme.font_size.lg}px;
  font-weight: bold;

  ${({selectedDate}) =>
    selectedDate &&
    css`
      color: ${({theme}) => theme.colors.shape};
    `}

  ${({weekend}) =>
    weekend &&
    css`
      color: ${({theme}) => theme.colors.background_blue};
    `}

  ${({weekend, selectedDate}) =>
    weekend &&
    selectedDate &&
    css`
      color: ${({theme}) => theme.colors.shape};
    `}

    padding-top: ${RFValue(3)}px;
`;

export const ContainerDayNumber = styled.View<ButtonVariants>`
  ${({dayWithInspection}) =>
    dayWithInspection &&
    css`
      border-bottom-width: 2px;
      border-color: ${({theme}) => theme.colors.background_blue};
    `}

  ${({selectedDate, dayWithInspection}) =>
    selectedDate &&
    dayWithInspection &&
    css`
      border-bottom-width: 2px;
      border-color: ${({theme}) => theme.colors.shape};
    `}

  ${({weekend, dayWithInspection}) =>
    weekend &&
    dayWithInspection &&
    css`
      border-bottom-width: 2px;
      border-color: ${({theme}) => theme.colors.background_blue};
    `}

    
    ${({weekend, selectedDate, dayWithInspection}) =>
    weekend &&
    selectedDate &&
    dayWithInspection &&
    css`
      border-bottom-width: 2px;
      border-color: ${({theme}) => theme.colors.shape};
    `}
`;

export const ButtonIcon = styled.TouchableOpacity``;

export const Icon = styled(MaterialIcon).attrs(({theme}) => ({
  size: 36,
  color: theme.colors.shape_contrast,
}))`` as IconType;
