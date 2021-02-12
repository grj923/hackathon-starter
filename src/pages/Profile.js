import React from "react";
import Menu from "../components/menu/Menu";

import Messages from "../components/messages/Messages";

import { userIsAuthenticated } from "../redux/HOCs";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Dummy Pic",
      profilePic: "../components/Assets/images/profile.png",
    };
  }
  render() {
    console.log(this.props);
    return (
      <div className="Profile">
        <Menu isAuthenticated={this.props.isAuthenticated} />

        <img src={this.state.profilePic} alt={this.state.name} />
        <Messages username={this.props.match.params.username} />
      </div>
    );
  }
}

export default userIsAuthenticated(Profile);
