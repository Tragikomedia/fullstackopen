import React from "react";
import { TextInput as NativeTextInput } from "react-native";
import theme from '../theme';

const errorStyle = {
  borderColor: theme.colors.error
};

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];
  if (error) textInputStyle.push(errorStyle);
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
