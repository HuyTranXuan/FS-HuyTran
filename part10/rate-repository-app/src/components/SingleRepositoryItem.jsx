// import { View } from 'react-native';
import { useParams } from 'react-router-native';
import Text from './Text';
import useRepository from '../hooks/useRepository';
import RepositoryItem from '../components/RepositoryItem';

const SingleRepositoryItem = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);
  if (!repository) return <Text>Loading..</Text>;

  return <RepositoryItem repository={repository} single />;
};

export default SingleRepositoryItem;
