import React from "react";
import { View, Text } from "react-native";

const RepositoryItem = ({repository}) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
  } = repository.item;
  return (
    <View>
      <Text>{`Full name: ${fullName}`}</Text>
      <Text>{`Description: ${description}`}</Text>
      <Text>{`Language: ${language}`}</Text>
      <Text>{`Stars: ${stargazersCount}`}</Text>
      <Text>{`Forks: ${forksCount}`}</Text>
      <Text>{`Reviews: ${reviewCount}`}</Text>
      <Text>{`Rating: ${ratingAverage}`}</Text>
    </View>
  );
};

export default RepositoryItem;
