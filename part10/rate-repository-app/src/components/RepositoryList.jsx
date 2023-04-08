import { FlatList, View, StyleSheet, Pressable, Text } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  gitHubContainer: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  gitHubText: {
    color: 'black',
    backgroundColor: theme.colors.mainBackground,
    borderRadius: theme.roundness,
    paddingVertical: 12,
    flexGrow: 1,
    paddingHorizontal: 12,
    textAlign: 'center',
    fontWeight: 500,
  },
});

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState(1);
  const { repositories } = useRepositories(sortBy);

  return (
    <View style={styles.gitHubContainer}>
      <Pressable
        onPress={() => {
          setSortBy(1);
        }}
      >
        <Text style={styles.gitHubText}>Latest repositories</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setSortBy(2);
        }}
      >
        <Text style={styles.gitHubText}>Highest rated repositories</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setSortBy(3);
        }}
      >
        <Text style={styles.gitHubText}>Lowest rated repositories</Text>
      </Pressable>
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;
