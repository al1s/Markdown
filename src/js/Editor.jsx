import { hot } from 'react-hot-loader';
import React from 'react';

const Editor = props => {
  return (
    <div className="editor__wrapper">
      <textarea
        className="editor"
        onChange={props.onChange}
        id="editor"
        value={props.value}
      />
    </div>
  );
};

export default hot(module)(Editor);
