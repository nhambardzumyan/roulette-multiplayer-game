import { createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import {
  setError,
  removeError,
  setUserName,
  setMatchMeta,
} from "../slices/commonSlice";
import { AppDispatch, RootState } from "../store";

export const setErrorAction = createAsyncThunk<
  any,
  { message: string },
  { dispatch: AppDispatch }
>("common/setError", ({ message }, { dispatch }) => {
  return dispatch(setError(message));
});

export const removeErrorAction = createAsyncThunk<
  void, // Return type of the action
  void, // First argument type
  { dispatch: AppDispatch }
>("common/removeError", (_, { dispatch }) => {
  dispatch(removeError());
});

export const setUserNameAction = createAsyncThunk<
  any,
  { username: string },
  { dispatch: AppDispatch }
>("common/setUsername", ({ username }, { dispatch }) => {
  dispatch(setUserName(username));
});

export const setMatchMetadataAction = createAsyncThunk<
  any,
  {
    matchID: string;
    playerID: string;
    playerName: string;
    playerCredentials: string;
  },
  { dispatch: AppDispatch }
>(
  "common/setMatchMeta",
  ({ matchID, playerID, playerName, playerCredentials }, { dispatch }) => {
    return dispatch(
      setMatchMeta({ matchID, playerID, playerName, playerCredentials })
    );
  }
);

export const commonSelector = (state: RootState) => state.common;

export const errorsSelector = createSelector(commonSelector, (common) => {
  return common.errors;
});

export const usernameSelector = createSelector(commonSelector, (common) => {
  console.log("common ", common);
  return common.username;
});

export const activeMatchSelector = createSelector(commonSelector, (common) => {
  console.log("common ", common);
  return common.matchMeta;
});
