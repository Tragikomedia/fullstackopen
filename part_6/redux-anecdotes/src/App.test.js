import App from "./App";
import testStore from "./store/store";
import { Provider } from "react-redux";
import { render, fireEvent, getByText } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
// package must be mocked at the level where the important happens
import axios from "axios";
jest.mock('axios');
const flushPromises = () => new Promise(setImmediate);

describe('App', () => {
  let store;
  beforeEach(function() {
    store = testStore;
  });
  const initialAnecdotes = [
    {
      content: 'Test1',
      id: "1",
      votes: 2
    },
    {
      content: 'Test2',
      id: "2",
      votes: 0
    },
    {
      content: 'Test3',
      id: "3",
      votes: 1
    }
  ];
  it('Given an anecdote has been added, it should be visible', async function() {
    axios.get.mockResolvedValue({data: initialAnecdotes});
    const anecdote = 'Some wise stuff';
    axios.post.mockResolvedValue({data: {content: anecdote, id: "4", votes: 0}});
    const component = render(<Provider store={store}>
      <App/>
    </Provider>);
    const input = component.container.querySelector('input[name=content]');
    fireEvent.change(input, {
      target: {
        value: anecdote
      }
    });
    const form = component.container.querySelector('form');
    fireEvent.submit(form);
    await flushPromises();
    expect(getByText(component.container, anecdote)).toBeVisible();
  });
});