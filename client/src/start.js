import ReactDOM from "react-dom";

fetch("/api/users/me").then((res) => {
    if (res.status <= 400) {
        ReactDOM.render(<HelloWorld />, document.querySelector("main"));
        return;
    }
});

function HelloWorld() {
    return <div>Hello, World!</div>;
}
