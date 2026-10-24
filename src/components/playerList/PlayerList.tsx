import { useState } from "react";
import { useAppSelector } from "../../store/redux/hooks";
import { selectAll } from "../../store/reducers/players/playersSlice";
import { PlayerItem } from "./PlayerItem";
import { PlayerProfile } from "./PlayerProfile";
import { text } from "../../localization/eng";

interface IPlayerList {
  onGameSelect: () => void;
}

export const PlayerList = ({ onGameSelect }: IPlayerList) => {
  const players = useAppSelector(selectAll);

  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const selectedPlayer = players.find(
    (player) => player.playerId === selectedPlayerId,
  );

  if (selectedPlayer) {
    return (
      <PlayerProfile
        player={selectedPlayer}
        onBack={() => setSelectedPlayerId(null)}
        onGameSelect={onGameSelect}
      />
    );
  }

  return (
    <ul className="drawer__list list-unstyled d-flex flex-column gap-2">
      {players.map((player) => (
        <PlayerItem
          key={player.playerId}
          {...player}
          onInspect={() => setSelectedPlayerId(player.playerId)}
        />
      ))}
      {!players.length && (
        <li className="text-white">{text.playerProfile.noPlayers}</li>
      )}
    </ul>
  );
};
