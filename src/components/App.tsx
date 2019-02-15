import * as React from "react";
import { connect, ConnectedProps } from "@cerebral/react";

import { state, sequences } from "../app/app.cerebral";
import { Card } from "app/game/types";
import { chunk } from "./utils";
import TimeLeft from "./TimeLeft";

type CardsCountProps = { onChange: typeof sequences.game.initializeGame }
class CardsCount extends React.Component<CardsCountProps, { count?: number }> {
    constructor(props: CardsCountProps) {
        super(props)
        this.state = {}
    }
    render = () => (
        <div style={{ marginTop: "1em" }}>
            How many cards do you want to play with?
            <span style={{ marginLeft: "1em" }}>
                <input type="text" onChange={(e) => this.setState({ count: Number(e.target.value) })} />
                <button style={{ marginLeft: "1em" }} disabled={!Boolean(this.state.count)} onClick={() => this.props.onChange({ numberOfCards: this.state.count as number })}>START</button>
            </span>
        </div>
    )
}

const cardEdge = "50px"

const getCardColor = (card: Card) => {
    if(card.isSolved) return "lightgray"
    if(card.isSelected) return "white"

    return "lightskyblue"
}
const Card = ({ onClick, card }: { onClick: any, card: Card }) => (
    <div onClick={() => onClick({ card })} style={{ backgroundColor: getCardColor(card)}}>
        <article className="mw5 center pa3 pa4-ns ba b--black-10">
        {
            <p className="center black-70" style={{ fontSize: "3em", textAlign: "center", width: cardEdge, height: cardEdge}}>
                {card && card.isSelected && card.figure}
            </p>
        }
        </article>
    </div>
)

const CardsGrid = ({ cards, onClick }: { onClick: any, cards: Card[] }) => {
    const rowsCount = Math.ceil(Math.sqrt(cards.length))
    const grid = chunk(cards, rowsCount)
    
    return <>
        {
            grid
                .map((row) => (
                    <div style={{ display: "flex" }}>
                        {row.map((c) => <Card card={c} onClick={onClick} />)}
                    </div>
                ))   
        }
    </>
}

const dependencies = {
    gameStatus: state.game.status,
    cards: state.game.cards,
    initialize: sequences.game.initializeGame,
    cardSelected: sequences.game.cardSelected
}

type Dependencies = typeof dependencies

const App: React.FunctionComponent<Dependencies & ConnectedProps> = (props) => (
        <div>
            { props.gameStatus !== "PLAYING" && <CardsCount onChange={(payload: { numberOfCards: number }) => props.initialize(payload)}/>}
            {
                props.gameStatus === "PLAYING" && props.cards && <>
                    <TimeLeft  />
                    <CardsGrid onClick={props.cardSelected} cards={props.cards.map(c => c)}/>
                </>
            }
            { props.gameStatus === "PLAYER_WIN" && <span style={{ color: "green" }}>Congratz! You've completed the game!</span> }
            { props.gameStatus === "PLAYER_LOSE" && <span style={{ color: "red" }}>Unfortunately time's up, you lost! Try again, maybe this time you'll make it!</span> }
        </div>
    )


export default connect(dependencies, App)