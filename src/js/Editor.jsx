import { hot } from 'react-hot-loader';
import React from 'react';
import { ReactDOM } from 'react-dom';

const Editor = props => {
  return (
    <div className="wrapper">
      <textarea className="editor" onChange={props.onChange} id="editor" />
    </div>
  );
};

export default hot(module)(Editor);
