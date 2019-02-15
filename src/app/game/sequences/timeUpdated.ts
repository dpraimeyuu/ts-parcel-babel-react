import { sequence } from "cerebral";
import { increment, when, set } from "cerebral/factories";
import { state } from "../../app.cerebral";
import { stopTimeFlow } from "../providers/time";

export default sequence([
    when(state.game.timeLeft, (timeLeft) => timeLeft === 0), {
        true: [
            set(state.game.status, "PLAYER_LOSE"),
            set(state.game.currentTime, 0),
            stopTimeFlow
        ],
        false: increment(state.game.currentTime)
    }
])