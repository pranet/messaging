// @flow
import React from 'react';
import ReactList from 'react-list';

type Props = {
  messages: Array<string>,
  ...,
};

export class MessageLog extends React.Component<Props> {
  
  list: ReactList;

  constructor(props: Props) {
    super(props);
    this.list = React.createRef();
  }

  render() {
    return (
      <div style={{overflow: 'auto', maxHeight: 400}}>
        <ReactList
          itemRenderer={(idx, key) => <div key={key}>{this.props.messages[idx]}</div>}
          length={this.props.messages.length}
          type='uniform'
          ref={c => this.list = c}
        />
      </div>
    );
  }

  componentDidUpdate() {
    this.list.scrollAround(this.props.messages.length - 1);     
  }
};

