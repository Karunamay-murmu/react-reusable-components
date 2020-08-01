import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Docs from "./docs/Docs";
import * as serviceWorker from "./serviceWorker";
import "../node_modules/highlight.js/styles/dracula.css";

ReactDOM.render(<Docs />, document.getElementById("root"));

serviceWorker.unregister();
