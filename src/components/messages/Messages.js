import React from "react";
import "./Messages.css";
import { withAsyncAction } from "../../redux/HOCs";

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: "",
      count: 0,
      image: "",
    };
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages = () => {
    this.props.getMessage(this.props.username).then((res) => {
      console.log(res.payload);
      this.setState({
        messages: res.payload.messages,
        count: res.payload.count,
      });
    });
  };

  newMessageHandler = () => {
    let text = this.state.message;
    this.props.createMessage(text).then(() => {
      this.fetchMessages();
      this.setState({
        message: "",
      });
    });
  };

  deleteMessageHandler = (id) => {
    this.props.deleteMessage(id).then(() => {
      this.fetchMessages();
    });
  };

  addLikeHandler = (likes) => {
    this.props.addLike(likes).then(() => {
      this.fetchMessages();
    });
  };

  handleChange = (event) => {
    let data = { ...this.state };

    data[event.target.name] = event.target.value;

    this.setState(data);
  };

  render() {
    let display = <div>No Messages Found</div>;
    if (this.state.messages) {
      display = this.state.messages.map((value) => {
        console.log(value.likes);
        return (
          <li key={value.id}>
            {value.text}
            <button onClick={() => this.deleteMessageHandler(value.id)}>
              Delete Messages
            </button>
            <button onClick={() => this.addLikeHandler(value.likes)}>
              Like Message
            </button>
          </li>
        );
      });
    }

    return (
      <div className="Main">
        <div className="username">{this.props.username}</div>
        <div className="Messages">
          <div className="NewMessage">
            <input
              name="message"
              onChange={this.handleChange}
              value={this.state.message}
            />
            <button onClick={this.newMessageHandler}> Send Message </button>
          </div>
          <div className="ListMessage">{display}</div>
        </div>
      </div>
    );
  }
}

export default withAsyncAction("profile", "all")(Messages);
