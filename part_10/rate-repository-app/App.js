import React from "react";
import { NativeRouter as Router } from "react-router-native";
import { ApolloProvider } from "@apollo/client";

import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  return (
    <Router>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </Router>
  );
}
