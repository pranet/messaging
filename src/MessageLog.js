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
      <div style={{overflow: 'auto', maxHeight: 300}}>
        <ReactList
          itemRenderer={this._renderMessageRow}
          itemSizeGetter={this._getItemSize}
          length={this.props.messages.length}
          type='variable'
          ref={c => this.list = c}
        />
      </div>
    );
  }

  componentDidUpdate() {
    this.list.scrollAround(this.props.messages.length- 1);
  }

  _getItemSize = (idx: number) => {
    const len = this.props.messages[idx].length;
    const ch_per_500_px = 82;
    const lines = Math.ceil(len / ch_per_500_px);
    return 18 * (lines);
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

