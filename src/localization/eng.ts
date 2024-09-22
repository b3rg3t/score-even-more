import { EGameType } from "../models/enum/EGameType";

export const text = {
  appName: "Score more",
  scoreBoard: {
    header: "ScoreBoard"
  },
  footer: {
    showPlayerList: "Show players",
    addRoundButton: "New round",
    nextRoundButton: "Next",
    restartGame: "Restart game"
  },
  players: {
    addPlayersButton: "Add player",
    addPlayerButton: "Add player",
  },
  gameSettings: {
    form: {
      calcByScore: "Calculate score by",
      scoreToWin: "Score to win",
      maxScorePerRound: "Max score per round"
    },
    gameTypeOptions: {
      [EGameType.Default]: "Default",
      [EGameType.Chicago]: "Chicago",
      [EGameType.Padel]: "Padel"
    }
  },
  button: {
    close: "Close"
  },
  formValidation: { required: "This field is required" },
  portal:
  {}
};
