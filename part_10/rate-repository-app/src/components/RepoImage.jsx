import React from "react";
import { Image } from "react-native";

const style = {
  width: 50,
  height: 50,
  margin: 10,
};

const RepoImage = ({ uri }) => {
  return <Image source={{ uri }} style={style} />;
};

export default RepoImage;
