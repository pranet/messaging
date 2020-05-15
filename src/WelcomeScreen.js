// @flow
import React from 'react';
import { MessageInput } from './MessageInput';

type Props = {
  setUsername: (string) => any,
  ...
};

export class WelcomeScreen extends React.Component<Props> {
  render() {
    return (
      <MessageInput
        onSubmit={(key) => {
          this.props.setUsername(key);
        }}
      />
    );
  }
}
