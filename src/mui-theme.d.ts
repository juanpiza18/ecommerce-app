import {
    PaletteColor,
    Palette as MuiPalette,
    PaletteOptions as MuiPaletteOptions,
  } from '@mui/material';
  


declare module '@mui/material/styles/createPalette' {
    interface Palette extends MuiPalette {
      tertiary: PaletteColor;
      fourth: PaletteColor;
      fifth: PaletteColor;
    }
    interface PaletteOptions extends MuiPaletteOptions {
      tertiary: PaletteColor;
      fourth: PaletteColor;
      fifth: PaletteColor;
    }
}

declare module '@mui/material/Button' {
    export interface ButtonPropsColorOverrides {
      tertiary: true;
      fourth: true;
    }
  }