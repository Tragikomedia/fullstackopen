const Total = ({ parts }) => {
  const total = parts.map(part => part.exercises).reduce((acc, num) => acc + num);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
}


export default Total;
