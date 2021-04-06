import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import notificationReducer from '../reducers/notificationsReducer';
import blogReducer from '../reducers/blogsReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
