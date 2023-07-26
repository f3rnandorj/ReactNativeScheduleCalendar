import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
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

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background_shape};
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  align-self: center;
  align-items: center;

  margin-top: ${RFValue(20)}px;
`;

export const DropDownButton = styled.TouchableOpacity``;

export const Wrapper = styled.View`
  position: absolute;
  max-height: 300px;
`;

export const DropDown = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 15,
  },
})`
  height: 100%;
  width: 100%;

  elevation: 4;
  border: 1px solid ${({theme}) => theme.colors.background_gray_200};

  background-color: ${({theme}) => theme.colors.background_shape};
`;

export const MonthButton = styled.TouchableOpacity`
  margin-top: ${RFValue(15)}px;
`;

export const MonthTitle = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-size: ${({theme}) => theme.font_size.md}px;
  text-align: center;
`;

export const MonthAndYear = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-size: ${({theme}) => theme.font_size.lg}px;
  font-weight: bold;

  text-align: center;
`;

export const ButtonIcon = styled.TouchableOpacity.attrs({
  hitSlop: 10,
})`
  margin: 0 ${RFValue(10)}px 0 ${RFValue(10)}px;
`;

export const Icon = styled(MaterialIcon).attrs(({theme}) => ({
  size: 30,
  color: theme.colors.title,
}))`` as IconType;
