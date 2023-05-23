import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
    palette: {
        primary: {
          light: '#3f5db5',
          main: '#3f50b5',
          dark: '#002884',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ff4081',
          main: '#f50057',
          dark: '#c51162',
          contrastText: '#fff',
        },
        tertiary: {
          main: 'rgba(0,0,0, 0.6)',
          dark: 'rgba(0,0,0, 0.9)',
          light: 'rgba(0,0,0, 0.4)',
          contrastText: '#fff',
        },
        fourth: {
          main: '#000',
          dark: 'rgba(0,0,0, 1)',
          light: 'rgba(0,0,0, 0.8)',
          contrastText: '#fff',
        },
        fifth: {
          main: '#fff',
          dark: 'rgba(255,255,255, 1)',
          light: 'rgba(255,255,255, 0.8)',
          contrastText: '#fff',
        },
      },
}); 