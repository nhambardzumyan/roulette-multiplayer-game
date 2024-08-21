import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BoardClient from "../board/BoardClient";
import { joinMatch } from "../services/boardAPI";
import {
  setErrorAction,
  setMatchMetadataAction,
  usernameSelector,
} from "../redux/actions/commonActions";
import { AppDispatch } from "../redux/store";

export default function PlayPage() {
  const { matchID, playerID } = useParams();
  const username = useSelector(usernameSelector);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [playerCredentials, setPlayerCredentials] = useState("");

  const handleJoin = async ({ matchID, playerID, playerName = "Player" }) => {
    try {
      const data = await joinMatch({ matchID, playerID, playerName });
      setPlayerCredentials(data.playerCredentials);
      dispatch(
        setMatchMetadataAction({
          playerID,
          matchID,
          playerName,
          playerCredentials: data.playerCredentials,
        })
      );
    } catch (error) {
      handleAPIError(error);
    }
  };

  const handleAPIError = (error: any) => {
    if (error?.response?.status === 409) {
      dispatch(setErrorAction({ message: "Try another Player ID." }));
    } else if (error?.response?.status === 404) {
      dispatch(setErrorAction({ message: "Could not find the match." }));
    } else {
      console.error("Error:", error.message);
      dispatch(setErrorAction({ message: error?.message || "Unknown Error" }));
    }
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleJoin({ matchID, playerID, playerName: username || "Player" });
    };
    fetchData();
  }, []);

  return (
    <>
      {playerCredentials ? (
        <BoardClient
          matchID={matchID}
          playerID={playerID}
          credentials={playerCredentials}
        />
      ) : null}
    </>
  );
}
