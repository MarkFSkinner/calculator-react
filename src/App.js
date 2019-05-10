import React from 'react';
import './App.scss';
import Title from './components/Title';
import Display from './components/Display';
import Buttons from './components/Buttons';

class App extends React.Component {
  state = {
    calculation: '',
    calculationArr: [],
    currentNum: '',
    numberList: {
      'zero-button': 0,
      'one-button': 1,
      'two-button': 2,
      'three-button': 3,
      'four-button': 4,
      'five-button': 5,
      'six-button': 6,
      'seven-button': 7,
      'eight-button': 8,
      'nine-button': 9,
      'decimal-button': '.'
    },
    operatorList: {
      'divide-button': '/',
      'multiply-button': 'x',
      'minus-button': '-',
      'add-button': '+'
    },
    operatorSelected: true,
    equalsSelected: false,
    constantNum: undefined,
    operator: undefined,
    allowedKeys: {
      42: 'multiply-button',
      48: 'zero-button',
      49: 'one-button',
      50: 'two-button',
      51: 'three-button',
      52: 'four-button',
      53: 'five-button',
      54: 'six-button',
      55: 'seven-button',
      56:'eight-button',
      57: 'nine-button',
      61: 'equals-button',
      107: 'add-button',
      189: 'minus-button',
      190: 'decimal-button',
      191: 'divide-button'
    },
    multiplied: false
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div id='calculator-container' className='col-12'>
            <Title />
            <Display />
            <Buttons />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
