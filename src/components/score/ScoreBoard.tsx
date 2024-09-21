import { text } from "../../localization/eng";
import {
  clearRounds,
  selectPlayersProfile,
  selectTotalRounds,
} from "../../store/reducers/game/gameSlice";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { ScoreBoardPlayer } from "./ScoreBoardPlayer";
import { MdOutlineRestartAlt } from "react-icons/md";

export const ScoreBoard = () => {
  const dispatch = useAppDispatch();
  const totalRounds = useAppSelector(selectTotalRounds);
  const allPlayers = useAppSelector(selectPlayersProfile);
  const players = [...allPlayers];

  return (
    <section className="score-board d-flex flex-column mb-3 border mt-2 rounded">
      <div className="text-white rounded p-2 shadow">
        <div className="d-flex justify-content-between align-items-center border-bottom">
          <h2 className="mb-1 d-flex pb-1">
            {text.scoreBoard.header}
            <span className="ms-1 badge rounded-pill text-bg-info text-white">
              {totalRounds}
            </span>
          </h2>
          <button
            className="btn btn-primary flex-column py-1 px-1 mb-1"
            onClick={() => dispatch(clearRounds())}
          >
           <MdOutlineRestartAlt />
          </button>
        </div>
        <ul className="list-unstyled d-flex flex-column gap-1 mt-1 flex-wrap">
          {players.map((player) => (
            <ScoreBoardPlayer key={player.playerId} player={player}/>
          ))}
        </ul>
      </div>
    </section>
  );
};
