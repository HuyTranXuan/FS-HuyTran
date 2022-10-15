import { View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab>Repository</AppBarTab>
      <AppBarTab>Test button</AppBarTab>
    </View>
  )
}

export default AppBar
