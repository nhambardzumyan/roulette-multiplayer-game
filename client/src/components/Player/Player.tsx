import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

import { ChipValues, ChipValuesList } from '../../types';
import { RootState } from '../../redux/store';

import donnie1 from '../../assets/portraits/ballerina.jpg';

import './Player.css';

export default function Player({ name, clearBet, placeBet, onChipClick }) {
  const { chipsData, winners } = useSelector(
    (state: RootState) => state.roulette
  );
  const portraitImage = donnie1;

  // console.log('>>>>', winners);
  // TODO: Affects player avatar's border on win by changing a class name

  const getChipClasses = (chip: number) => {
    return classNames({
      chip_selected: chip === chipsData.selectedChip,
      'chip-100': chip === ChipValues.HighRoller,
      'chip-20': chip === ChipValues.Premium,
      'chip-10': chip === ChipValues.Classic,
      'chip-5': chip === ChipValues.LowRoller,
    });
  };

  return (
    <div className="display-content">
      <div className="display-player">
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
        >
          <CardContent>
            <div className={`player`}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="0.5rem"
              >
                <img
                  src={portraitImage}
                  alt="portrait"
                  className={'profile-image'}
                />
              </Box>
              <Typography variant="subtitle1" color="#FAFAD2" align="center">
                {name}
              </Typography>
            </div>
            <div className="roulette-actions hideElementsTest">
              <ul>
                <li>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={clearBet}
                    size="small"
                  >
                    Clear Bet
                  </Button>
                </li>
                {ChipValuesList.map((chip) => (
                  <li key={chip} className="board-chip">
                    <div
                      className={getChipClasses(chip)}
                      onClick={() => onChipClick(chip)}
                    >
                      {chip}
                    </div>
                  </li>
                ))}
                <li>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={placeBet}
                    size="small"
                  >
                    Place Bet
                  </Button>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
