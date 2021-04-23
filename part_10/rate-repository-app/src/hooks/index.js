import { useMutation, useQuery } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import { GET_REPOSITORIES } from "../graphql/queries";

export const useRepositories = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  return { repositories: data?.repositories, loading };
};

export const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    await mutate({
      variables: {
        username,
        password,
      },
    });
  };

  return [signIn, result];
};
