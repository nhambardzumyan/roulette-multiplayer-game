import { useState, useEffect, useCallback } from 'react';
import Wheel from './Wheel';
import Board from './Board';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearBetAction,
  setCellClickAction,
  setChipClickAction,
  setGameDataAction,
} from '../redux/actions/socketActions';

import { Item, PlacedChip, GameData, GameStages, BoardGameAPI } from '../types';
import { AppDispatch, RootState } from '../redux/store';
import Player from './Player/Player';
import PlayerSection from './Player/PlayersSection';
import { activeMatchSelector } from '../redux/actions/commonActions';
import { getGameByMatchId } from '../services/boardAPI';
import { Box, Button, Typography } from '@mui/material';

const blackNumbers = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 28, 31, 33, 35,
];

const RouletteWrapper = ({ onBet, ctx, G, handleNextPhase }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const matchMeta = useSelector(activeMatchSelector);
  const { rouletteData, chipsData, number, winners, history } = useSelector(
    (state: RootState) => state.roulette
  );

  console.log(history);

  const [match, setMatch] = useState<BoardGameAPI.Match>(null);
  const activePlayer = match?.players.find(
    (p) => p.id === Number(matchMeta.playerID)
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGameByMatchId({ matchID: matchMeta.matchID });
      matchMeta.matchID && setMatch(data);
    };
    fetchData();
  }, [matchMeta.matchID]);

  useEffect(() => {
    const gameData = {} as GameData;

    if (ctx.phase == GameStages.PLACE_BET) {
      // console.log('Place bet');
      gameData.stage = GameStages.PLACE_BET;
      if (gameData.history == undefined) {
        gameData.history = [...history];
      }
      // console.log('number.next ', number.next);
      number.next !== null && gameData.history.push(number.next);

      if (gameData.history.length > 10) {
        gameData.history.shift();
      }
      gameData.wins = G.wins.sort((a, b) => b.sum - a.sum);
      setGameData(gameData);
    } else if (ctx.phase == GameStages.PLAYING) {
      gameData.stage = GameStages.PLAYING;
      gameData.value = G.spinResult;

      // console.log('G.wins >>>> : ', G.wins);
      gameData.wins = G.wins;

      setGameData(gameData);
    }
  }, [ctx.phase]);

  const setGameData = (gameData: GameData) => {
    dispatch(setGameDataAction(gameData));
  };

  const onCellClick = (item: Item) => {
    dispatch(setCellClickAction(item));
  };

  const onChipClick = (chip: number | null) => {
    if (chip != null) {
      dispatch(setChipClickAction(chip));
    }
  };

  const placeBet = () => {
    const placedChipsMap = chipsData.placedChips;
    const chips: PlacedChip[] = [];

    placedChipsMap.forEach((chipsPlaced) => {
      chips.push(chipsPlaced);
    });
    onBet(chips);
  };

  const clearBet = () => {
    dispatch(clearBetAction());
  };

  const handlePlayAgain = useCallback(() => {
    if (GameStages.PLAYING === ctx.phase) {
      clearBet();
      // TODO:
      // handleNextPhase();
    }
  }, [ctx.phase]);

  let phaseTitle = 'Welcome to the Casino Roulette!';
  let buttonTitle = 'Spin the wheel';
  switch (ctx.phase) {
    case GameStages.PLACE_BET:
      phaseTitle = 'Place your bets';
      buttonTitle = 'Spin the wheel';
      break;
    case GameStages.PLAYING:
      phaseTitle = 'Spinning the wheel';
      buttonTitle = 'See Result and Play again';
      break;
    default:
      break;
  }

  // console.log('history ', history);
  return (
    <Box sx={{ padding: '16px' }}>
      <div
        className="rouletteWheelWrapper"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          gap: '1rem',
        }}
      >
        {activePlayer && (
          <div className="controlPanel">
            <Player
              name={activePlayer.name}
              clearBet={clearBet}
              placeBet={placeBet}
              onChipClick={onChipClick}
            />
            <div className="playButton">
              <Button
                variant="contained"
                color="success"
                onClick={handleNextPhase}
                // disabled={ctx.phase !== GameStages.PLACE_BET}
              >
                {buttonTitle}
              </Button>
              <Typography variant="h4" color="#FAFAD2" gutterBottom>
                {phaseTitle}
              </Typography>
            </div>
          </div>
        )}

        <div>
          <Wheel
            rouletteData={rouletteData}
            number={number}
            startAgain={handlePlayAgain}
          />
        </div>
        <div className="winnerHistory hideElementsTest">
          {history?.map((entry, index) => {
            const colorClass =
              entry === 0
                ? 'green'
                : blackNumbers.includes(entry)
                ? 'black'
                : 'red';
            return (
              <div key={index} className={colorClass}>
                {entry}
              </div>
            );
          })}
        </div>
      </div>

      <Board
        onCellClick={onCellClick}
        chipsData={chipsData}
        rouletteData={rouletteData}
      />

      <div>
        <PlayerSection ctx={ctx} G={G} match={match} />
      </div>

      <div className="winnersBoard">
        <Typography variant="h4" color="#FAFAD2" align="center">
          WINNERS
        </Typography>
        <Typography variant="body2" color="grey" align="center">
          {!winners.length && 'N/A'}
        </Typography>
        {winners.map((entry, index) => (
          <Typography
            variant="body1"
            color="#FAFAD2"
            align="center"
            key={index}
          >
            {index + 1}. {entry.username} won {entry.sum}${/* </div> */}
          </Typography>
        ))}
      </div>
    </Box>
  );
};

export default RouletteWrapper;
