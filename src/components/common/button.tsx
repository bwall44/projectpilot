
import React from 'react';


class Button extends React.Component {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('clicked');
  }

  render() {
    return <button onClick={this.handleClick}>Click Me!</button>;
  }
}

export default Button;