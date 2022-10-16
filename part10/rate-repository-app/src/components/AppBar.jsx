import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'

import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: '50px',
    alignItems: 'center',
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link={'/home'}>Repositories</AppBarTab>
        <AppBarTab link={'/signIn'}>Sign in</AppBarTab>
      </ScrollView>
    </View>
  )
}

export default AppBar
