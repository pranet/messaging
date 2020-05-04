// @flow
import React from 'react';
import {MessageLog} from './MessageLog';
import {MessageInput} from './MessageInput'

type Props = {...};

type State = {|
  messages: Array<string>,
|};

export class MessageBox extends React.Component<Props, State> {
  state: State = {
    messages: [],
  };

  render() {
    return (
      <div>
        <MessageLog messages={this.state.messages}/> 
        <MessageInput onSubmit={(message) => this._handleNewMessage(message) }/>
      </div>
    );
  }

  _handleNewMessage(message: string) {
    this.setState((state, props) => ({
      messages: state.messages.concat(message),
    }));
  }

};
