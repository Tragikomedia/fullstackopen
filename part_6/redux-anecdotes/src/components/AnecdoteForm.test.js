import AnecdoteForm from "./AnecdoteForm";
import testStore from "../store/store";
import { Provider } from "react-redux";
//import * as redux from "react-redux";
import { render, fireEvent } from "@testing-library/react";
// package must be mocked at the level where the important happens
import axios from "axios";
jest.mock('axios');
const flushPromises = () => new Promise(setImmediate);

describe("AnecdoteForm", () => {
  it("Given form submission, the store should receive the anecdote content", async () => {
    const store = testStore;
    const anecdote = "Testy McTest";
    // const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    // const mockDispatchFn = jest.fn((func) => console.log(String(func)));
    // useDispatchSpy.mockReturnValue(mockDispatchFn);
    axios.post.mockResolvedValue({data: {
      content: anecdote, id: "1", votes: 0
    }});
    const component = render(
      <Provider store={store}>
        <AnecdoteForm />
      </Provider>
    );
    const input = component.container.querySelector("input[name=content]");
    fireEvent.change(input, {
      target: {
        value: anecdote,
      },
    });
    const form = component.container.querySelector("form");
    fireEvent.submit(form);
    // Flush promises makes the test wait for all the promises to be resolved
    await flushPromises();
    expect(store.getState().anecdotes.length).toBe(1);
    expect(store.getState().anecdotes[0].content).toBe(anecdote);
  });
});
