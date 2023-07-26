import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  position: relative;
  background-color: ${({theme}) => theme.colors.background_shape};
`;

export const Header = styled.View`
  padding: ${RFValue(20)}px ${RFValue(35)}px ${RFValue(20)}px ${RFValue(35)}px;
  background-color: ${({theme}) => theme.colors.dashboard_light};

  border-bottom-left-radius: 40px;
`;

export const SubHeaderWrapper = styled.View`
  border-color: ${({theme}) => theme.colors.dashboard_light};
  background-color: ${({theme}) => theme.colors.dashboard_light};
`;

export const SubHeader = styled.View`
  padding: 0 ${RFValue(35)}px ${RFValue(20)}px ${RFValue(35)}px;
  border-top-right-radius: 20px;
  border-color: ${({theme}) => theme.colors.dashboard_light};
  background-color: ${({theme}) => theme.colors.background_shape};
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.background_primary_dark};
  font-size: ${({theme}) => theme.font_size.xxl}px;
`;

export const Day = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-size: ${({theme}) => theme.font_size.md}px;

  margin-top: ${RFValue(10)}px;
`;

export const InfoDate = styled.Text`
  color: ${({theme}) => theme.colors.dashboard_dark};
  font-size: ${({theme}) => theme.font_size.sm}px;
  font-weight: bold;

  margin-top: ${RFValue(4)}px;
`;

export const Picker = styled.View`
  z-index: 1;
`;

export const ContainerEmptyComponent = styled.View`
  justify-content: center;
  align-items: center;

  min-height: ${RFValue(72)}px;
  margin: ${RFValue(50)}px ${RFValue(35)}px;

  border-radius: ${RFValue(20)}px;
  border-color: ${({theme}) => theme.colors.border};

  background-color: ${({theme}) => theme.colors.background_gray_500};
`;

export const EmptyMessage = styled.Text`
  color: ${({theme}) => theme.colors.background_gray_300};
  font-size: ${({theme}) => theme.font_size.sm}px;
  font-weight: bold;
`;
