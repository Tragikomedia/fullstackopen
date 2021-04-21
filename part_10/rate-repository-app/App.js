import React from "react";
import { NativeRouter as Router } from "react-router-native";
import Main from "./src/components/Main";

export default function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}
