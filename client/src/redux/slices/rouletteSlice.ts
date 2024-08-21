// redux/slices/rouletteSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RouletteState, Item, StageState } from "../../types";
import { GameStages } from "../../types";

const initialState: RouletteState = {
  rouletteData: {
    numbers: [
      0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
      24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
    ],
  },
  chipsData: {
    selectedChip: null,
    placedChips: new Map(),
  },
  otherChipsData: new Map(),
  number: {
    next: null,
  },
  winners: [],
  history: [],
  stage: GameStages.NONE,
  endTime: 0,
  progressCountdown: 0,
  time_remaining: 0,
};

const rouletteSlice = createSlice({
  name: "roulette",
  initialState,
  reducers: {
    setGameData(state, action: PayloadAction<Partial<StageState>>) {
      let endTime = 0;
      const gameData = action.payload;

      if (gameData.stage === GameStages.PLAYING) {
        endTime = 35;
        return {
          ...state,
          endTime,
          progressCountdown: endTime - gameData.time_remaining,
          number: { next: gameData.value },
          stage: gameData.stage,
          time_remaining: gameData.time_remaining,
        };
      } else {
        endTime = 25;
        return {
          ...state,
          endTime,
          progressCountdown: endTime - gameData.time_remaining,
          stage: gameData.stage,
          time_remaining: gameData.time_remaining,
          winners: gameData.wins.length > 0 ? gameData.wins : state.winners,
          history:
            gameData.history.length > 0 ? gameData.history : state.history,
        };
      }
    },
    cellClick(state, action: PayloadAction<Item>) {
      const item = action.payload;
      const currentChips = state.chipsData.placedChips;
      const chipValue = state.chipsData.selectedChip;

      if (chipValue === 0 || chipValue === null) return;

      let currentChip = { item, sum: chipValue };
      if (currentChips.get(item) !== undefined) {
        currentChip.sum += currentChips.get(item).sum;
      }

      currentChips.set(item, currentChip);
    },
    chipClick(state, action: PayloadAction<number | null>) {
      const chip = action.payload;
      state.chipsData.selectedChip = chip;
    },
    //TODO: rm
    placeChip(state, action: PayloadAction<{ item: Item; chip: number }>) {
      const { item, chip } = action.payload;
      const currentChips = new Map(state.chipsData.placedChips);
      let currentChip = { item, sum: chip };

      if (currentChips.get(item)) {
        currentChip.sum += currentChips.get(item)?.sum || 0;
      }

      currentChips.set(item, currentChip);
      state.chipsData.placedChips = currentChips;
    },
    clearBet(state) {
      state.chipsData.placedChips = new Map();
    },
    selectChip(state, action: PayloadAction<number | null>) {
      state.chipsData.selectedChip = action.payload;
    },
  },
});

export const {
  setGameData,
  placeChip,
  clearBet,
  selectChip,
  cellClick,
  chipClick,
} = rouletteSlice.actions;

export default rouletteSlice.reducer;
