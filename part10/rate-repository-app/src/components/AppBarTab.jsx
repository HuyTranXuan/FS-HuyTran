import { StyleSheet, Pressable, Text } from 'react-native'
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  flexItem: {
    paddingLeft: '20px',
  },
  text: {
    color: '#fff',
    padding: '20',
    flexDirection: 'flex-start',
    fontWeight: '600',
  },
})

const AppBarTab = ({ link, ...props }) => {
  return (
    <Pressable style={styles.flexItem}>
      <Link style={{}} to={link}>
        <Text style={styles.text} {...props} />
      </Link>
    </Pressable>
  )
}

export default AppBarTab
