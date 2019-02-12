import { sequence } from "cerebral";
import { increment } from "cerebral/factories";
import { state } from "../../app.cerebral";

export default sequence(increment(state.game.currentTime))