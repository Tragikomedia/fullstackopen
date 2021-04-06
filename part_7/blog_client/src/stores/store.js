import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import notificationReducer from '../reducers/notificationsReducer';

const store = createStore(
  notificationReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;