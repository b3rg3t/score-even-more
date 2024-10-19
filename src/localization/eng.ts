import { EGameType } from "../models/enum/EGameType";
import { ECreateGameForm } from "../models/enum/ECreateGameForm";

export const text = {
  appName: "Score more",
  scoreBoard: {
    header: "ScoreBoard",
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
    form: {
      [ECreateGameForm.GAME_NAME]: "Name of game",
      [ECreateGameForm.PLAYERS]: "Players",
      [ECreateGameForm.GAME_TYPE]: "Type of game",
      [ECreateGameForm.CALC_SCORE_BY]: "Calculate score by",
      [ECreateGameForm.SCORE_TO_WIN]: "Score to win",
      [ECreateGameForm.MAX_SCORE_PER_ROUND]: "Max score per round",
    },
    gameTypeOptions: {
      [EGameType.Default]: "Default",
      [EGameType.Chicago]: "Chicago",
      [EGameType.Padel]: "Padel",
    },
  },
  button: {
    close: "Close",
    yes: "Yes",
    cancel: "Cancel",
    submit: "Submit"
  },
  formValidation: {
    numberOfPlayers: "Players should be more than {0}",
    required: "This field is required",
    minValueText: "Text should be longer than {0} characters",
    maxValueText: "Text should be less than {0} characters",
  },
  portal: {},
} as const;
