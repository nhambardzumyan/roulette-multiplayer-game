import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Container,
  ThemeProvider,
} from "@mui/material";

import { AppDispatch } from "../redux/store";
import { setUserNameAction } from "../redux/actions/commonActions";
import { createMatch, getGames } from "../services/boardAPI";
import { BoardGameAPI } from "../types";

import { createTheme } from "@mui/material/styles";
import { setErrorAction } from "../redux/actions/commonActions";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ffecb3",
      main: "#ffc107",
      dark: "#ffca28",
      contrastText: "#243a0a",
    },
    secondary: {
      light: "#ffe57f",
      main: "#ffd740",
      dark: "#ffc400",
      contrastText: "#000",
    },
    text: {
      primary: "#FAFAD2",
      secondary: "#ffd740",
    },
  },
});

const HomePage = () => {
  const [name, setName] = useState("");
  const [matches, setMatches] = useState<BoardGameAPI.Match[] | null>(null);
  const [playerCount, setPlayerCount] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGames();
      setMatches(data.matches);
    };
    fetchData();
  }, []);

  const handleJoin = ({ matchID }) => {
    const m = matches.find((match) => match.matchID === matchID);
    const playerID = m?.players.find((player) => !player.name)?.id || "0";
    console.log("Joining match - ", matchID, playerID);
    navigate(`/game/${matchID}/${playerID}`);
  };

  const handleAPIError = (error: any) => {
    if (error.response.status === 409) {
      dispatch(setErrorAction({ message: "Try another Player ID." }));
    } else if (error.response.status === 404) {
      dispatch(setErrorAction({ message: "Could not find the match." }));
    } else {
      dispatch(setErrorAction({ message: error.message }));
    }
  };

  const handleCreateMatch = async () => {
    try {
      const { matchID } = await createMatch({ numPlayers: playerCount });
      dispatch(setUserNameAction({ username: name }));
      handleJoin({ matchID });
    } catch (error) {
      handleAPIError(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ marginTop: 50 }}>
        <Card
          variant="outlined"
          style={{
            padding: 20,
            margin: "30px auto",
            backdropFilter: "blur(10px)",
            background: "rgba(0,0,0,0.2)",
            width: "500px",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Start New Match
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Your Name"
                variant="outlined"
                color="secondary"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Players Count"
                variant="outlined"
                color="secondary"
                fullWidth
                value={playerCount}
                onChange={(e) => setPlayerCount(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCreateMatch}
                disabled={!name || !playerCount}
              >
                Start a New Match
              </Button>
            </Grid>
          </Grid>
        </Card>

        <Card
          variant="outlined"
          style={{
            padding: 20,
            backdropFilter: "blur(10px)",
            background: "rgba(0,0,0,0.2)",
            width: "500px",
            margin: "30px auto",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Available Matches
          </Typography>
          <List>
            {matches?.length === 0 && <>N/A</>}
            {matches?.map((match) => {
              // Find the first player who is not connected
              const availablePlayer = match.players.find(
                (player) => !player.name
              );

              return (
                <ListItem key={match.matchID}>
                  <ListItemText
                    primary={`Match ID: ${match.matchID}`}
                    secondary={
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Players {match.players.length}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    {availablePlayer ? (
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleJoin({
                            matchID: match.matchID,
                          })
                        }
                      >
                        Join as{" "}
                        {availablePlayer.name || `Player ${availablePlayer.id}`}
                      </Button>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        All players are connected
                      </Typography>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
