import { Compute } from "cerebral";

import { state } from "../../app.cerebral";

export const timeLeft = Compute<number>((get) => {
    if (get(state.game.status) === "NOT_STARTED") return 0
    const startTime = get(state.game.cards).length * 4
    const currentTime = get(state.game.currentTime)

    return startTime - currentTime
})