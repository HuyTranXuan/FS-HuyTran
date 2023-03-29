import { gql } from '@apollo/client';

import { USER_BASE_FIELDS } from './fragments';

export const AUTHENTICATE = gql`
  mutation authorize($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        ...userBaseFields
      }
    }
  }

  ${USER_BASE_FIELDS}
`;
export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      rating
      text
      repositoryId
    }
  }
`;
export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;
