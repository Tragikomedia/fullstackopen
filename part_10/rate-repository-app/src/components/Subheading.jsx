import React from "react";
import theme from "../theme";
import Text from "./Text";

const style = {
  color: theme.colors.textPrimary,
  fontSize: theme.fontSizes.subheading,
  fontWeight: theme.fontWeights.bold,
};

const Subheading = ({ text }) => {
  return (
    <>
      <Text style={style}>{text} </Text>
    </>
  );
};

export default Subheading;
