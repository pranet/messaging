// @flow
import React from 'react';

type Props = {
  onSubmit: (string) => any,
  ...,
};

type State = {|
  currentText: string,  
|};

export class MessageInput extends React.Component<Props, State> {
  
  state: State = {
    currentText: '',
  };

  render() {
    return (
      <input
        className='message-input'  
        style={{width: "inherit"}}
        type='text'
        value={this.state.currentText}
        onKeyDown={event => this._handleKeyDown(event)}
        onChange={event => this.setState({currentText: event.target.value})}
      />
    );
  }

  _handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Enter') {
      return;
    }
    const str = this.state.currentText;
    // ignore null / empty / all whitespaces
    if (str === null || str.match(/^ *$/) !== null) {
      return;     
    }
  
    this.props.onSubmit(this.state.currentText);
    this.setState({currentText: ''})
    
  }

};
