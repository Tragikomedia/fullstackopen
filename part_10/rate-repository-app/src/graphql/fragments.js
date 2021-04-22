import { gql } from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    description
    ownerAvatarUrl
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
  }
`;
