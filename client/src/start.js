/* eslint-disable indent */
import ReactDOM from "react-dom";
import Welcome from "./components/welcome";
import App from "./components/app";

fetch("api/users/me").then((response) => {
    response.status >= 400
        ? ReactDOM.render(<Welcome />, document.getElementById("root"))
        : ReactDOM.render(<App />, document.getElementById("root"));
});
