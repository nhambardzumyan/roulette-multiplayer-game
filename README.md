# Roulette Multiplayer Game

This project is a demo multiplayer roulette game built using React, Redux, and Boardgame.io. The game supports real-time updates, winners history and a smooth user interface, covering features such as:

- Multiple Players
- Multiple Game Sessions
- Lobby of Games

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)

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

## License

This project is licensed under the MIT License.

## Acknowledgments

This project was inspired by the boardgame.io framework and the multiplayer roulette game example provided in their documentation.
