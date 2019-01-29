import { ModuleDefinition } from 'cerebral'
import { State } from './types'

const state: State = {
    title: 'Hello CEREBRAL!',
}

const main: ModuleDefinition<State> = {
    state,
}

export default main