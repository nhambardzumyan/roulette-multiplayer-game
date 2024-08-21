import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

import RouletteGame from "../core/Game";
import RouletteBoard from "./RouletteBoard";
import { SERVER_URL } from "../api/boardApi";

const socket = SocketIO({ server: SERVER_URL });

const BoardClient = ({ playerID, matchID, credentials = "" }) => {
  console.log("BoardClient playerID: " + playerID);
  console.log("BoardClient credentials: " + credentials);

  const Game = Client({
    game: RouletteGame,
    board: RouletteBoard,
    debug: true,
    //   multiplayer: Local(),
    multiplayer: socket,
  });

  return (
    <>
      <Game
        playerID={playerID || "1"}
        matchID={matchID}
        credentials={credentials}
      />
    </>
  );
};

export default BoardClient;
