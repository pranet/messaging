// @flow
import React from 'react';
import ReactList from 'react-list';
import './message.css';
type Props = {
  messages: Array<string>,
  ...
};

export class MessageLog extends React.Component<Props> {
  list: ReactList;
  messages: Array<string>;
  lineWidth: number;
  lineCount: number;
  charactersPerLine: number;

  constructor(props: Props) {
    super(props);
    this.list = React.createRef();
    this.lineCount = 20;
    this.lineWidth = 15;
    this.charactersPerLine = 38;
  }

  render() {
    const line_count_from_user_messages = this.props.messages
      .map((message) => this._getLineCountForMessage(message))
      .reduce((result, item) => result + item, 0);
    const paddingLines = this.lineCount - line_count_from_user_messages;
    if (paddingLines > 0) {
      const paddingLineSingle = ' '.repeat(this.charactersPerLine - 1);
      const paddingLinesMultiple = Array(paddingLines).fill(paddingLineSingle);
      const paddingMessage = paddingLinesMultiple.join('\n');
      this.messages = [paddingMessage].concat(this.props.messages);
    } else {
      this.messages = this.props.messages;
    }
    return (
      <div
        style={{ overflow: 'auto', height: this.lineWidth * this.lineCount }}
      >
        <ReactList
          itemRenderer={this._renderMessageRow}
          itemSizeGetter={this._getItemSize}
          length={this.messages.length}
          type="variable"
          ref={(c) => (this.list = c)}
        />
      </div>
    );
  }

  componentDidUpdate() {
    this.list.scrollAround(this.messages.length - 1);
  }

  _getItemSize = (idx: number) => {
    return this.lineWidth * this._getLineCountForMessage(this.messages[idx]);
  };

  _getLineCountForMessage = (message: string) => {
    return Math.ceil(message.length / this.charactersPerLine);
  };

  _renderMessageRow = (idx: number, key: string) => {
    return (
      <div className={'message-row-' + (idx % 2 ? 'odd' : 'even')} key={key}>
        {this.messages[idx]}
      </div>
    );
  };
}
