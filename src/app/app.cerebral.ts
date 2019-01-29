import * as cerebral from 'cerebral'

import * as Main from "./main/types";

type State = Main.State & {}

export const props = cerebral.props
export const state = cerebral.state as State
export const sequences = cerebral.sequences
export const moduleState = cerebral.moduleState
export const moduleComputed = cerebral.moduleComputed
export const moduleSequences = cerebral.moduleSequences