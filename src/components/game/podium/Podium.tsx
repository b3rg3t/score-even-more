import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import {
  selectSortedScoreByPlayer,
  setGameFinished,
} from "../../../store/reducers/game/gameSlice";
import { FaTrophy } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
import { text } from "../../../localization/eng";
import { PositionList } from "../positionList/PositionList";

type PlayerScore = {
  position: number;
  name: string | undefined;
  playerId: string;
  totalScore: number;
};

export const Podium = () => {
  const dispatch = useAppDispatch();
  const playerScore = useAppSelector(selectSortedScoreByPlayer);

  const topPlayers: PlayerScore[] = [
    playerScore[1],
    playerScore[0],
    playerScore[2],
  ];

  const stapleWrapperClassName = "d-flex flex-column align-items-center w-50";
  const stapleClassName =
    "w-100 position-relative d-flex justify-content-center align-items-center border";
  return (
    <section className="bg-dark border rounded p-2 shadow mx-2 mt-2">
      <header className="d-flex justify-content-between">
        <h2 className="text-white display-2 fw-bold mb-0">
          {text.result.header}
        </h2>
        <button
          title={text.button.finish}
          className="btn px-2 text-white"
          onClick={() => dispatch(setGameFinished())}
        >
          <FaTimesCircle />
        </button>
      </header>
      <ul className="d-flex align-items-end list-unstyled">
        {topPlayers.map((player, idx) => {
          if (idx === 0 && player) {
            return (
              <li className={stapleWrapperClassName} key={player.playerId}>
                <span className="text-white">{player.name}</span>
                <div
                  className={stapleClassName}
                  style={{
                    backgroundColor: "darkblue",
                    height: (player?.totalScore ?? 0) + 20,
                    borderRadius: "8px 0 0 0",
                  }}
                >
                  <span className="text-white">2</span>
                </div>
              </li>
            );
          } else if (idx === 1 && player) {
            return (
              <li className={stapleWrapperClassName} key={player.playerId}>
                <div className="d-flex flex-column align-items-center">
                  <FaTrophy color="yellow" />
                  <span className="text-white">{player.name}</span>
                </div>
                <div
                  className={stapleClassName + " rounded-top"}
                  style={{
                    backgroundColor: "darkblue",
                    height: (player.totalScore ?? 0) + 25,
                  }}
                >
                  <span className="text-white">1</span>
                </div>
              </li>
            );
          } else if (idx === 2 && player) {
            return (
              <li className={stapleWrapperClassName} key={player.playerId}>
                <span className="text-white">{player?.name}</span>
                <div
                  className={stapleClassName}
                  style={{
                    backgroundColor: "darkblue",
                    height: (player.totalScore ?? 0) + 15,
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
      <PositionList />
    </section>
  );
};
