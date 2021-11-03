import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import Reset from "./passwordReset";

class Welcome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="welcome">
                <BrowserRouter>
                    <div>
                        <Route path="/" exact>
                            <Register />
                        </Route>
                        <Route path="/login" exact>
                            <Login />
                        </Route>
                        <Route path="/reset" exact>
                            <Reset />
                        </Route>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default Welcome;
