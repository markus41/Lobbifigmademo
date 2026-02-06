import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#0B1437',
        color: 'white',
        fontFamily: `'DM Sans', sans-serif`,
      },
    },
  },
  colors: {
    navy: {
      50: '#d0dcfb',
      100: '#aac0fe',
      200: '#a3b9f8',
      300: '#728fea',
      400: '#3652ba',
      500: '#1b3bbb',
      600: '#24388a',
      700: '#1B254B',
      800: '#111C44',
      900: '#0B1437',
    },
    brand: {
      50: '#E9E3FF',
      100: '#C0B8FE',
      200: '#A195FD',
      300: '#8171FC',
      400: '#7551FF',
      500: '#4318FF',
      600: '#3311DB',
      700: '#2111A5',
      800: '#190793',
      900: '#11047A',
    },
  },
  fonts: {
    heading: `'DM Sans', sans-serif`,
    body: `'DM Sans', sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '14px',
        fontWeight: 'bold',
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: '14px',
        },
      },
    },
  },
});

export default theme;
