import * as React from "react";
import { render } from "react-dom";
import App from 'cerebral'
import Devtools from "cerebral/devtools";
import { Container } from '@cerebral/react'

import main from "./src/app/main/index"
import RootApp from "./src/components/App";

const app = App(main, {
    devtools: Devtools({
        host: 'localhost:8585'
    })})


if (module.hot) {
    module.hot.accept(function () {
        location.reload()
}

render(
    <Container app={app}>
        <RootApp />
    </Container>,
    document.getElementById("app")
)