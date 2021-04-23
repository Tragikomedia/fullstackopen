import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useContext } from "react";

import AuthStorageContext from "../contexts/AuthStorageContext";

export const useRepositories = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  return { repositories: data?.repositories, loading };
};

const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export const useSignIn = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const {data} = await mutate({
      variables: {
        username,
        password,
      },
    });
    await authStorage.setAccessToken(data.authorize.accessToken);
    client.resetStore();
    return data;
  };

  return [signIn, result];
};
