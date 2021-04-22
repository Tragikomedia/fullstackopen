import React from "react";
import { NativeRouter as Router } from "react-router-native";
import { ApolloProvider } from "@apollo/client";

import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";

const apolloClient = createApolloClient();

export default function App() {
  return (
    <Router>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </Router>
  );
}
