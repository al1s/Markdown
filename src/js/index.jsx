import React from 'react';
import ReactDOM from 'react-dom';
import App from './ClientApp';

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('app'));
};
renderApp();

// if (module.hot) {
//   module.hot.accept('./ClientApp', () => {
//     renderApp();
//   });
// }
