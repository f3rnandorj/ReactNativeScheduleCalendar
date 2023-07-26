import {ViewStyle} from 'react-native';

export default {
  colors: {
    shape: '#FFFFFF',
    shape_contrast: '#000000',
    border: '#8D9295',
    border_light: '#F5F5F4',

    background_shape: '#F9FAFE',

    background_gray_100: '#8D9295',
    background_gray_200: '#F5F5F4',

    background_yellow: '#F9AB28',
    background_blue: '#07617D',

    title: '#2E383F',
    text: '#707070',
  },

  font_size: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 28,
  },
};

export const $shadowProps: ViewStyle = {
  elevation: 7,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 12,
  shadowOffset: {width: 0, height: -3},
};
