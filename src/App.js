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
    multiplied: false,
    maxDigits: 16
  }

  componentDidMount = () => {
    this.addKeyCommand(this.state.numberList);
    this.addKeyCommand(this.state.operatorList);
    this.handleKeyPressEvent();
    this.handleKeyUpEvent();
  }

  findDecimalPlace = (arr, num) => {
    if (arr[num].indexOf('.') > 0) {
      return arr[num].length - arr[num].indexOf('.') - 1;
    } else {
      return 0;
    }
  }

  compute = async (arr) => {
    let firstDecPlace = this.findDecimalPlace(arr, 0);
    let secondDecPlace = this.findDecimalPlace(arr, 2);
    let decimalPlace = firstDecPlace > secondDecPlace ? firstDecPlace : secondDecPlace;
    switch (arr[1]) {
      case '+':
        await this.setState({
          currentNum: (+Number.parseFloat(arr[0]).toPrecision() + +Number.parseFloat(arr[2]).toPrecision()).toFixed(decimalPlace)
        });
        break;
      case '-':
        await this.setState({
          currentNum: (Number.parseFloat(arr[0]).toPrecision() - Number.parseFloat(arr[2]).toPrecision()).toFixed(decimalPlace)
        });
        break;
      case 'x':
        await this.setState({
          currentNum: Number.parseFloat(arr[0]).toPrecision() * Number.parseFloat(arr[2]).toPrecision()
        });
        break;
      case '/':
        await this.setState({
          currentNum: Number.parseFloat(arr[0]).toPrecision() / Number.parseFloat(arr[2]).toPrecision()
        });
        break;
      default:
        return undefined;
    }
    await this.setState({
      currentNum: this.state.currentNum.toString()
    });
    //Make sure number does not exceed character limit
    if (this.state.currentNum.length > this.state.maxDigits) {
      //Check if number begins with '0.000'...
      let numStart = this.state.currentNum.slice(0, 5);
      if (numStart === '0.000') {
        await this.setState({
          currentNum: Number.parseFloat(this.state.currentNum).toExponential(10)
        });
      } else {
        let tempArr = [];
        tempArr.push(this.state.currentNum);
        let maxDecimalPlace = this.state.maxDigits - (this.state.currentNum.length - this.findDecimalPlace(tempArr, 0));
        if (maxDecimalPlace >= 0) {
          await this.setState({
            currentNum: Number.parseFloat(this.state.currentNum).toFixed(maxDecimalPlace)
          });
        } else {
          await this.setState({
            currentNum: Number.parseFloat(this.state.currentNum).toExponential(10)
          });
        }
      }
    }
    //Get rid of '.0', '.00', etc
    let regex = /^[1-9]+$/;
    if (this.state.currentNum.indexOf('.') > 0) {
      let afterDecimal = this.state.currentNum.slice(this.state.currentNum.indexOf('.') + 1, this.state.currentNum.length);
      let afterDecArr = afterDecimal.split('');
      let match = false;
      for (let i = 0; i < afterDecArr.length; i++) {
        if (afterDecArr[i].match(regex)) {
          match = true;
          break;
        }
      }
      if (!match) {
        await this.setState({
          currentNum: this.state.currentNum.slice(0, this.state.currentNum.indexOf('.'))
        });
      } else {
        //Get rid of '.10', '.100', etc
        for (let i = afterDecArr.length - 1; i > 0; i--) {
          if (afterDecArr[i] === '0') {
            await this.setState({
              currentNum: this.state.currentNum.slice(0, -1)
            });
          } else {
            break;
          }
        }
      }
    }
    document.getElementById('total').innerHTML = this.state.currentNum;
    await this.setState({
      calculationArr: [this.state.currentNum],
      currentNum: ''
    });
  }

  numberButtonClick = async (currentButton) => {
    if (this.state.equalsSelected) {
      await this.setState({
        currentNum: '',
        calculation: '',
        equalsSelected: false
      });
      //Check if 1st digit typed after operator was followed by 1 or more equals, ie '5 + ='
      if (this.state.operatorSelected) {
        await this.setState({
          calculationArr: []
        });
      }
    }
    //Check if max # of digits has been reached
    if (this.state.currentNum.length < this.state.maxDigits) {
      let doubleDecimal = false;
      if (this.state.currentNum.indexOf('.') >= 0 && currentButton === 'decimal-button') {
        doubleDecimal = true;
      }
      if (!doubleDecimal) {
        //Add '0' to beginning if decimal is the 1st digit, ie '0.5' not '.5'
        if (currentButton === 'decimal-button' && this.state.currentNum === '') {
          await this.setState({
            currentNum: this.state.currentNum + 0
          });
        }
        //Remove '0' from beginning of currentNum, ie '05' => '5'
        else if (currentButton !== 'decimal-button' && this.state.currentNum === '0') {
          await this.setState({
            currentNum: ''
          });
        }
        //Remove '0' from front of 1st number in calculation, ie '05'
        if (this.state.calculation === '0') {
          await this.setState({
            calculation: ''
          });
        }
        //Remove '0' from front of 2nd number in calculation, ie '5 + 05'
        else if (this.state.calculation[this.state.calculation.length - 1] === '0' && this.state.calculation[this.state.calculation.length - 2] === ' ') {
          await this.setState({
            calculation: this.state.calculation.slice(0, -1)
          });
        }
        await this.setState({
          currentNum: this.state.currentNum + this.state.numberList[currentButton]
        });
        document.getElementById('total').innerHTML = this.state.currentNum;
        if (this.state.operatorSelected) {
          await this.setState({
            operatorSelected: false
          });
        }
      }
    }
  }

  handleNumberButtonClick = async (e) => {
    this.numberButtonClick(e.target.id);
  }

  handleOperatorButtonClick = async (e) => {
    let currentButton = e.currentTarget.id;
    //Get rid of '0.', '1.', '2.', etc...
    if (this.state.currentNum[this.state.currentNum.length - 1] === '.') {
      await this.setState({
        currentNum: this.state.currentNum.slice(0, -1)
      });
      document.getElementById('total').innerHTML = this.state.currentNum;
    }
    //Check if operator is followed by 1 or more equals and then another operator ie '5 + = +'
    if (this.state.equalsSelected) {
      await this.setState({
        operatorSelected: false
      });
    }
    //Check if no previous operator has been selected
    if (!this.state.operatorSelected && this.state.calculationArr[0] !== 'Infinity') {
      //Check if equals was not selected
      if (!this.state.equalsSelected && this.state.calculation !== '0') {
        //Add current number to calculation
        await this.setState({
          calculation: this.state.calculation + this.state.currentNum
        });
      }
      else if (this.state.equalsSelected) {
        await this.setState({
          equalsSelected: false
        });
      }
      //Ensure calculationArr contains alternating numbers and operators
      if (this.state.calculationArr.length !== 1) {
        await this.setState({
          calculationArr: [...this.state.calculationArr, this.state.currentNum]
        });
      }
      await this.setState({
        currentNum: ''
      });
      if (this.state.calculationArr.length === 3) {
        await this.compute(this.state.calculationArr);
      }
      //Check if trying to divide by zero
      if (this.state.calculationArr[0] === 'Infinity' || this.state.calculationArr[0] === '-Infinity' || this.state.calculationArr[0] === 'NaN') {
        await this.handleAcButtonClick();
        document.getElementById('total').innerHTML = 'Cannot divide by zero';
        document.getElementById('accumulator').innerHTML = 'Cannot divide by zero';
      }
      else {
        //Add new operator to the calculation
        await this.setState({
          calculation: this.state.calculation + ' '
            + this.state.operatorList[currentButton] + ' ',
          calculationArr: [...this.state.calculationArr, this.state.operatorList[currentButton]],
          operatorSelected: true
        });
        document.getElementById('accumulator').innerHTML = this.state.calculation;
      }
    } else { //Overwrite one operator with another
      if (this.state.calculation !== '') {
        //Remove previous operator
        await this.setState({
          calculation: this.state.calculation.slice(0, -2),
          calculationArr: [...this.state.calculationArr].slice(0, this.state.calculationArr.length - 1)
        });
        //Add new operator
        await this.setState({
          calculation: this.state.calculation + this.state.operatorList[currentButton] + ' ',
          calculationArr: [...this.state.calculationArr, this.state.operatorList[currentButton]]
        });
        document.getElementById('accumulator').innerHTML = this.state.calculation;
      }
    }
  }

  handleEqualsButtonClick = async () => {
    if (this.state.calculation !== '') {
      //Get rid of '0.', '1.', '2.', etc...
      if (this.state.currentNum[this.state.currentNum.length - 1] === '.') {
        this.state.currentNum = this.state.currentNum.slice(0, -1);
      }
      //Check if operator is not selected
      if (!this.state.operatorSelected) {
        if (!this.state.equalsSelected) {
          await this.setState({
            calculationArr: [...this.state.calculationArr, this.state.currentNum],
            calculation: this.state.calculation + this.state.currentNum + ' = '
          });
          await this.compute(this.state.calculationArr);
          //If trying to divide by zero
          if (this.state.calculationArr[0] === 'Infinity' || this.state.calculationArr[0] === '-Infinity' || this.state.calculationArr[0] === 'NaN') {
            await this.handleAcButtonClick();
            document.getElementById('total').innerHTML = 'Cannot divide by zero';
            document.getElementById('accumulator').innerHTML = 'Cannot divide by zero';
          } else {
            await this.setState({
              //Carry forward result for chained calculations
              currentNum: this.state.calculationArr[0]
            });
            await this.setState({
              //Update calculation string with the result
              calculation: this.state.calculation + this.state.currentNum
            });
            document.getElementById('accumulator').innerHTML = this.state.calculation;
            await this.setState({
              equalsSelected: true,
              calculation: this.state.calculationArr[0],
              calculationArr: []
            });
          }
        }
      } else {//Operator is followed by equals, ie '5 + ='
        //Do only on 1st equals click
        if (!this.state.equalsSelected) {
          await this.setState({
            constantNum: this.state.calculationArr[0],
            operator: this.state.calculationArr[1],
            equalsSelected: true
          });
        }
        if (this.state.equalsSelected) {
          await this.setState({
            currentNum: this.state.calculationArr[0],
          });
          await this.setState({
            calculationArr: [this.state.currentNum, this.state.operator, this.state.constantNum]
          });
          await this.compute(this.state.calculationArr);
          let index = this.state.calculation.indexOf(' ') !== -1 ? this.state.calculation.indexOf(' ') : this.state.calculation.length;
          document.getElementById('accumulator').innerHTML = this.state.calculation.substring(0, index) + ' ' + this.state.operator + ' ' + this.state.constantNum + ' = ' + this.state.calculationArr[0];
          await this.setState({
            calculation: this.state.calculationArr[0]
          });
        }
      }
    }
  }

  handleAcButtonClick = async () => {
    await this.setState({
      currentNum: '0',
      calculation: '',
      calculationArr: [],
      operatorSelected: true,
      equalsSelected: false
    });
    document.getElementById('total').innerHTML = '0';
    document.getElementById('accumulator').innerHTML = '0';
  }

  handleCeButtonClick = async () => {
    if (this.state.equalsSelected) {
      this.handleAcButtonClick();
    } else {
      await this.setState({
        currentNum: '',
        operatorSelected: true
      });
      document.getElementById('total').innerHTML = '0';
    }
  }

  handleBackButtonClick = async () => {
    if (!this.state.equalsSelected && !this.state.operatorSelected) {
      await this.setState({
        currentNum: this.state.currentNum.substring(0, this.state.currentNum.length - 1)
      });
      if (this.state.currentNum === '') {
        await this.setState({
          currentNum: '0'
        });
        document.getElementById('total').innerHTML = '0';
      } else {
        document.getElementById('total').innerHTML = this.state.currentNum;
      }
    }
  }

  handleNegativeButtonClick = async () => {
    if (this.state.currentNum !== '' && this.state.currentNum !== '0') {
      if (this.state.currentNum.indexOf('-') === -1) {
        await this.setState({
          currentNum: '-' + this.state.currentNum
        });
        if (this.state.equalsSelected) {
          await this.setState({
            calculation: '-' + this.state.calculation
          });
        }
      } else {
        await this.setState({
          currentNum: this.state.currentNum.substring(1)
        });
        if (this.state.equalsSelected) {
          await this.setState({
            calculation: this.state.calculation.substring(1)
          });
        }
      }
      if (this.state.calculationArr.length === 1) {
        await this.setState({
          calculationArr: [this.state.currentNum],
          calculation: this.state.currentNum
        });
      }
      document.getElementById('total').innerHTML = this.state.currentNum;
    }
  }

  addKeyCommand = (list) => {
    let allowedKeys = this.state.allowedKeys;
    Object.keys(list).forEach(function(key) {
      document.addEventListener('keyup', function(e) {
        if (allowedKeys[e.keyCode] === key) {
          document.getElementById(key).click();
        }
      })
    })
  }

  handleKeyPressEvent = () => {
    document.onkeypress = async (e) => {
      if (e.keyCode === 43) {
        document.getElementById('add-button').click();
      }
      if (e.keyCode === 61 || e.keyCode === 13) {
        e.preventDefault();
        document.getElementById('equals-button').click();
      }
      if (e.keyCode === 42) {
        document.getElementById('multiply-button').click();
        await this.setState({
          multiplied: true
        });
      }
    }
  }

  handleKeyUpEvent = () => {
    document.addEventListener('keyup', function(e) {
      //'back' key
      if (e.keyCode === 8) {
        document.getElementById('back-button').click();
      }
      //'delete' key
      if (e.keyCode === 46) {
        document.getElementById('ac-button').click();
      }
    })
  }

  //Prevent '8' from being clicked when 'multiply' is clicked
  handleEightButtonClick = async () => {
    if (this.state.multiplied) {
      await this.setState({
        currentNum: ''
      });
      if (this.state.calculationArr.length === 0) {
        document.getElementById('total').innerHTML = '0';
      } else {
        document.getElementById('total').innerHTML = this.state.calculationArr[0];
      }
      await this.setState({
        multiplied: false,
        operatorSelected: true
      });
    } else {
      this.numberButtonClick('eight-button');
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div id='calculator-container' className='col-12'>
            <Title />
            <Display />
            <Buttons
              handleNumberButtonClick={this.handleNumberButtonClick}
              handleOperatorButtonClick={this.handleOperatorButtonClick}
              handleEqualsButtonClick={this.handleEqualsButtonClick}
              handleAcButtonClick={this.handleAcButtonClick}
              handleCeButtonClick={this.handleCeButtonClick}
              handleBackButtonClick={this.handleBackButtonClick}
              handleNegativeButtonClick={this.handleNegativeButtonClick}
              handleEightButtonClick={this.handleEightButtonClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;