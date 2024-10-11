import { EGameType } from "../models/enum/EGameType";
import { ECreateGameForm } from "../models/enum/ECreateGameForm";

export const text = {
  appName: "Score more",
  scoreBoard: {
    header: "ScoreBoard",
  },
  footer: {
    showPlayerList: "Show players",
    addRoundButton: "New round",
    nextRoundButton: "Next",
    restartGame: "Restart game",
  },
  players: {
    addPlayersButton: "Add player",
    addPlayerButton: "Add player",
  },
  gameSettings: {
    form: {
      [ECreateGameForm.GAME_NAME]: "Name of game",
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
  },
  formValidation: { required: "This field is required" },
  portal: {},
};
