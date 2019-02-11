import * as sequences from "./sequences/index"

export type Sequences = {
    [key in keyof typeof sequences]: typeof sequences[key]
};

export type State = {
    cards: Card[]
    status: GameStatus
}

export type GameStatus = "NOT_STARTED" | "PLAYING" | "FINISHED"

export type Card = {
    isSelected: boolean,
    figure: string,
    isSolved: boolean
}

export type GameModule = {
    state: { game: State},
    sequences: { game: Sequences }
}