/* eslint-disable indent */
import ReactDOM from "react-dom";
import Welcome from "./components/welcome";

ReactDOM.render(<HelloWorld />, document.querySelector("main"));

fetch("api/users/me").then((response) => {
    response.status >= 400
        ? ReactDOM.render(<Welcome />, document.querySelector("main"))
        : ReactDOM.render(
              <img src="/favicon.ico" />,
              document.querySelector("main")
          );
});

function HelloWorld() {
    return <div>Hello, World!</div>;
}
