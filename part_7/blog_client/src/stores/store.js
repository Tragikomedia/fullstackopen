import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import notificationReducer from '../reducers/notificationsReducer';
import blogReducer from '../reducers/blogsReducer';
import userReducer from '../reducers/userLoginReducer';
import usersReducer from '../reducers/usersReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
