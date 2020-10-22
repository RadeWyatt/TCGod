import React from "react";
import Input from "@material-ui/core/Input";

class StreamSelect extends React.Component {
  constructor(props) {
    super();
    this.state = {
      channel: "",
    };
  }

  handleChange = (e) => {
    this.setState({ channel: e.target.value });
  }

  keyPress = (e) => {
    if (e.keyCode === 13) {
      const { changeChannel } = this.props;
      const { channel } = this.state;
      changeChannel(channel);
    }
  }

  render() {
    return (
      <Input
        style={{
            position: "absolute",
            backgroundColor: "black"
        }}
        defaultValue={this.state.channel}
        onChange={this.handleChange}
        onKeyDown={this.keyPress}
        color="secondary"
        inputProps={{ style: { color: "white", margin: "0 10px 0 10px"}}}
        spellCheck={false}
        fullWidth
      />
    );
  }
}

export default StreamSelect;
