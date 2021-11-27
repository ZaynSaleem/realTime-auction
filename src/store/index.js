import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import todoReducer from "./reducers/todoReducers";
import AuthReducer from "./reducers/authReducer";

const persistConfig = {
  key: "root",
  storage,
};

const combineReducer = combineReducers({
  auth: AuthReducer,
  todo: todoReducer,
});

const persistedReducer = persistReducer(persistConfig, combineReducer);

export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
export const persistor = persistStore(store);
