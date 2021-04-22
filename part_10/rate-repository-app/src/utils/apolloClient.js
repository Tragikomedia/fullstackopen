import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { baseURL } from "./fetch";

const httpLink = createHttpLink({
  uri: `${baseURL}/graphql`,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
