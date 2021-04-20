import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    paddingTop: Constants.statusBarHeight,
  },
});

const tabs = [{ text: "Repositories" }];

const renderItem = ({item}) => {
  return <AppBarTab text={item.text} />;
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <FlatList data={tabs} renderItem={renderItem} keyExtractor={(item) => item.text} horizontal={true} />
    </View>
  );
};

export default AppBar;
