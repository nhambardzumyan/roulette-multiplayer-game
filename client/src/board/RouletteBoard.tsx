import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BoardProps } from 'boardgame.io/react';

import { Button, Grid } from '@mui/material';

import { activeMatchSelector } from '../redux/actions/commonActions';
import RouletteWrapper from '../components/RouletteWrapper';
import { leaveMatch } from '../services/boardAPI';
import { PlacedChip } from '../types';

const RouletteBoard: React.FC<BoardProps> = ({ G, ctx, moves }) => {
  const matchMeta = useSelector(activeMatchSelector);
  const navigate = useNavigate();

  const handleQuitNow = () => {
    moves.quit();
    leaveMatch({
      matchID: matchMeta.matchID,
      playerID: matchMeta.playerID,
      credentials: matchMeta.playerCredentials,
    });
    navigate('/');
  };

  const handlePlaceBet = (bet: PlacedChip[]) => {
    if (bet.length > 0) moves.placeBet(bet);
  };

  const handleNextPhase = () => {
    console.log('handleNextPhase ', moves);
    moves.nextStage();
  };

  useEffect(() => {
    moves.setUserName(matchMeta.playerName || 'Player');
  }, []);

  return (
    <div>
      <Grid container justifyContent="flex-end" marginRight={30} mb={2}>
        <Grid item sx={{ mr: 5 }}>
          <Button variant="contained" color="error" onClick={handleQuitNow}>
            Quit
          </Button>
        </Grid>
      </Grid>
      <RouletteWrapper
        onBet={handlePlaceBet}
        handleNextPhase={handleNextPhase}
        ctx={ctx}
        G={G}
      />
    </div>
  );
};

export default RouletteBoard;
