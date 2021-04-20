import React from "react";
import { View } from "react-native";
import StatBarItem from "./StatBarItem";

const style = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  marginTop: 10,
};



const StatBar = ({ stats }) => {
  return (
    <View style={style}>
      {stats.map(({ number, text }) => (
        <StatBarItem number={number} text={text} key={text} />
      ))}
    </View>
  );
};

export default StatBar;
