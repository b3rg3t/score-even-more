import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import {
  selectPlayersProfile,
  selectScoreByPlayer,
  setGameFinished,
} from "../../store/reducers/game/gameSlice";
import { FaTrophy } from "react-icons/fa6";
import { TPlayer } from "../../models/type/TPlayer";
import { FaTimesCircle } from "react-icons/fa";

type PlayerScore = {
  name: TPlayer["name"];
  score: number;
};

export const Podium = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector(selectPlayersProfile);
  const totalScore = useAppSelector(selectScoreByPlayer);

  const playerScore = players
    .map((player) => ({
      name: player.name,
      score: totalScore[player.playerId],
    }))
    .sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      } else if (a.score < b.score) {
        return 1;
      }
      return 0;
    });

  const topPlayers: PlayerScore[] = [
    playerScore[1],
    playerScore[0],
    playerScore[2],
  ];

  const stapleWrapperClassName = "d-flex flex-column align-items-center w-50";
  const stapleClassName =
    "w-100 position-relative d-flex justify-content-center align-items-center border";
  return (
    <section className="score-board border rounded p-2 shadow">
      <header className="d-flex justify-content-between">
        <h3 className="text-white">Score</h3>
        <button className="btn px-2 text-white" onClick={() => dispatch(setGameFinished())}>
          <FaTimesCircle />
        </button>
      </header>
      <ul className="d-flex align-items-end list-unstyled">
        {topPlayers.map((player, idx) => {
          if (idx === 0 && player) {
            return (
              <li className={stapleWrapperClassName} key={player.name + idx}>
                <span className="text-white">{player.name}</span>
                <div
                  className={stapleClassName}
                  style={{
                    backgroundColor: "darkblue",
                    height: player.score + 20,
                    borderRadius: "8px 0 0 0",
                  }}
                >
                  <span className="text-white">2</span>
                </div>
              </li>
            );
          } else if (idx === 1 && player) {
            return (
              <li className={stapleWrapperClassName} key={player.name + idx}>
                <div className="d-flex flex-column align-items-center">
                  <FaTrophy color="yellow" />
                  <span className="text-white">{player.name}</span>
                </div>
                <div
                  className={stapleClassName + " rounded-top"}
                  style={{
                    backgroundColor: "darkblue",
                    height: player.score + 25,
                  }}
                >
                  <span className="text-white">1</span>
                </div>
              </li>
            );
          } else if (idx === 2 && player) {
            return (
              <li className={stapleWrapperClassName} key={player.name + idx}>
                <span className="text-white">{player?.name}</span>
                <div
                  className={stapleClassName}
                  style={{
                    backgroundColor: "darkblue",
                    height: player?.score + 15,
                    borderRadius: " 0 8px 0 0",
                  }}
                >
                  <span className="text-white">3</span>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </section>
  );
};
