import { ModuleDefinition, Provider } from 'cerebral'

import * as sequences from "./sequences/index";
import { State } from './types'
import { Time } from "./providers/time";
import { timeLeft } from './computeds/timeLeft';
import { points } from './computeds/points';

const state: State = {
    cards: [],
    status: "NOT_STARTED",
    currentTime: 0,
    points,
    timeLeft
}

const main: ModuleDefinition<State> = {
    state,
    sequences,
    providers: {
        time: Provider(Time({
            timeUpdated: "game.timeUpdated",
        }))
    }
}

export default main