import { hot } from 'react-hot-loader';
import React from 'react';
// import { ReactDOM } from 'react-dom';

const Output = props => {
  return (
    <div className="output">
      <div
        dangerouslySetInnerHTML={{
          __html: props.EditorText
        }}
      />
    </div>
  );
};

export default hot(module)(Output);
