import { set } from "cerebral/factories";
import { IContext as Context, sequence } from "cerebral";
import { state, props as p } from "../../app.cerebral";
import { Card } from "../types";

function shuffle<T extends {}>(a: T[]) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

type Payload = { numberOfCards: number }
type Props = { cards: Card[] } & Payload
const props = p as any as Props

const createFigure = (_: string, k: number) => Math.floor(k / 2).toString();

const randomizeCards = ({ props }: Context<Props>) => {
    const indexes = Array.from(new Array(props.numberOfCards), createFigure)
    const cards = shuffle(indexes)
        .map<Card>((idx) => ({ figure: idx, isSelected: false, isSolved: false }))

    return { cards }
}

const startGame = ({ props, store }: Context<Props>) => {
    store.set(state.game.cards, props.cards)
    store.set(state.game.status, "PLAYING")
}
export default sequence<Payload>([
    randomizeCards,
    startGame
])