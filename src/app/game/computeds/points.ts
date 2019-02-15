import { Compute } from "cerebral";
import { state } from "../../app.cerebral";

export const points = Compute((get) => {
    const gameStatus = get(state.game.status)
    if(gameStatus === "PLAYER_WIN") {
        const timeLeft = get(state.game.timeLeft)

        return timeLeft * 10
    }

    return 0
})