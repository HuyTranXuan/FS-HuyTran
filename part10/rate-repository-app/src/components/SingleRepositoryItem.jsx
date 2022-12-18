import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from '../components/RepositoryItem';
import Loading from '../components/Loading';
import SingleReviewItem from '../components/ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryInfo = ({ repository }) =>
  repository ? (
    <View>
      <RepositoryItem repository={repository} single />
      <View style={styles.separator} />
    </View>
  ) : (
    <Loading />
  );

const ReviewItem = ({ review }) => {
  return <SingleReviewItem review={review} />;
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);
  const reviews = repository?.reviews.edges;

  if (!reviews) return <Loading />;
  return (
    <FlatList
      data={reviews.map((r) => r.node)}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
