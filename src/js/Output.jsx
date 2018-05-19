import { hot } from 'react-hot-loader';
import React from 'react';
import Markdown from 'markdown-to-jsx';
// import { ReactDOM } from 'react-dom';

/* <div
        dangerouslySetInnerHTML={{
          __html: props.EditorText
        }}
      />
    </div> */
const Output = props => {
  return (
    <div className="output">
      <Markdown>
        {props.EditorText}
      </Markdown>
    </div>
  );
};

export default hot(module)(Output);
