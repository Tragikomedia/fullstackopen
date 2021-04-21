import React from "react";
import { TextInput as NativeTextInput } from "react-native";

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];
  console.log(error);
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
