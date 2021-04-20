import React from "react";
import { View } from "react-native";
import theme from "../theme";
import Text from "./Text";

const style = {
  container: {
    backgroundColor: theme.colors.primary,
    padding: 5,
  },
  text: {
    color: theme.colors.heading,
  },
};

const Language = ({ text }) => {
  return (
    <View style={style.container}>
      <Text style={style.text}>{text}</Text>
    </View>
  );
};

export default Language;
