import { Component } from "react";
import { Link } from "react-router-dom";

class passwordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
    }
    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    onSubmitEmail(event) {
        event.preventDefault();
        console.log(this.state);
        this.setState({
            step: 2,
        });
    }
    onSubmitCodeandPassword(event) {
        event.preventDefault();
        console.log(this.state);
        this.setState({
            step: 3,
        });
    }
    render() {
        return (
            <div>
                {this.state.step == 1 && (
                    <div className="reset d-flex align-items-center justify-content-center">
                        <div className="form-signin text-center ">
                            <form onSubmit={(e) => this.onSubmitEmail(e)}>
                                <h1 className="h3 mb-3 fw-normal">
                                    Reset Password
                                </h1>
                                <p>Code to reset Password</p>
                                <span>
                                    {this.state.error && (
                                        <p className="text-danger mt-1">
                                            {this.state.error}
                                        </p>
                                    )}
                                </span>
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="name@example.com"
                                        autoComplete="new-email"
                                        onInput={(e) => this.onInputChange(e)}
                                        required
                                    />
                                    <label htmlFor="email">Email address</label>
                                </div>
                                <button
                                    className="w-100 btn btn-lg btn-primary mt-1"
                                    type="submit"
                                >
                                    Send Code
                                </button>
                            </form>
                            <div className="m-2">
                                <Link
                                    className="h6 fst-italic fw-normal"
                                    to="/"
                                >
                                    Back
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                {this.state.step == 2 && (
                    <div className="reset d-flex align-items-center justify-content-center">
                        <div className="form-signin text-center ">
                            <form
                                onSubmit={(e) =>
                                    this.onSubmitCodeandPassword(e)
                                }
                            >
                                <h1 className="h3 mb-3 fw-normal">
                                    Confirm Code
                                </h1>
                                <div className="mt-1 fst-italic">
                                    <p>Enter the code you received</p>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        name="code"
                                        className="form-control"
                                        placeholder="Code"
                                        onInput={(e) => this.onInputChange(e)}
                                        autoComplete="off"
                                        required
                                    />
                                    <label htmlFor="first_name">Code</label>
                                </div>

                                <span>
                                    {this.state.error && (
                                        <p className="text-danger mt-1">
                                            {this.state.error}
                                        </p>
                                    )}
                                </span>
                                <div className="mt-2 fst-italic">
                                    <p>Enter a new password</p>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        autoComplete="new-password"
                                        onInput={(e) => this.onInputChange(e)}
                                        required
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <button
                                    className="w-100 btn btn-lg btn-primary mt-1"
                                    type="submit"
                                >
                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {this.state.step == 3 && (
                    <div className="reset d-flex align-items-center justify-content-center">
                        <div className="form-signin text-center ">
                            <h1 className="h3 mb-3 fw-normal">
                                Reset Password
                            </h1>

                            <p>Success!</p>
                            <p>
                                You can now <Link to="/login"> log in</Link>
                                with you nnew password
                            </p>

                            <span>
                                {this.state.error && (
                                    <p className="text-danger mt-1">
                                        {this.state.error}
                                    </p>
                                )}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default passwordReset;
