import React, { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const data = [
    { text: "😀", number: good, handler: () => setGood(good + 1), value: 1 },
    { text: "😐", number: neutral, handler: () => setNeutral(neutral + 1), value: 0 },
    { text: "😠", number: bad, handler: () => setBad(bad + 1), value: -1 },
  ];

  const buttons = data.map((opinion) => (
    <Button text={opinion.text} handleClick={opinion.handler} key={opinion.text}/>
  ));

  return (
    <div>
      <h1>Give feedback!</h1>
      {buttons}
      <Statistics data={data}/>
    </div>
  );
};

export default App;
