import * as sequences from "./sequences/index"

export type Sequences = {
    [key in keyof typeof sequences]: typeof sequences[key]
};

export type State = {
}

export type Card = {
    isSelected: boolean,
    figure: string,
    isSolved: boolean
}

export type GameModule = {
    state: { game: State},
    sequences: { game: Sequences }
}