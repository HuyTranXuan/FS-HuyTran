import { FlatList, View, StyleSheet, Pressable, Text } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import React, { useState, useEffect } from 'react';
import theme from '../theme';
import TextInput from './TextInput';
import { useDebounce } from 'use-debounce';

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
  textInput: {
    backgroundColor: 'white',
    padding: 10,
  },
});

// export const RepositoryListContainer = ({ repositories }) => {
//   const repositoryNodes = repositories
//     ? repositories.edges.map((edge) => edge.node)
//     : [];

//   return (
//     <FlatList
//       data={repositoryNodes}
//       keyExtractor={({ id }) => id}
//       renderItem={({ item }) => <RepositoryItem repository={item} />}
//       ItemSeparatorComponent={ItemSeparator}
//     />
//   );
// };

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    const [text, setText] = React.useState('');
    const [searchKeyword] = useDebounce(text, 500);
    const handleTextChange = (value) => {
      setText(value);
    };
    useEffect(() => {
      props.setSearchBy({ searchKeyword });
    }, [searchKeyword]);

    return (
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={handleTextChange}
          value={text}
          placeholder="Type to search..."
        ></TextInput>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.repositories}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <RepositoryItem repository={item} />}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}
const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState(1);
  const [searchBy, setSearchBy] = useState('');
  const { repositories } = useRepositories(sortBy, searchBy);

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
      <RepositoryListContainer
        repositories={
          repositories ? repositories.edges.map((edge) => edge.node) : []
        }
        searchBy={searchBy}
        setSearchBy={setSearchBy}
      />
    </View>
  );
};

export default RepositoryList;
