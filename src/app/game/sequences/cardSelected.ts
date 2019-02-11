import { IContext as Context, sequence } from "cerebral";

import { state, sequences } from "../../app.cerebral";
import { Card } from "../types";

type Payload = { card: Card }

const cardSelected = ({ props, store, get }: Context<Payload>) => {
    const { card } = props
    if(card.isSolved) return
    const cards: Card[] = get(state.game.cards)
    if (cards.filter((c) => c.isSelected).length === 2) return
    
    if(!cards || cards.length === 0) throw new Error("Cards were not initialized!")

    const c = cards.find(c => c === card)
    if(!c) throw new Error("Card was not found among cards")
    const idx = cards.indexOf(c)

    store.set((state.game.cards)[idx].isSelected, true)
    
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

export default sequence<Payload>(cardSelected)