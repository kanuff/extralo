import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import BoardsReducer from './boards/boards_reducer';
import ListsReducer from './lists/lists_reducer';


export default combineReducers({
  users: UsersReducer,
  boards: BoardsReducer,
  lists: ListsReducer
})