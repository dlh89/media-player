import React from "react";

export default class LinkInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: "", link: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }
  handleChange(e) {
    this.setState({
      inputText: e.target.value
    });
  }
  handlePlay(e) {
    if (e.target.form.checkValidity()) {
      e.preventDefault();
      this.setState(
        { link: this.state.inputText },
        // callback function to run once state is updated
        () => this.props.callback(this.state.link)
      );
    }
  }
  render() {
    return (
      <div>
        <form>
          <input
            className="link__input"
            type="url"
            value={this.state.inputText}
            onChange={this.handleChange}
            placeholder="Paste an audio link here"
          />
          <button className="link__button" onClick={this.handlePlay}>
            Play
          </button>
        </form>
      </div>
    );
  }
}
