import { ModuleDefinition } from 'cerebral'
import { State } from './types'
import game from "../game/index";

const state: State = {
}


const main: ModuleDefinition<State> = {
    state,
    modules: {
        game
    },
    providers: {

    }
}

export default main