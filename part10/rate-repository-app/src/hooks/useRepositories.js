import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortBy, searchBy) => {
  const sortDict = {
    1: {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
    },
    2: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
    },
    3: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
    },
  };
  // console.log(sortDict[sortBy]);
  // console.log(searchKeyword);
  const searchParams = {
    ...sortDict[sortBy],
    searchKeyword: searchBy.searchKeyword,
  };
  const { data, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      ...searchParams,
    },
  });

  return { repositories: data ? data.repositories : undefined, ...result };
};

export default useRepositories;
