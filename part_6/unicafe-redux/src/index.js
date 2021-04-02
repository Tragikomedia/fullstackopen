import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer, { good, bad, ok, zero } from "./reducer";

const store = createStore(reducer);

export const App = () => {

  const markGood = () => store.dispatch(good());
  const markOk = () => store.dispatch(ok());
  const markBad = () => store.dispatch(bad());
  const reset = () => store.dispatch(zero());


  return (
    <div>
      <button onClick={markGood}>good</button>
      <button onClick={markOk}>neutral</button>
      <button onClick={markBad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
