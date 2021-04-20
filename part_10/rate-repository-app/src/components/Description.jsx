import React from "react";
import theme from "../theme";
import Text from "./Text";

const style = {
  color: theme.colors.textSecondary,
  marginVertical: 5,
};

const Description = ({ text }) => {
  return <Text style={style}>{text}</Text>;
};

export default Description;
