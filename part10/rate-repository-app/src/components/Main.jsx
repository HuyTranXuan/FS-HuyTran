import { Text, StyleSheet, View } from 'react-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Text style={{ fontSize: 20 }}>Rate Repository Application</Text>
      <RepositoryList />
    </View>
  )
}

export default Main
