import { View, Image, StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';
import formatInThousands from '../utils/formatInThousands';

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
  languageText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
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

const RepositoryItem = ({ repository }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = repository;

  return (
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
    </View>
  );
};

export default RepositoryItem;
