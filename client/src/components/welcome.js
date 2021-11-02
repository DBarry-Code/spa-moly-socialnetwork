import { Component } from "react";
import Register from "./register";

class Welcome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="welcome">
                <Register />
            </div>
        );
    }
}

export default Welcome;
