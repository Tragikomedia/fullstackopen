import React from "react";
import { View } from "react-native";
import Text from "./Text";
import theme from '../theme';

const AppBarTab = ({ text }) => {
  const style = {
    container: {
      paddingHorizontal: 5,
      paddingVertical: 10,
    },
    text: {
      color: theme.colors.heading,
      fontWeight: theme.fontWeights.bold
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.text}>{text}</Text>
    </View>
  );
};

export default AppBarTab;
