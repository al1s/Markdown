import { hot } from 'react-hot-loader';
import React from 'react';
import Editor from './Editor';
import Output from './Output';

// (UI) add default markdown example into an editor window

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { EditorText: 'Here will be formatted text' };
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({ EditorText: value });
  }

  render() {
    return (
      <div>
        <h1>Online markdown editor</h1>
        <div className="main">
          <Editor onChange={e => this.handleChange(e)} />
          <Output EditorText={this.state.EditorText} />
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
