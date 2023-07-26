import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;

  height: ${RFValue(92)}px;
  padding: 0 ${RFValue(48)}px 0 ${RFValue(48)}px;
`;

export const LeftSide = styled.View`
  flex-direction: column;
  height: ${RFValue(92)}px;

  border-left-width: ${RFValue(2)}px;
  border-color: ${({theme}) => theme.colors.border};
`;

export const TimeWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: ${RFValue(92)}px;
`;

export const Marker = styled.View`
  height: ${RFValue(12)}px;
  width: ${RFValue(12)}px;

  margin-left: ${RFValue(-7)}px;
  margin-bottom: ${RFValue(20)}px;
  border-radius: ${RFValue(50)}px;
`;

export const Hour = styled.Text`
  color: ${({theme}) => theme.colors.shape_contrast};
  font-size: ${({theme}) => theme.font_size.md}px;

  margin-left: ${RFValue(7)}px;
  margin-bottom: ${RFValue(20)}px;
`;

export const RightSide = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  justify-content: center;

  background-color: ${({theme}) => theme.colors.background_gray_200};

  margin-left: ${RFValue(18)}px;
  padding-left: ${RFValue(26)}px;
  margin-bottom: ${RFValue(20)}px;

  border-radius: ${RFValue(10)}px;
  border-left-width: ${RFValue(3)}px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-size: ${({theme}) => theme.font_size.sm}px;
`;

export const SubTitle = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.font_size.sm}px;
`;
