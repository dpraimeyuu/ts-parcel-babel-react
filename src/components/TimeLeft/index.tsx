import * as React from "react";
import { ConnectedProps, connect } from "@cerebral/react";

import { state } from "../../app/app.cerebral";

const timeDependencies = {
    timeLeft: state.game.timeLeft
}
type TimeDependencies = typeof timeDependencies
const TimeLeft: React.FunctionComponent<TimeDependencies & ConnectedProps> = (props) => (
    <div style= {{ width: "10em", backgroundColor: "white"}}>
        Time left: { props.timeLeft }
    </div>
)
export default connect<{}, TimeDependencies>(timeDependencies, TimeLeft)