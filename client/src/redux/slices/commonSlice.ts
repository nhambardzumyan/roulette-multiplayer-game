// redux/slices/rouletteSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "../../types";

const initialState: CommonState = {
  errors: [],
  matchMeta: {
    matchID: "",
    playerID: "",
    playerName: "",
    playerCredentials: "",
  },
  username: "",
  isLoading: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.errors.push(action.payload);
    },
    removeError(state) {
      state.errors.pop();
    },
    setUserName(state, action: PayloadAction<string | null>) {
      console.log("setUserName called ", action.payload);
      state.username = action.payload;
    },
    setMatchMeta(state, action: PayloadAction<any>) {
      state.matchMeta = action.payload;
    },
  },
});

export const { setError, setUserName, setMatchMeta, removeError } =
  commonSlice.actions;

export default commonSlice.reducer;
