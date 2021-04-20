import React from "react";
import { View } from "react-native";
import theme from "../theme";
import Text from "./Text";

const style = {
  num: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
  },
  text: {
    color: theme.colors.textSecondary,
  },
};

const parseNumber = (number) => {
  if (number < 1000) return number;
  const parsed = (number / 1000).toFixed(1);
  return `${parsed}k`;
};

const StatBarItem = ({ number, text }) => {
  return (
    <View>
      <Text style={style.num}>{parseNumber(number)}</Text>
      <Text style={style.text}>{text}</Text>
    </View>
  );
};

export default StatBarItem;
