import { hot } from 'react-hot-loader';
import React from 'react';
import Editor from './Editor';
import Output from './Output';
import MDExample from './markdownExample.md';

// (UI) add default markdown example into an editor window

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EditorText: MDExample,
      ResultText: MDExample
    };
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({ EditorText: value, ResultText: value });
  }

  render() {
    return (
      <div className="app__container">
        <h1 className="app__header">Markdown formater</h1>
        <div className="app">
          <Editor
            onChange={e => this.handleChange(e)}
            value={this.state.EditorText}
          />
          <Output value={this.state.ResultText} />
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
