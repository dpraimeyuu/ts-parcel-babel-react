import { ModuleDefinition } from 'cerebral'

import * as sequences from "./sequences/index";
import { State } from './types'

const state: State = {
}

const main: ModuleDefinition<State> = {
    state,
    sequences
}

export default main