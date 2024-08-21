import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  cellClick,
  chipClick,
  clearBet,
  setGameData,
} from "../slices/rouletteSlice";

export const setGameDataAction = createAsyncThunk(
  "set-game-data",
  async (gameData: any, { dispatch }) => {
    dispatch(setGameData(gameData));
  }
);

export const setCellClickAction = createAsyncThunk(
  "set-cell-click",
  async (cell: any, { dispatch }) => {
    console.log("Cell clicked", cell);
    dispatch(cellClick(cell));
  }
);

export const setChipClickAction = createAsyncThunk(
  "set-chip-click",
  async (chip: number, { dispatch }) => {
    dispatch(chipClick(chip));
  }
);

export const clearBetAction = createAsyncThunk(
  "clear-chip",
  async (_, { dispatch }) => {
    dispatch(clearBet());
  }
);
