import {ViewStyle} from 'react-native';

export default {
  colors: {
    shape: '#FFFFFF',
    shape_dark: '#000000',
    border: '#8D9295',
    border_light: '#F5F5F4',

    background_shape: '#F9FAFE',
    background_primary_dark: '#000000',
    background_primary_light: '#2E383F',

    background_gray_100: '#2E383F',
    background_gray_200: '#707070',
    background_gray_300: '#8D9295',
    background_gray_400: '#C4C4C4',
    background_gray_500: '#ECECEB',
    background_gray_600: '#F2F2F2',
    background_gray_700: '#F5F5F4',

    dashboard_light: '#F9AB28',
    dashboard_dark: '#07617D',

    home_room_card_title: '#07617D',
    text: '#707070',
    text_detail: '#8D9295',
    text_off: '#C4C4C4',
    title: '#2E383F',
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
