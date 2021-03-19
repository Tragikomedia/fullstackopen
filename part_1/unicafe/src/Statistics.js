import Statistic from "./Statistic";

const Statistics = ({ data }) => {
  const all = data.reduce((acc, stat) => acc + stat.number, 0);
  if (!all)
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    );
  const average =
    data.reduce((acc, stat) => acc + stat.value * stat.number, 0) / all;
  const positive =
    (data
      .filter((stat) => stat.value > 0)
      .reduce((acc, stat) => acc + stat.number, 0) /
      all) *
      100 +
    "%";
  const statData = [
    ...data,
    { text: "all", number: all },
    { text: "average", number: average },
    { text: "positive", number: positive },
  ];
  const stats = statData.map((stat) => (
    <Statistic text={stat.text} number={stat.number} />
  ));
  return (
    <>
      <h2>Statistics</h2>
      {stats}
    </>
  );
};

export default Statistics;
