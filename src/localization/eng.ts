import { EGameType } from "../models/enum/EGameType";
import { ECreateGameForm } from "../models/enum/ECreateGameForm";

export const text = {
  appName: "Score More",
  scoreBoard: {
    header: "Scoreboard",
    rounds: "Rounds: ",
  },
  gameHero: {
    welcome: `Welcome to score more, the application to keep track of your score
              while playing games. To begin create an new game by filling out the
              form.`,
  },
  round: {
    locked: "Locked",
    unlock: "Unlock"
  },
  footer: {
    showPlayerList: "Show players",
    createGame: "Create game",
    addRoundButton: "New round",
    nextRoundButton: "Next",
    showGames: "Show games",
    restartGame: "Restart game",
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
      [ECreateGameForm.LOCK_ON_NEW_ROUND]: "Lock buttons on previous round on new round"
    },
    gameTypeOptions: {
      [EGameType.Default]: "Default",
      [EGameType.Chicago]: "Chicago",
      [EGameType.Padel]: "Padel",
    },
    advancedSettings: "Advanced settings",
    playerGame: "Game players"
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
    active: "Active"
  },
  formValidation: {
    numberOfPlayers: "Players should be more than {0}",
    required: "This field is required",
    minValueText: "Text should be longer than {0} characters",
    maxValueText: "Text should be less than {0} characters",
  },
  portal: {},
  errors: { root: "Could not find root element" },
} as const;
