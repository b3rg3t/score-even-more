import { EGameType } from "../models/enum/EGameType";
import { ECreateGameForm } from "../models/enum/ECreateGameForm";

export const text = {
  appName: "Score More",
  result: {
    header: "Result",
  },
  scoreBoard: {
    header: "Scoreboard",
    rounds: "Rounds: ",
  },
  gameHero: {
    welcome: `Welcome to score more, the application to keep track of your score
              while playing games. To begin create an new game by filling out the
              form.`,
    gameList: { header: "Select a game", noGame: "No games" },
  },
  round: {
    locked: "Locked",
    unlock: "Unlock",
    input: "Score",
  },
  header: {
    header: "Settings",
    deleteGame: "Remove game",
  },
  footer: {
    showPlayerList: {
      button: "Show players",
      header: "Player list",
    },
    createGame: { button: "Create game", header: "Player list" },
    addRoundButton: { button: "New round" },
    showGames: { button: "Show games", header: "Games" },
    restartGame: {
      button: "Restart game",
      header:
        "Are you sure you want to restart the game, all score will be lost?",
    },
    deletePlayer: {
      header: "Delete player",
    },
    deleteGame: {
      header: "Delete game",
    },
  },
  modal: {
    deletePlayer: {
      content:
        "Are you sure you want to delete '{0}', player will be removed from all games with it's score, perhaps better to just remove the player from the current game by unselecting player under 'Game players' in burger menu?",
    },
    deleteGame: {
      content:
        "Are you sure you want to delete '{0}', all game data will be lost?",
    },
  },
  players: {
    addPlayersButton: "Add player",
    addPlayerButton: "Add player",
  },
  gameSettings: {
    createGameForm: {
      [ECreateGameForm.GAME_NAME]: "Name of game",
      [ECreateGameForm.PLAYERS]: "Players",
      [ECreateGameForm.GAME_TYPE]: "Type of game",
      [ECreateGameForm.CALC_SCORE_BY]: "Calculate score by",
      [ECreateGameForm.SCORE_TO_WIN]: "Score to win",
      [ECreateGameForm.MAX_SCORE_PER_ROUND]: "Max score per round",
      [ECreateGameForm.LOCK_ON_NEW_ROUND]:
        "Lock buttons on previous round when new round is added",
      [ECreateGameForm.SLIDE_ROUND]: "Swipe rounds",
      [ECreateGameForm.SIZE_PLAYER]: "Use larger sized round player item",
    },
    gameTypeOptions: {
      [EGameType.DEFAULT]: "Default",
      [EGameType.CHICAGO]: "Chicago",
      [EGameType.PADEL]: "Padel",
    },
    createSelect: {
      createPlayer: "Create: {0}",
      placeholder: "Select or Create players...",
    },
    gameName: {
      placeholder: "Lord of the rings...",
    },
    advancedSettings: "Advanced settings",
    playerGame: "Game players",
  },
  button: {
    close: "Close",
    yes: "Yes",
    cancel: "Cancel",
    reset: "Reset",
    submit: "Start",
    save: "Save",
    update: "Update",
    removePlayer: "Remove player",
    finish: "Finish game",
    newRound: "New round",
    decrease: "Decrease score",
    increase: "Increase score",
    removeRound: "Remove round",
    addRound: "Add round",
    restartGame: "Restart game",
    editPlayer: "Edit player",
    addPlayer: "Add player",
    openMenu: "Open menu",
    active: "Current",
    removeGame: "Remove game",
  },
  formValidation: {
    numberOfPlayers: "Players should be more than {0}",
    required: "This field is required",
    minValueText: "Text should be longer than {0} characters",
    maxValueText: "Text should be less than {0} characters",
  },
  gameList: {
    online: "Online",
    offline: "Local",
  },
  portal: {},
  errors: { root: "Could not find root element" },
} as const;
