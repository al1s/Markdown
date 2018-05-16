import { hot } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { setConfig } from 'react-hot-loader';
import Editor from './Editor';
import Output from './Output';
import marked from 'marked';

setConfig({ logLevel: 'debug' });

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
          <Output EditorText={marked(this.state.EditorText)} />
        </div>
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('app'));

export default hot(module)(App);

// if (module.hot) {
//   module.hot.accept('./ClientApp', () => {
//     renderApp();
//   });
// }
