import { Game, Ctx } from 'boardgame.io';
import { ActivePlayers, INVALID_MOVE } from 'boardgame.io/core';
import { calculateWinnings, GameStages, PlacedChip } from './types';

export interface GameState {
  quit: boolean;
  wins: any[];
  players: {
    [id: string]: {
      name: string;
      bets: PlacedChip[] | null;
      totalWinnings?: number;
    };
  };
  stage: GameStages;
  spinResult: number | null;
}

function getRandomNumberInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function quitGame({ events }) {
  events.endGame();
}

function initPlayers(ctx, G) {
  const playersObj = {};
  for (let i = 0; i < ctx.numPlayers; i++) {
    playersObj[i] = {
      bets: [],
      name: '',
    };
  }
  return playersObj;
}

const RouletteGame2: Game<GameState> = {
  name: 'roulette-game',
  setup: ({ ctx }) => ({
    quit: false,
    players: initPlayers(ctx, {}),
    wins: [],
    stage: GameStages.NONE,
    spinResult: null,
  }),

  moves: {
    quitGame: ({ G }) => {
      G.quit = true;
    },
  },

  phases: {
    betting: {
      onBegin: ({ G }) => {
        G.stage = GameStages.PLACE_BET;
        Object.keys(G.players).forEach((playerID) => {
          G.players[playerID].bets = [];
          // G.players[playerID].name = '';
        });
      },
      moves: {
        placeBet: {
          move: ({ G, playerID }, data) => {
            const gameData = data as PlacedChip[];
            G.players[playerID]?.bets?.push(...gameData);
          },
          noLimit: true,
        },
        nextStage: {
          move: ({ G, events }) => {
            G.stage = GameStages.PLAYING;
            events.endPhase(); // Move to the next phase
          },
          noLimit: true,
        },
        setUserName: {
          move: ({ G, playerID }, data) => {
            G.players[playerID].name = data;
          },
        },
        quit: {
          move: quitGame,
          noLimit: true,
        },
      },
      start: true,
      endIf: ({ G }) => G.stage === GameStages.PLAYING, // End phase when no more bets are allowed
      next: 'playing',
    },

    playing: {
      onBegin: ({ G, random }) => {
        const spinResult = getRandomNumberInt(0, 36); //random.Number();
        console.log('spinResult>>> ', spinResult);
        G.spinResult = spinResult; // Store the result of the spin
        G.stage = GameStages.PLAYING; // Update stage to spinning

        // Example code to calculate winnings (implementation needed)
        Object.keys(G.players).forEach((playerID) => {
          const playerName = G.players[playerID].name as string;
          const playerBets = G.players[playerID].bets as PlacedChip[];
          if (playerBets.length > 0) {
            const sumWon = calculateWinnings(spinResult, playerBets);
            console.log('sumWon>>> playerName ', sumWon, playerName);
            G.wins.push({
              username: `${playerName} (${playerID})` || `User ${playerID}`,
              sum: sumWon,
            });
          }
        });
      },
      moves: {
        nextStage: {
          move: ({ G, events }) => {
            G.stage = GameStages.NONE; // Move to results stage
            events.endPhase(); // Move to the next phase
          },
          noLimit: true,
        },
        quit: {
          move: quitGame,
          noLimit: true,
        },
      },
      endIf: ({ G }) => G.stage === GameStages.NONE,
      next: 'betting', // Transition to the betting phase
    },
  },

  turn: {
    activePlayers: ActivePlayers.ALL,
  },

  endIf: ({ G }) => {
    if (G.quit) {
      console.log('Game ended.');
      return 'Game Over';
    }
  },
};

export default RouletteGame2;
