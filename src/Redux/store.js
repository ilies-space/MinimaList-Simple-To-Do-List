import {combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import TodoListReducer from './TodoListReducer';

const AppReducers = combineReducers({
  TodoListReducer,
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['TodoListReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(persistedReducer);
export const peristedStore = persistStore(store);

export default store;
