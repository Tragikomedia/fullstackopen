const Total = ({ exercises }) => (
  <>
    <p>Number of exercises {exercises.reduce((acc, num) => acc + num)}</p>
  </>
);

export default Total;
