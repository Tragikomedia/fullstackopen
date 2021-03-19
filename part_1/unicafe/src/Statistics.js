import Stat from "./Stat";

const Statistics = ({ data }) => {
  const stats = data.map((stat) => (
    <Stat text={stat.text} number={stat.number} />
  ));
  return (
    <>
      <h2>Statistics</h2>
      {stats}
    </>
  );
};

export default Statistics;