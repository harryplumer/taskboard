import { combineReducers } from 'redux';
import categories from './categories';
import tasks from './tasks'

const rootReducer = combineReducers({
  categories,
  tasks,
});



export default rootReducer;