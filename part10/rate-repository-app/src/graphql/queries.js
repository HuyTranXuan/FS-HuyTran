import { gql } from '@apollo/client';

import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...repositoryBaseFields
          ratingAverage
          reviewCount
        }
      }
    }
  }

  ${REPOSITORY_BASE_FIELDS}
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      ...userBaseFields
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
            repository {
              fullName
            }
          }
        }
      }
    }
  }

  ${USER_BASE_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      ...repositoryBaseFields
      ratingAverage
      reviewCount
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }

  ${REPOSITORY_BASE_FIELDS}
`;
