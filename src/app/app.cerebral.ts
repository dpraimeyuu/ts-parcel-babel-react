import * as cerebral from 'cerebral'

import { Main } from "./main/types";
import { GameModule } from './game/types';

type App = Main & GameModule

export const props = cerebral.props
export const state = cerebral.state as any as App["state"]
export const sequences = (cerebral.sequences as any) as App["sequences"]
export const moduleState = cerebral.moduleState
export const moduleSequences = cerebral.moduleSequences