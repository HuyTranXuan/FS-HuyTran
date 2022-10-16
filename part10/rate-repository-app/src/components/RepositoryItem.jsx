import { View, Text, StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({
  flexContainer: {
    padding: '10px',
    backgroundColor: '#f6f8f8',
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: '20px',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  flexItemA: {
    flexDirection: 'column',
    paddingLeft: '20px',
  },
  flexItemB: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  flexItemCard: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: '700',
  },
  greyText: {
    color: '#575655',
    fontWeight: '500',
  },
  langText: {
    color: '#f6f8f8',
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    padding: '7px',
    borderRadius: 5,
  },
})
const convertToK = (value) => {
  return value >= 1000 ? `${Math.round((value / 10000) * 100) / 10}k` : value
}

const RepositoryItem = ({ item }) => (
  <View style={styles.flexContainer}>
    <View style={styles.infoBox}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1458093281/vh10glkjjmfo3qfmmoen.png',
        }}
      />
      <View style={styles.flexItemA}>
        <Text style={styles.boldText}>{item.fullName}</Text>
        <Text style={styles.greyText}>{item.description}</Text>
        <Text style={styles.langText}>{item.language}</Text>
      </View>
    </View>
    <View style={styles.flexItemB}>
      <View style={styles.flexItemCard}>
        <Text style={styles.boldText}>{convertToK(item.stargazersCount)}</Text>
        <Text style={styles.greyText}>Starts</Text>
      </View>
      <View style={styles.flexItemCard}>
        <Text style={styles.boldText}>{convertToK(item.forksCount)}</Text>
        <Text style={styles.greyText}>Forks</Text>
      </View>
      <View style={styles.flexItemCard}>
        <Text style={styles.boldText}>{convertToK(item.reviewCount)}</Text>
        <Text style={styles.greyText}>Reviews</Text>
      </View>
      <View style={styles.flexItemCard}>
        <Text style={styles.boldText}>{convertToK(item.ratingAverage)}</Text>
        <Text style={styles.greyText}>Rating</Text>
      </View>
    </View>
  </View>
)

export default RepositoryItem
