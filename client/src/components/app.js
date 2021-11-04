import { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import ProfilePicture from "./profilePicture";
import PictureModal from "./pictureModal";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: null,
            last_name: null,
            avatar_url: null,
            showModal: false,
        };
    }
    componentDidMount() {
        fetch("/api/users/me")
            .then((response) => response.json())
            .then((user) => {
                this.setState(user);
            });
    }
    showModal() {
        this.setState({
            showModal: true,
        });
    }
    closeModal() {
        this.setState({
            showModal: false,
        });
    }
    onAvatarUpload(avatar_url) {
        this.setState({
            showModal: false,
            avatar_url,
        });
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className="app">
                        <header>
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <div className="container-fluid">
                                    <Link to="/">Home</Link>
                                    <ProfilePicture
                                        first_name={this.state.first_name}
                                        last_name={this.state.last_name}
                                        avatar_url={this.state.avatar_url}
                                        onClick={(e) => this.showModal(e)}
                                    />
                                </div>
                            </nav>
                        </header>
                        {this.state.showModal && (
                            <PictureModal
                                closeModal={(e) => this.closeModal(e)}
                                onAvatarUpload={(e) => this.onAvatarUpload(e)}
                            />
                        )}
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
