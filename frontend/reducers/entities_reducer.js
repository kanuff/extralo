import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import BoardsReducer from './boards/boards_reducer';


export default combineReducers({
  users: UsersReducer,
  boards: BoardsReducer,
})