import { Component } from "react";
import { updateBio } from "../api";

export default class BioEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        };
    }

    async onSubmit(event) {
        event.preventDefault();
        //console.log(event.target.bio.value);
        const user = await updateBio(event.target.bio.value);
        this.setState({ isEditing: false });
        this.props.onBioUpdate(user.bio);
    }

    setEditing() {
        this.setState({ isEditing: true });
    }

    render() {
        if (!this.state.isEditing) {
            return (
                <>
                    <button
                        onClick={(e) => this.setEditing(e)}
                        className="btn btn-primary btn-sm follow"
                    >
                        {this.props.bio ? "Edit Bio" : "New Bio"}
                    </button>
                    <div className="d-flex justify-content-between align-items-center mt-4 px-4">
                        <div className="stats">
                            {this.props.bio && <p>{this.props.bio} </p>}
                        </div>
                    </div>
                </>
            );
        }
        return (
            <>
                <form
                    onSubmit={(e) => this.onSubmit(e)}
                    className="register form-signin"
                >
                    <button
                        type="submit"
                        className="btn btn-primary btn-sm follow"
                    >
                        Update Bio
                    </button>
                    <div className="form-floating d-flex justify-content-center align-items-center mt-4 px-4">
                        <textarea
                            className="textarea-edit form-control"
                            rows="3"
                            cols="3"
                            maxLength="120"
                            defaultValue={this.props.bio}
                            name="bio"
                            placeholder="Some importen stuff about you..."
                            required
                        />
                        <label className="ms-5" htmlFor="bio">
                            Some importen stuff about you ...
                        </label>
                    </div>
                </form>
            </>
        );
    }
}
