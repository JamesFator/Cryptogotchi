import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  
  class Game extends React.Component {
    render() {
      return React.createElement('h1', null, 'Greetings, ' + this.props.name + '!');
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  