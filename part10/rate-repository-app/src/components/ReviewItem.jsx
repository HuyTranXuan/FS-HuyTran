import { View, StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'flex-start',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
    display: 'inline-block',
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
    justifyContent: 'flex-start',
  },
  descriptionText: {
    flexGrow: 1,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: theme.circle,
    backgroundColor: 'white',
    textAlign: 'center',
    color: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    verticalAlign: 'middle',
    display: 'table-cell',
    paddingVertical: 6,
    fontWeight: 600,
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
  userContainer: {
    flexDirection: 'column',
  },
});

const SingleReviewItem = ({ review, isMyReview }) => {
  const { text, user, rating, createdAt } = review;
  const { username } = user;
  const date = String(createdAt).split('-');
  const cleanDate = `${date[2].substring(0, 2)}.${date[1]}.${date[0]}`;

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>{rating}</View>
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
            testID="fullName"
          >
            {isMyReview ? review.repository.fullName : username}
          </Text>
          <Text
            testID="description"
            style={styles.descriptionText}
            color="textSecondary"
          >
            {cleanDate}
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text testID="stargazersCount" color="textSecondary">
          {text}
        </Text>
      </View>
    </View>
  );
};

export default SingleReviewItem;
