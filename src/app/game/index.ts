import { ModuleDefinition } from 'cerebral'

import * as sequences from "./sequences/index";
import { State } from './types'

const state: State = {
    cards: [],
    status: "NOT_STARTED"
}

const main: ModuleDefinition<State> = {
    state,
    sequences
}

export default main