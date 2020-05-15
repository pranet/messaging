// @flow
import React from 'react';
import { MessageBox } from './MessageBox';
import { WelcomeScreen } from './WelcomeScreen';

type Props = { ... };

type State = {|
  username: ?string,
|};

export class MainView extends React.Component<Props, State> {
  state: State = {
    username: null,
  };

  render() {
    if (this.state.username == null) {
      return (
        <WelcomeScreen
          setUsername={(key) => this.setState({ username: key })}
        />
      );
    }
    return <MessageBox username={this.state.username} />;
  }
}
