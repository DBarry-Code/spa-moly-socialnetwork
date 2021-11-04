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
            <>
                <BrowserRouter>
                    <header className="p-2 bg-dark text-white shadow">
                        <div className="container">
                            <div className=" d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                                <h2>
                                    Barry`s <em> Socical Network</em>
                                </h2>
                            </div>
                        </div>
                    </header>
                    <main className="d-flex align-items-center justify-content-center">
                        <Route path="/" exact>
                            <Register />
                        </Route>
                        <Route path="/login" exact>
                            <Login />
                        </Route>
                        <Route path="/reset" exact>
                            <Reset />
                        </Route>
                    </main>
                    <footer className="d-flex flex-wrap justify-content-between align-items-center py-1 my-1 ">
                        <div className="container">
                            <div className="col-md-3 d-flex align-items-center">
                                <span className="text-dark">
                                    &copy; 2021 Barry`s Socical Network
                                </span>
                            </div>
                        </div>
                    </footer>
                </BrowserRouter>
            </>
        );
    }
}

export default Welcome;
