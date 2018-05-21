import { hot } from 'react-hot-loader';
import React from 'react';
import Markdown from 'markdown-to-jsx';

const Output = props => {
  return (
    <div className="app__output">
      <Markdown>
        {props.value}
      </Markdown>
    </div>
  );
};

export default hot(module)(Output);
