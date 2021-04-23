import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuthStorage } from "../hooks";

const SignOut = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await authStorage.removeAccessToken();
      await client.resetStore();
      history.push("/");
    })();
  }, []);

  return null;
};

export default SignOut;
