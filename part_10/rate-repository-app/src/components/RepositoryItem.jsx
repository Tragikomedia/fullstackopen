import React from "react";
import { View } from "react-native";
import Description from "./Description";
import Language from "./Language";
import RepoImage from "./RepoImage";
import StatBar from "./StatBar";
import Subheading from "./Subheading";

const style = {
  container: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  horizontal: {
    flexDirection: "row",
  },
  info: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexGrow: 2,
  },
};

const RepositoryItem = ({ repository }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = repository.item;

  const stats = [
    {
      number: stargazersCount,
      text: "Stars",
    },
    {
      number: forksCount,
      text: "Forks",
    },
    {
      number: reviewCount,
      text: "Reviews",
    },
    {
      number: ratingAverage,
      text: "Rating",
    },
  ];

  return (
    <View style={style.container}>
      <View style={style.horizontal}>
        <View>
          <RepoImage uri={ownerAvatarUrl} />
        </View>
        <View style={style.info}>
          <Subheading text={fullName} />
          <View
            style={{
              width: "75%",
            }}
          >
            <Description text={description} />
          </View>
          <Language text={language} />
        </View>
      </View>
      <StatBar stats={stats} />
    </View>
  );
};

export default RepositoryItem;
