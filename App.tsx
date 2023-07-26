import React from 'react';
import {ThemeProvider} from 'styled-components';
import {ScheduleCalendar} from './src/ScheduleCalendar';
import theme from './src/styles/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ScheduleCalendar />
    </ThemeProvider>
  );
}
