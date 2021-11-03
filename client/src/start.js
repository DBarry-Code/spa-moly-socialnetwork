/* eslint-disable indent */
import ReactDOM from "react-dom";
import Welcome from "./components/welcome";

fetch("api/users/me").then((response) => {
    response.status >= 400
        ? ReactDOM.render(<Welcome />, document.querySelector("main"))
        : ReactDOM.render(
              <img src="/favicon.ico" />,
              document.querySelector("main")
          );
});
