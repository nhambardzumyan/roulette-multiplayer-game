import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { thunk } from "redux-thunk";

import rouletteReducer from "./slices/rouletteSlice";
import commonReducer from "./slices/commonSlice";

// Ensure this is called before anything else
enableMapSet();

export const store = configureStore({
  reducer: {
    roulette: rouletteReducer,
    common: commonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
