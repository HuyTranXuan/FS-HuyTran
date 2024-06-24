import { FlatList, View, StyleSheet } from 'react-native';
import Loading from './Loading';
import SingleReviewItem from './ReviewItem';
import { GET_CURRENT_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ReviewItem = ({ review }) => {
  return <SingleReviewItem review={review} isMyReview={true} />;
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  });
  console.log(data?.me.reviews.edges);
  const reviews = data?.me.reviews.edges;

  if (!reviews) return <Loading />;
  return (
    <FlatList
      data={reviews.map((r) => r.node)}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
