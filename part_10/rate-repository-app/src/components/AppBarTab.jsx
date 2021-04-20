import React from "react";
import { View } from "react-native";
import Text from "./Text";
import theme from '../theme';

const AppBarTab = ({ text }) => {
  const style = {
    container: {
      color: theme.colors.textPrimary,
      paddingHorizontal: 5,
      paddingVertical: 10,
    },
    text: {
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
