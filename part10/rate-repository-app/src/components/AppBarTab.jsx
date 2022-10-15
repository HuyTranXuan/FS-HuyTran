import { StyleSheet, Pressable, Text } from 'react-native'

const styles = StyleSheet.create({
  flexItem: {},
  text: {
    color: '#fff',
    padding: '20',
    flexDirection: 'flex-start',
  },
})

const AppBarTab = ({ ...props }) => {
  return (
    <Pressable>
      <Text style={styles.text} {...props} />
    </Pressable>
  )
}

export default AppBarTab
