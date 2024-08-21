# Roulette Multiplayer Game

This project is a demo multiplayer roulette game built using React, Redux, and Boardgame.io. The game supports real-time updates, winners history and a smooth user interface, covering features such as:

- Multiple Players
- Multiple Game Sessions
- Lobby of Games

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Game Usage](#game-features)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)
֊ [TODO](#todo)

## Getting Started

To get started, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/nhambardzumyan/roulette-multiplayer-game.git
```

2. Navigate to the project directory and sync core files:

```bash
cd roulette-multiplayer-game
source sync_core.sh
```

3. Install dependencies for both the client and server:

For the client:

```bash
cd client
nvm use
npm install
```

For the server:

```bash
cd ../server
nvm use
npm install
```

4. Build the TypeScript files:

For the client:

```bash
cd ../client
npm run build
```

For the server:

```bash
cd ../server
npm run build
```

## Project Structure

The project structure is as follows:

```
roulette-multiplayer-game/
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── server/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
└── README.md
└── sync_core.sh
└── docker-compose.yaml

```

## Usage

To run the game, follow these steps:

1. Start the server:

```bash
cd server
npm run dev
```

2. Start the client:

```bash
cd client
npm start
```

You can also use docker-compose.yaml to run the application:

1. From the root or the repository run the command:

```bash
 docker-compose up -d
```

The game will be accessible at `http://localhost:3000`.

## Game Features

To play the Roulette Multiplayer Game, follow these steps:

1. **Join the Game**:

   - Open the game in your browser at `http://localhost:3000`.
   - Enter your name and players number to start a new one.
   - Or choose an available game session to join.

2. **Place Your Bets**:

   - Once in the game, you’ll be able to see the roulette board and place your bets.
   - Choose your preferred numbers from Player section and place your bets by clicking the appropriate cell in the board.
   - Tap **Place Bet** button to place your bet for the game.

3. **Spin the Wheel**:

   - Any player can spin spin the roulette wheel and the game will register all the **placed bets** points.
   - Wait for the wheel to stop.
   - Tap on **See Results and Play Again** button to reveal the winning number and start a new round.

4. **Check Results**:

   - The game will display the winning number.
   - The winning dashboard will update with the latest results for all players.

5. **Next Round**:
   - After the results are shown, a new round will start, and players can place their bets again.

### Important Notes:

- **Multiple Sessions**: The game supports multiple sessions, so different groups of players can play simultaneously without interfering with each other.
- **Real-Time Updates**: All players within a game session will see real-time updates, wheel spins, and results.
    - TODO: display other players placed bets on dashboard
- **Bet Responsibly**: Make sure to place your bets carefully. Once the wheel is spun, you cannot change or withdraw your bets for that round.

## Available Scripts

Both the client and server have available scripts:

For the client:

- `npm start`: Starts the development server.
- `npm run build`: Builds the app for production to the `build` folder.

For the server:

- `npm start`: Starts the server.
- `npm run dev`: Starts the server in development mode with nodemon.
- `npm run build`: Compiles TypeScript files to JavaScript.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Redux: A predictable state container for JavaScript apps.
- Boardgame.io: A framework for creating turn-based games.
- TypeScript: A superset of JavaScript that adds static type checking.
- Express: A fast, unopinionated, minimalist web framework for Node.js.
- Material-UI: A popular React UI framework for implementing Google's Material Design.

## To-Do

- **Create a new winning/result phase**
  - Implement a phase in the game to automatically display the winners once the game ends.
  - Store winners and history into a db.
- **Highlight winning players:** Ensure that players who win are prominently highlighted.
- **Update Dashboard**: Update the dashboard to show all players placed bets and their results for better visibility.



## License

This project is licensed under the MIT License.

## Acknowledgments

This project was inspired by the boardgame.io framework and the multiplayer roulette game example provided in their documentation.
