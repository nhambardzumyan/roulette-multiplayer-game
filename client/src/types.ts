export enum ValueType {
  NUMBER,
  NUMBERS_1_12,
  NUMBERS_2_12,
  NUMBERS_3_12,
  NUMBERS_1_18,
  NUMBERS_19_36,
  EVEN,
  ODD,
  RED,
  BLACK,
  DOUBLE_SPLIT,
  QUAD_SPLIT,
  TRIPLE_SPLIT,
  EMPTY,
}

export interface Item {
  type?: ValueType;
  value?: number;
  valueSplit?: number[];
}

export interface PlacedChip {
  item: Item;
  sum: number;
}
export type rouletteData = {
  numbers: number[];
};
export type RouletteWrapperState = {
  rouletteData: rouletteData;
  number: WheelNumber;
  chipsData: ChipsData;
  winners: Winner[];
  username: string;
  endTime: number;
  progressCountdown: number;
  time_remaining: number;
  stage: GameStages;
  history: number[];
};

export type Winner = {
  username: string;
  sum: number;
  playerID: string;
};

export type ChipsData = {
  selectedChip: any;
  placedChips: any;
};

export type WheelNumber = {
  next: any;
};

export enum GameStages {
  PLACE_BET = "betting",
  PLAYING = "playing",
  NONE = "none",
  RESULTS = "results",
  SHOW_RESULTS = "show_results",
}
export type GameData = {
  stage: GameStages;
  time_remaining: number;
  value: number;
  wins: Winner[];
  history: number[];
  number: {
    next: number | null;
  };
};

export interface RouletteState {
  rouletteData: {
    numbers: number[];
  };
  chipsData: {
    selectedChip?: number | null;
    placedChips?: Map<Item, PlacedChip>;
  };
  otherChipsData: Map<number, Map<Item, PlacedChip>>;
  number: {
    next: number | null;
  };
  winners: { username: string; sum: number }[];
  history: number[];
  stage: GameStages;
  endTime: number;
  progressCountdown: number;
  time_remaining: number;
}

export interface CommonState {
  errors: any[];
  isLoading: boolean;
  username: string;
  matchMeta: {
    matchID: string;
    playerID: string;
    playerName: string;
    playerCredentials?: string;
  };
}

export interface StageState {
  number: {
    next: number | null;
  };
  winners: { username: string; sum: number }[];
  history: number[];
  stage: GameStages;
  endTime: number;
  progressCountdown: number;
  time_remaining: number;
  value?: number | null;
  wins?: { username: string; sum: number }[];
}

export interface PlacedChip {
  item: Item;
  sum: number;
}

var blackNumbers = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 28, 31, 33, 35,
];
var redNumbers = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];
export function calculateWinnings(
  winningNumber: number,
  placedChips: PlacedChip[]
) {
  var win = 0;
  var arrayLength = placedChips.length;
  for (var i = 0; i < arrayLength; i++) {
    var placedChip = placedChips[i];
    var placedChipType = placedChip.item.type;
    var placedChipValue = placedChip.item.value;
    var placedChipSum = placedChip.sum;

    if (
      placedChipType === ValueType.NUMBER &&
      placedChipValue === winningNumber
    ) {
      win += placedChipSum * 36;
    } else if (
      placedChipType === ValueType.BLACK &&
      blackNumbers.includes(winningNumber)
    ) {
      // if bet on black and win
      win += placedChipSum * 2;
    } else if (
      placedChipType === ValueType.RED &&
      redNumbers.includes(winningNumber)
    ) {
      // if bet on red and win
      win += placedChipSum * 2;
    } else if (
      placedChipType === ValueType.NUMBERS_1_18 &&
      winningNumber >= 1 &&
      winningNumber <= 18
    ) {
      // if number is 1 to 18
      win += placedChipSum * 2;
    } else if (
      placedChipType === ValueType.NUMBERS_19_36 &&
      winningNumber >= 19 &&
      winningNumber <= 36
    ) {
      // if number is 19 to 36
      win += placedChipSum * 2;
    } else if (
      placedChipType === ValueType.NUMBERS_1_12 &&
      winningNumber >= 1 &&
      winningNumber <= 12
    ) {
      // if number is within range of row1
      win += placedChipSum * 3;
    } else if (
      placedChipType === ValueType.NUMBERS_2_12 &&
      winningNumber >= 13 &&
      winningNumber <= 24
    ) {
      // if number is within range of row2
      win += placedChipSum * 3;
    } else if (
      placedChipType === ValueType.NUMBERS_3_12 &&
      winningNumber >= 25 &&
      winningNumber <= 36
    ) {
      // if number is within range of row3
      win += placedChipSum * 3;
    } else if (
      placedChipType === ValueType.EVEN ||
      placedChipType === ValueType.ODD
    ) {
      if (winningNumber % 2 == 0) {
        // if number even
        win += placedChipSum * 2;
      } else {
        // if number is odd
        win += placedChipSum * 2;
      }
    }
  }

  return win;
}

export namespace BoardGameAPI {
  export type Player = {
    id: number;
    name?: string; // Optional name property
    isConnected?: boolean;
  };

  export type Match = {
    gameName: string;
    unlisted: boolean;
    players: Player[];
    createdAt: number;
    updatedAt: number;
    matchID: string;
  };

  export type GameMatch = {
    matches: Match[];
  };
}

export enum ChipValues {
  HighRoller = 100,
  Premium = 20,
  Classic = 10,
  LowRoller = 5,
}

export const ChipValuesList = [
  ChipValues.HighRoller,
  ChipValues.Premium,
  ChipValues.Classic,
  ChipValues.LowRoller,
];
