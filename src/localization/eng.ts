import { EGameType } from "../models/enum/EGameType";

export const text = {
  scoreBoard: {
    header: "ScoreBoard"
  },
  rounds: {
    addRoundButton: "New round",
    nextRoundButton: "Next"
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
