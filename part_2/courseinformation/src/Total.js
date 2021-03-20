const Total = ({ parts }) => {
  const total = parts.reduce((acc, {exercises}) => acc + exercises, 0);
  return (
    <>
      <p>Number of exercises: <strong>{total}</strong></p>
    </>
  );
}


export default Total;
