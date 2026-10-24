import { EGameType } from "../models/enum/EGameType";
import { ECreateGameForm } from "../models/enum/ECreateGameForm";
import { EPlayerIcon } from "../models/enum/EPlayerIcon";

export const text = {
  appName: "Score More",
  result: {
    header: "Result",
  },
  scoreBoard: {
    header: "Scoreboard",
    rounds: "Rounds: ",
  },
  gameGraph: {
    header: "Game progress",
    chartLabel: "Cumulative score by round",
    xAxis: "Round",
    rounds: "rounds",
    round: "Round",
    noPlayers: "Add players to see game progress.",
  },
  gameHero: {
    title: "Keep the whole table in the game.",
    welcome:
      "Set up your players, choose your rules, and keep every score together.",
    createTitle: "Create a game",
    createDescription: "Choose a name and add the players joining in.",
    gameList: {
      header: "Your games",
      description: "Pick up where you left off.",
      noGame: "No games yet",
      emptyDescription: "Create your first game to see it here.",
    },
  },
  round: {
    locked: "Locked",
    unlock: "Unlock",
    input: "Score",
    toggleDevilHorns: "Toggle devil horns for",
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
    createGame: { button: "Create game", header: "Create game" },
    addRoundButton: { button: "New round" },
    showGames: { button: "Show games", header: "Games" },
    restartGame: {
      button: "Restart game",
      content:
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
  playerProfile: {
    inspect: "View profile",
    back: "Back to players",
    profileLabel: "Player profile",
    playerSummary: "Your stats and game activity",
    gamesPlayed: "Games played",
    personalize: "Personalize",
    personalizeHint: "Update your display name and avatar.",
    activity: "On the scoreboard",
    name: "Player name",
    image: "Choose image",
    win: "win",
    totalWins: "Victories",
    wins: "wins",
    games: "Games",
    round: "round",
    rounds: "rounds",
    inProgress: "In progress",
    completed: "Completed",
    noGames: "This player is not in any games yet.",
    noPlayers: "No players yet.",
    icons: {
      [EPlayerIcon.INJURED]: "Injured",
      [EPlayerIcon.GRADUATE]: "Graduate",
      [EPlayerIcon.MEDIC]: "Medic",
      [EPlayerIcon.NINJA]: "Ninja",
      [EPlayerIcon.SPY]: "Spy",
      [EPlayerIcon.ASTRONAUT]: "Astronaut",
      [EPlayerIcon.SUITE]: "Suit",
      [EPlayerIcon.NURSE]: "Nurse",
    },
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
      [ECreateGameForm.LOSE_BY]: "Lose by score",
      [ECreateGameForm.START_SCORE]: "Starting score",
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
    advancedGameSettings: "Advanced game settings",
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
    reorderPlayers: "Drag to reorder players",
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
    createNew: "Copy game",
  },
  formValidation: {
    numberOfPlayers: "Players should be more than {0}",
    required: "This field is required",
    minValueText: "Text should be longer than {0} characters",
    maxValueText: "Text should be less than {0} characters",
  },
  copyGame: {
    label: "Copy players and settings to new game",
  },
  portal: {},
  errors: { root: "Could not find root element" },
} as const;
