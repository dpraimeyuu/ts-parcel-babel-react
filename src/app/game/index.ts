import { ModuleDefinition, Provider } from 'cerebral'

import * as sequences from "./sequences/index";
import { State } from './types'
import { Time } from "./providers/time/index";

const state: State = {
    cards: [],
    status: "NOT_STARTED",
    currentTime: 0,
    points: 0
}

const main: ModuleDefinition<State> = {
    state,
    sequences,
    providers: {
        time: Provider(Time("game.timeUpdated"))
    }
}

export default main