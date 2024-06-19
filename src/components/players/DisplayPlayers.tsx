import { selectTotal } from "../../store/reducers/players"
import { useAppSelector } from "../../store/redux/hooks"

export const DisplayPlayers = () => {
    const totalPlayers = useAppSelector(selectTotal)
    return (
        <div>
            <div className="chip">{totalPlayers}</div>
        </div>
    )
}
