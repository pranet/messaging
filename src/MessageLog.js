// @flow
import React from 'react';
import ReactList from 'react-list';
import './message.css';
import type { Message } from './MessageBox';

const DEFAULT_SENDER: string = '';

type Props = {
  messages: Array<Message>,
  ...
};

export class MessageLog extends React.Component<Props> {
  list: ReactList;
  messages: Array<Message>;
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
      const paddingMessageContent = paddingLinesMultiple.join('\n');
      const paddingMessage = { sender: '', content: paddingMessageContent };
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

  _getLineCountForMessage = (message: Message) => {
    return Math.ceil(
      this._getMessageOutput(message).length / this.charactersPerLine
    );
  };

  _renderMessageRow = (idx: number, key: string) => {
    return (
      <div className={'message-row-' + (idx % 2 ? 'odd' : 'even')} key={key}>
        {this._getMessageOutput(this.messages[idx])}
      </div>
    );
  };

  _getMessageOutput = (message: Message) => {
    if (message.sender === DEFAULT_SENDER) {
      return message.content;
    }
    return `${message.sender}: ${message.content}`;
  };
}
