// @flow
import React from 'react';
import ReactList from 'react-list';
import './message.css';
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
          itemRenderer={this._renderMessageRow}
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

  _renderMessageRow = (idx: number, key: string) => {
    return (
      <div 
        className={'message-row-' + (idx % 2 ? 'odd' : 'even')} 
        key={key}
      >
        {this.props.messages[idx]}
      </div>
    );
  }
};

