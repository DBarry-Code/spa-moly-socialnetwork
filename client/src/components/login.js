import { Component } from "react";
import { Link } from "react-router-dom";

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            error: null,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    onSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }
    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    render() {
        return (
            <div className="register d-flex align-items-center justify-content-center">
                <div className="form-signin text-center ">
                    {this.state.error && (
                        <p className="error">{this.state.error}</p>
                    )}
                    <form onSubmit={this.onSubmit}>
                        <h1 className="h3  mb-3 fw-normal">Please Login</h1>
                        <Link className="h6 fst-italic fw-normal" to="/">
                            Click here to Register!
                        </Link>
                        <div className="form-floating">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="name@example.com"
                                autoComplete="new-email"
                                onInput={this.onInputChange}
                                required
                            />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                autoComplete="new-password"
                                onInput={this.onInputChange}
                                required
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button
                            className="w-100 btn btn-lg btn-primary"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default login;
