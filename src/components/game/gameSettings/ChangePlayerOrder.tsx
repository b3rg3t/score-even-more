import { selectActiveGame } from "../../../store/reducers/game/gameSlice"
import { useAppSelector } from "../../../store/redux/hooks"

export const ChangePlayerOrder = () => {
    const players = useAppSelector(selectActiveGame)

    return (
        <div>
            
        </div>
    )
}
