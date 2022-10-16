import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: Platform.select({
    android: 'Roboto',
    ios: 'Arial',
    default: 'System',
  }),
  fColors: Platform.select({
    android: 'green',
    ios: 'blue',
    default: 'black',
  }),
  fontWeights: {
    normal: '400',
    bold: '700',
  },
}

export default theme
