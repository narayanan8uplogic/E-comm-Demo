import AsyncStorage from "@react-native-async-storage/async-storage";
import { legacy_createStore } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import appReducer from "./Reducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = legacy_createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;
