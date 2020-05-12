// @flow
import React from 'react';
import { MessageLog } from './MessageLog';
import { MessageInput } from './MessageInput';
import socketIOClient from 'socket.io-client';
import Socket from 'socket.io-client/lib/socket';
const ENDPOINT = 'http://localhost:4000';

export type Message = {|
  sender: string,
  content: string,
|};

type Props = {
  username: string,
  ...
};

type State = {|
  messages: Array<Message>,
|};

export class MessageBox extends React.Component<Props, State> {
  state: State = {
    messages: [],
  };

  socket: Socket = socketIOClient(ENDPOINT);

  constructor(props: Props) {
    super(props);
    this.socket.on('receive_message', (message) => {
      this.setState((state, props) => ({
        messages: state.messages.concat(message),
      }));
    });
  }

  render() {
    return (
      <div className="message-box">
        <MessageLog messages={this.state.messages} />
        <MessageInput onSubmit={(content) => this._handleNewMessage(content)} />
      </div>
    );
  }

  _handleNewMessage(content: string) {
    // send to server
    this.socket.emit('send_message', content);
  }
}
