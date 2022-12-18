import { View, Image, StyleSheet, Pressable } from 'react-native';

import theme from '../theme';
import Text from './Text';
import formatInThousands from '../utils/formatInThousands';
import { useNavigate } from 'react-router-native';
import { Linking } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
  },
  countItem: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  gitHubContainer: {
    marginTop: 10,
    // flexDirection: 'row',
    width: '100%',
  },
  languageText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  gitHubText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    textAlign: 'center',
    fontWeight: 500,
  },
});

// const CountItem = ({ label, count }) => {
//   return (
//     <View style={styles.countItem}>
//       <Text style={styles.countItemCount} fontWeight="bold">
//         {formatInThousands(count)}
//       </Text>
//       <Text color="textSecondary">{label}</Text>
//     </View>
//   );
// };

const RepositoryItem = ({ repository, single }) => {
  const navigate = useNavigate();
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    id,
    url,
  } = repository;

  const onItemClick = () => {
    navigate(`/${id}`);
  };

  const onGitHubClick = () => {
    Linking.openURL(url);
  };

  return (
    <Pressable onPress={onItemClick}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
          </View>
          <View style={styles.contentContainer}>
            <Text
              style={styles.nameText}
              fontWeight="bold"
              fontSize="subheading"
              numberOfLines={1}
              testID="fullName"
            >
              {fullName}
            </Text>
            <Text
              testID="description"
              style={styles.descriptionText}
              color="textSecondary"
            >
              {description}
            </Text>
            {language ? (
              <View style={styles.languageContainer}>
                <Text testID="language" style={styles.languageText}>
                  {language}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text testID="stargazersCount" color="textSecondary">
            {formatInThousands(stargazersCount)}
          </Text>
          <Text testID="forksCount" color="textSecondary">
            {formatInThousands(forksCount)}
          </Text>
          <Text testID="reviewCount" color="textSecondary">
            {formatInThousands(reviewCount)}
          </Text>
          <Text testID="ratingAverage" color="textSecondary">
            {formatInThousands(ratingAverage)}
          </Text>
        </View>
        {single && (
          <View style={styles.bottomContainer}>
            <View style={styles.gitHubContainer}>
              <Pressable onPress={onGitHubClick}>
                <Text style={styles.gitHubText}>Open in GitHub</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
