import axios from "axios";
import { LobbyClient } from "boardgame.io/client";

export const DEFAULT_SERVER_URL = "http://localhost:8002";
export const SERVER_URL =
  typeof process !== "undefined"
    ? process.env.BASE_API_URL ?? DEFAULT_SERVER_URL
    : DEFAULT_SERVER_URL;

const lobbyClient = new LobbyClient({ server: SERVER_URL });
lobbyClient.listGames().then(console.log).catch(console.error);

export const GAME_NAME = "roulette-game";
const BASE_URL = `${DEFAULT_SERVER_URL}/games/${GAME_NAME}`;

export const boardGameApi = {
  // with rest api
  client: () => {
    // const accessToken = localStorage.getItem('accessToken');
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        // ...ENVIRONMENT.COCOA_API.HEADERS,
        // authorization: accessToken,
      },
    });
  },

  // Lobby object, the same!
  lobbyClient,
};
