import { AxiosInstance, AxiosRequestConfig } from "axios";
import { BoardGameAPI } from "../types";
import { boardGameApi, GAME_NAME } from "../api/boardApi";

const getClientInstance = () => {
  return boardGameApi.client();
};

const getLobbyClientInstance = () => {
  return boardGameApi.lobbyClient;
};

const getHeadersConfig = (client: AxiosInstance, accessToken?: string) => {
  const config = client.defaults;

  // if (accessToken) config.headers.Authorization = accessToken;

  return config as unknown as AxiosRequestConfig;
};

export const getGames = async () => {
  const client = await getClientInstance();
  const response = await client.get("/");
  return response.data as BoardGameAPI.GameMatch;
};

export const getGameByMatchId = async (params: { matchID: string }) => {
  const client = await getClientInstance();
  const config = getHeadersConfig(client);

  const response = await client.get(`/${params.matchID}`, config);
  return (response.data as BoardGameAPI.Match) || null;
};

export const joinMatch = async (params: {
  matchID: string;
  playerID: string;
  playerName: string;
  accessToken?: string;
}) => {
  const client = await getClientInstance();
  const config = getHeadersConfig(client, params.accessToken);

  const data = {
    playerID: params.playerID,
    playerName: params.playerName,
  };
  const response = await client.post(`/${params.matchID}/join`, data, config);
  return response.data; //as SaveConsentRules.Response;
};

export const createMatch = async (params: {
  numPlayers: number;
  accessToken?: string;
}) => {
  const client = await getClientInstance();
  const config = getHeadersConfig(client, params.accessToken);

  const data = {
    numPlayers: params.numPlayers,
  };
  const response = await client.post("/create", data, config);
  return response.data; //as SaveConsentRules.Response;
};

export const updateMetadata = async (params: {
  matchID: string;
  playerID: string;
  credentials: any;
  playerName: string;
  data: any;
}) => {
  return await getLobbyClientInstance().updatePlayer(
    GAME_NAME,
    params.matchID,
    {
      playerID: params.playerID,
      credentials: params.credentials,
      newName: params.playerName,
      data: params.data,
    }
  );
};

export const leaveMatch = async (params: {
  matchID: string;
  playerID: string;
  credentials: any;
}) => {
  return await getLobbyClientInstance().leaveMatch(GAME_NAME, params.matchID, {
    playerID: params.playerID,
    credentials: params.credentials,
  });
};
