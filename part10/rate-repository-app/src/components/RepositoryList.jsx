import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryItem'
// import useRepositories from '../hooks/useRepositories'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
})

const renderItem = ({ item }) => <RepositoryItem item={item} />
const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  // const { repositories } = useRepositories()
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <p>Loading ...</p>
  if (error) console.log(error)

  const repositoryNodes = data.repositories
    ? data.repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      style={styles.container}
    />
  )
}

export default RepositoryList
