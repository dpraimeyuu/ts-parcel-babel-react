import { IContext as Context, sequence, Tag, IContext } from "cerebral";

import { state, props as p } from "../../app.cerebral";
import { Card } from "../types";
import { when, set } from "cerebral/factories";

type Payload = { card: Card }

const processSelectedCards = ({ props, store, get }: Context<Payload>) => {
    const { card } = props

    const cards: Card[] = get(state.game.cards)
    
    const selectedCards = cards.filter((c) => c.isSelected)
    if(selectedCards.length === 2) {
        const [first, second] = selectedCards
        const fstIdx = cards.indexOf(first)
        const sndIdx = cards.indexOf(second)
        if(first.figure === second.figure) {
            setTimeout(() => {
                store.set(state.game.cards[fstIdx], { ...first, isSelected: false, isSolved: true })
                store.set(state.game.cards[sndIdx], { ...second, isSelected: false, isSolved: true })
                if(cards.every((c => c.isSolved))) {
                    setTimeout(() => store.set(state.game.status, "FINISHED"), 200)
                }
            }, 1000)
        } else {
            setTimeout(() => {
                store.set(state.game.cards[fstIdx], { ...first, isSelected: false })
                store.set(state.game.cards[sndIdx], { ...second, isSelected: false })
            }, 1000)
        }    
    }

}

const areExactlyTwoSelected = (cardsTag: Card[]) => ({ resolve, path }: IContext) => {
    const cards = resolve.value<Card[]>(cardsTag)
    if(!cards) throw Error(`Cards are not existing under path: ${resolve.path(cardsTag as any as Tag<Card[]>)}`)

    if (cards.filter((c) => c.isSelected).length === 2) return path.true()

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

const props = p as unknown as Payload & { index: number }

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
                            processSelectedCards
                        ]
                    })
                ]
            }
        ]
    }
])