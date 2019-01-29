import * as React from "react";
import { connect } from "@cerebral/react";

import { state } from "../app/app.cerebral";

const AddTodo = () => (
    <>
        <input type="text" />
    </>
)

class App extends React.Component<typeof connectProps> {
    render = () => (
        <div className="">
            { this.props.title }
            <AddTodo />
        </div>
    )
}

const connectProps = {
    title: state.title
}

export default connect(connectProps, App)