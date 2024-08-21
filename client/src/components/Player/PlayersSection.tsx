import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Popover,
} from '@mui/material';

import './Player.css';

const PlayerSection = ({ ctx, G, match }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverText, setPopoverText] = useState('');

  const handlePopoverOpen = (event, text) => {
    setAnchorEl(event.currentTarget);
    setPopoverText(text);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverText('');
  };

  const open = Boolean(anchorEl);

  return (
    <div className="display-player-section">
      <Typography variant="h4" color="#FAFAD2" align="center">
        Players {Object.keys(G.players).length}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px auto',
        }}
      >
        {match?.players.map((player) => (
          <Grid item xs={6} sm={2} md={1} key={player.id}>
            <Card
              sx={{
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backdropFilter: 'blur(10px)',
                background: 'rgba(0,0,0,0.2)',
                margin: 'auto',
              }}
              // sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
              onClick={(event) =>
                handlePopoverOpen(
                  event,
                  `Player ${player.name} is ${
                    player.isConnected ? 'Active' : 'Inactive'
                  }`
                )
              }
            >
              <CardContent>
                <Avatar
                  alt={player.name}
                  src={`/path/to/profile/${player.id}.jpg`} // Replace with the correct image path
                  sx={{ width: 56, height: 56, margin: 'auto' }}
                />
                <Typography variant="subtitle1" color="#FAFAD2" align="center">
                  {player.name || G.players[Number(player.id)].name || 'N/A'}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  {...(player.isConnected
                    ? { color: 'green' }
                    : { color: 'orange' })}
                >
                  {player.isConnected ? 'Active' : 'Inactive'}
                </Typography>
                <Typography variant="body2" align="center">
                  {player.isConnected && G.players[player.id].bets.length > 0
                    ? 'Betting...'
                    : ''}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography sx={{ p: 2 }}>{popoverText}</Typography>
      </Popover>
    </div>
  );
};

export default PlayerSection;
