import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import { useState } from 'react';

import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepositoryItem';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CreateReview from './CreateReview';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
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

const Main = () => {
  const [searchBy, setSearchBy] = useState(1);
  return (
    <View style={styles.container}>
      <AppBar />

      <View style={styles.gitHubContainer}>
        <Pressable
          onPress={() => {
            setSearchBy(1);
          }}
        >
          <Text style={styles.gitHubText}>Latest repositories</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSearchBy(2);
          }}
        >
          <Text style={styles.gitHubText}>Highest rated repositories</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSearchBy(3);
          }}
        >
          <Text style={styles.gitHubText}>Lowest rated repositories</Text>
        </Pressable>
      </View>
      <Routes>
        <Route path="create-review" element={<CreateReview />} exact />
        <Route path="sign-up" element={<SignUp />} exact />
        <Route path="sign-in" element={<SignIn />} exact />
        <Route path="/:id" element={<SingleRepository />} exact />
        <Route
          path="/"
          element={<RepositoryList searchBy={searchBy} />}
          exact
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
