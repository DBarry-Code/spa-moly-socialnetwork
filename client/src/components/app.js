import { Component } from "react";
import { BrowserRouter, Link, Route, NavLink } from "react-router-dom";
import ProfilePicture from "./profilePicture";
import PictureModal from "./pictureModal";
import Profile from "./profile";
import Findpeople from "./findpeople";
import Home from "./home";
import UsersProfiles from "./usersProfileModal";
import FriendList from "./friendList";
import Chat from "./chat";
import Logout from "./logout";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: null,
            last_name: null,
            avatar_url: null,
            email: null,
            bio: null,
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
    onBioUpdate(bio) {
        this.setState({ bio });
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <header className="p-1 bg-dark text-white shadow">
                        <div className="container">
                            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                    <li>
                                        <Link
                                            to="/"
                                            className="nav-link px-2 link-light"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/profile"
                                            className="nav-link px-2"
                                        >
                                            My Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/friends"
                                            className="nav-link px-2"
                                        >
                                            My Friends
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/findpeople"
                                            className="nav-link px-2"
                                        >
                                            Find People
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/chat"
                                            className="nav-link px-2"
                                        >
                                            Chat
                                        </NavLink>
                                    </li>
                                    <Logout />
                                </ul>

                                <div className="text-end">
                                    <ProfilePicture
                                        first_name={this.state.first_name}
                                        last_name={this.state.last_name}
                                        avatar_url={this.state.avatar_url}
                                        onClick={(e) => this.showModal(e)}
                                    />
                                </div>
                                <div className="p-2 mt-3">
                                    <p>
                                        {this.state.first_name} {""}
                                        {this.state.last_name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main>
                        {this.state.showModal && (
                            <PictureModal
                                closeModal={(e) => this.closeModal(e)}
                                onAvatarUpload={(e) => this.onAvatarUpload(e)}
                            />
                        )}

                        <Route path="/" exact>
                            <Home
                                first_name={this.state.first_name}
                                last_name={this.state.last_name}
                                avatar_url={this.state.avatar_url}
                                email={this.state.email}
                            />
                        </Route>
                        <Route path="/findpeople" exact>
                            <Findpeople />
                        </Route>
                        <Route path="/user/:id">
                            <UsersProfiles />
                        </Route>
                        <Route path="/friends" exact>
                            <FriendList />
                        </Route>
                        <Route path="/profile" exact>
                            <Profile
                                first_name={this.state.first_name}
                                last_name={this.state.last_name}
                                avatar_url={this.state.avatar_url}
                                email={this.state.email}
                                bio={this.state.bio}
                                onBioUpdate={(e) => this.onBioUpdate(e)}
                                onClick={(e) => this.showModal(e)}
                            />
                        </Route>
                        <Route path="/chat" exact>
                            <Chat />
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

export default App;
