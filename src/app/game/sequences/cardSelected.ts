import { IContext as Context, sequence, Tag, IContext } from "cerebral";

import { state, props as p } from "../../app.cerebral";
import { Card } from "../types";
import { when, set, wait } from "cerebral/factories";
import { stopTimeFlow } from "../providers/time";

type Payload = { card: Card }
const props = p as unknown as Payload & {
    index: number,
    selectedCards: [Card, Card],
    firstCardIndex: number,
    secondCardIndex: number 
}

const areExactlyTwoSelected = (cardsTag: Card[]) => ({ resolve, path }: IContext) => {
    const cards = resolve.value<Card[]>(cardsTag)
    if(!cards) throw Error(`Cards are not existing under path: ${resolve.path(cardsTag as any as Tag<Card[]>)}`)

    const selectedCards = cards.filter((c) => c.isSelected)
    if (selectedCards.length === 2) return path.true({ selectedCards })

    return path.false()
}

const _findIndex = <T extends {}>(collectionTag: T[], itemTag: T) => ({ resolve, path }: IContext) => {
    const collection = resolve.value<T[]>(collectionTag)
    const item  = resolve.value<T>(itemTag)
    if (!collection) throw Error(`Collection are not existing under path: ${resolve.path(collectionTag as any as Tag<Card[]>)}`)
    if (!item) throw Error(`Item are not existing under path: ${resolve.path(itemTag as any as Tag<Card[]>)}`)

    const index = collection.findIndex((v) => v === item)
    if(index === -1) return path.none()

    return path.some({ index })
}

const findIndex = <T extends {}>(collectionTag: T[], itemTag: T, paths: { some: any, none: any }) => sequence("find index", [
    _findIndex(collectionTag, itemTag), {
        some: paths.some,
        none: paths.none
    }
])

const areCardsEqual = (cardATag: Card, cardBTag: Card, paths: { true: any, false: any }) => sequence("are cards equal?", [
    when(cardATag, cardBTag, (cardA, cardB) => cardA.figure === cardB.figure), {
        true: paths.true,
        false: paths.false
    }
]) 

const isGameFinished = (cardsTag: Card[], paths: { true: any, false: any }) => sequence("is game finished?", [
    when(cardsTag, (cards: Card[]) => cards.every((card) => card.isSolved)), {
        true: paths.true,
        false: paths.false
    }
])

const processSelectedCards = sequence("process selected cards", [
    wait(1000), {
        continue: areCardsEqual(props.selectedCards[0], props.selectedCards[1], {
            true: [
                set(state.game.cards[props.firstCardIndex].isSolved, true),
                set(state.game.cards[props.secondCardIndex].isSolved, true),
                set(state.game.cards[props.firstCardIndex].isSelected, false),
                set(state.game.cards[props.secondCardIndex].isSelected, false),
                wait(200), {
                    continue: isGameFinished(state.game.cards, {
                        true: [
                            set(state.game.status, "PLAYER_WIN"),
                            stopTimeFlow,
                        ],
                        false: []
                    })
                }
            ],
            false: [
                set(state.game.cards[props.firstCardIndex].isSelected, false),
                set(state.game.cards[props.secondCardIndex].isSelected, false),
            ]
        })
    }       
])

export default sequence<Payload>([
    when(props.card.isSolved), {
        true: [],
        false: [
            areExactlyTwoSelected(state.game.cards), {
                true: [],
                false: [
                    findIndex(state.game.cards, props.card, {
                        none: [],
                        some: [
                            set(state.game.cards[props.index].isSelected, true),
                            areExactlyTwoSelected(state.game.cards), {
                                false: [],
                                true: [
                                    findIndex(state.game.cards, props.selectedCards[0], {
                                        none: [],
                                        some: set(props.firstCardIndex, props.index)
                                    }),
                                    findIndex(state.game.cards, props.selectedCards[1], {
                                        none: [],
                                        some: set(props.secondCardIndex, props.index)
                                    }),
                                    processSelectedCards
                                ]
                            }
                        ]
                    })
                ]
            }
        ]
    }
])