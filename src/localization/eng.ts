import { EGameType } from "../models/enum/EGameType";

export const text = {
  scoreBoard: {
    header: "ScoreBoard"
  },
  footer: {
    showPlayerList: "Show players",
    hidePlayerList: "Hide players",
    addRoundButton: "New round",
    nextRoundButton: "Next",
    restartGame: "Restart game"
  },
  players: {
    addPlayersButton: "Add player",
    addPlayerButton: "Add player",
  },
  gameSettings: {
    [EGameType.Default]: "Default",
    [EGameType.Chicago]: "Chicago",
    [EGameType.Padel]: "Padel"
  },
  button: {
    close: "Close"
  },
  formValidation: { required: "This field is required" },
  portal:
  {}
};
