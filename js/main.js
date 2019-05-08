const state = {
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
};

function findDecimalPlace(arr, num) {
    if (arr[num].indexOf('.') > 0) {
        return arr[num].length - arr[num].indexOf('.') - 1;
    } else {
        return 0;
    }
}

function compute(arr) {
    let firstDecPlace = findDecimalPlace(arr, 0);
    let secondDecPlace = findDecimalPlace(arr, 2);
    let decimalPlace = firstDecPlace > secondDecPlace ? firstDecPlace : secondDecPlace;
    switch (arr[1]) {
        case '+':
            state.currentNum = +Number.parseFloat(arr[0]).toPrecision() + +Number.parseFloat(arr[2]).toPrecision();
            state.currentNum = state.currentNum.toFixed(decimalPlace);
            break;
        case '-':
            state.currentNum = Number.parseFloat(arr[0]).toPrecision() - Number.parseFloat(arr[2]).toPrecision();
            state.currentNum = state.currentNum.toFixed(decimalPlace);
            break;
        case 'x':
            state.currentNum = Number.parseFloat(arr[0]).toPrecision() * Number.parseFloat(arr[2]).toPrecision();
            break;
        case '/':
            state.currentNum = Number.parseFloat(arr[0]).toPrecision() / Number.parseFloat(arr[2]).toPrecision();
            break;
        default:
            return undefined;
    }
    state.currentNum = state.currentNum.toString();
    //Make sure number does not exceed character limit
    if (state.currentNum.length > 16) {
        //If number begins with '0.'...
        if (state.currentNum.indexOf('.') <= 1) {
            state.currentNum = Number.parseFloat(state.currentNum).toExponential(10);
        } else {
            let tempArr = [];
            tempArr.push(state.currentNum);
            let maxDecimalPlace = 16 - (state.currentNum.length - findDecimalPlace(tempArr, 0));
            state.currentNum = Number.parseFloat(state.currentNum).toFixed(maxDecimalPlace);
        }
    }
    //Get rid of '.0', '.00', etc
    let regex = /^[1-9]+$/;
    if (state.currentNum.indexOf('.') > 0) {
        let afterDecimal = state.currentNum.slice(state.currentNum.indexOf('.') + 1, state.currentNum.length);
        let afterDecArr = afterDecimal.split('');
        let match = false;
        for (let i = 0; i < afterDecArr.length; i++) {
            if (afterDecArr[i].match(regex)) {
                match = true;
                break;
            }
        }
        if (!match) {
            state.currentNum = state.currentNum.slice(0, state.currentNum.indexOf('.'));
        } else {
            //Get rid of '.10', '.100', etc
            for (let i = afterDecArr.length - 1; i > 0; i--) {
                if (afterDecArr[i] === '0') {
                    state.currentNum = state.currentNum.slice(0, -1);
                } else {
                    break;
                }
            }
        }
    }
    $('#total').html(state.currentNum);
    state.calculationArr.length = 0;
    state.calculationArr.push(state.currentNum);
    state.currentNum = '';
}

function handleNumberButtonClick() {
    Object.keys(state.numberList).forEach(function(key) {
        $('#' + key).on('click', function() {
            //Check if 1st digit typed after equals was pressed
            if (state.equalsSelected) {
                state.currentNum = '';
                state.calculation = '';
                state.equalsSelected = false;
                //Check if 1st digit typed after operator was followed by 1 or more equals, ie '5 + ='
                if (state.operatorSelected) {
                    state.calculationArr.length = 0;
                }
            }
            //Check if max # of digits has been reached
            if (state.currentNum.length < 16) {
                let doubleDecimal = false;
                if (state.currentNum.indexOf('.') >= 0 && key === 'decimal-button') {
                    doubleDecimal = true;
                }
                if (!doubleDecimal) {
                    //Add '0' to beginning if decimal is the 1st digit, ie '0.5' not '.5'
                    if (key === 'decimal-button' && state.currentNum === '') {
                        state.currentNum += 0;
                    }
                    //Remove '0' from beginning of currentNum, ie '05' => '5'
                    else if (key !== 'decimal-button' && state.currentNum === '0') {
                        state.currentNum = '';
                    }
                    //Remove '0' from front of 1st number in calculation, ie '05'
                    if (state.calculation === '0') {
                        state.calculation = '';
                    }
                    //Remove '0' from front of 2nd number in calculation, ie '5 + 05'
                    else if (state.calculation[state.calculation.length - 1] === '0' && state.calculation[state.calculation.length - 2] === ' ') {
                        state.calculation = state.calculation.slice(0, -1);
                    }
                    state.currentNum += state.numberList[key];
                    $('#total').html(state.currentNum);
                    if (state.operatorSelected) {
                        state.operatorSelected = false;
                    }
                }
            }
        });
    });
}

function handleOperatorButtonClick() {
    Object.keys(state.operatorList).forEach(function(key) {
        $('#' + key).on('click', function() {
            //Get rid of '0.', '1.', '2.', etc...
            if (state.currentNum[state.currentNum.length - 1] === '.') {
                state.currentNum = state.currentNum.slice(0, -1);
                $('#total').html(state.currentNum);
            }
            //Check if operator is followed by 1 or more equals and then another operator ie '5 + = +'
            if (state.equalsSelected) {
                state.operatorSelected = false;
            }
            //Check if no previous operator has been selected
            if (!state.operatorSelected && state.calculationArr[0] !== 'Infinity') {
                //Check if equals was not selected
                if (!state.equalsSelected && state.calculation !== '0') {
                    //Add current number to calculation
                    state.calculation += state.currentNum;
                }
                else if (state.equalsSelected) {
                    state.equalsSelected = false;
                }
                //Ensure calculationArr contains alternating numbers and operators
                if (state.calculationArr.length !== 1) {
                    state.calculationArr.push(state.currentNum);
                }
                state.currentNum = '';
                if (state.calculationArr.length === 3) {
                    compute(state.calculationArr);
                }
                //Check if trying to divide by zero
                if (state.calculationArr[0] === 'Infinity' || state.calculationArr[0] === '-Infinity' || state.calculationArr[0] === 'NaN') {
                    $('#ac-button').click();
                    $('#total').html('Cannot divide by zero');
                    $('#accumulator').html('Cannot divide by zero');
                }
                else {
                    //Add new operator to the calculation
                    state.calculation += ' ';
                    state.calculation += state.operatorList[key];
                    state.calculation += ' ';
                    state.calculationArr.push(state.operatorList[key]);
                    $('#accumulator').html(state.calculation);
                    state.operatorSelected = true;
                }
            } else { //Overwrite one operator with another
                if (state.calculation !== '') {
                    //Remove previous operator
                    state.calculation = state.calculation.slice(0, -1);
                    state.calculation = state.calculation.slice(0, -1);
                    state.calculationArr.pop();
                    //Add new operator
                    state.calculation += state.operatorList[key];
                    state.calculation += ' ';
                    state.calculationArr.push(state.operatorList[key]);
                    $('#accumulator').html(state.calculation);
                }
            }
        });
    });
}

function handleEqualsButtonClick() {
    $('#equals-button').on('click', function() {
        if (state.calculation !== '') {
            //Get rid of '0.', '1.', '2.', etc...
            if (state.currentNum[state.currentNum.length - 1] === '.') {
                state.currentNum = state.currentNum.slice(0, -1);
            }
            //Check if operator is not selected
            if (!state.operatorSelected) {
                if (!state.equalsSelected) {
                    state.calculationArr.push(state.currentNum);
                    state.calculation = state.calculation + state.currentNum + ' = ';
                    compute(state.calculationArr);
                    //If trying to divide by zero
                    if (state.calculationArr[0] === 'Infinity' || state.calculationArr[0] === '-Infinity' || state.calculationArr[0] === 'NaN') {
                        $('#ac-button').click();
                        $('#total').html('Cannot divide by zero');
                        $('#accumulator').html('Cannot divide by zero');
                    } else {
                        //Carry forward result for chained calculations
                        state.currentNum = state.calculationArr[0];
                        //Update calculation string with the result
                        state.calculation = state.calculation + state.currentNum;
                        $('#accumulator').html(state.calculation);
                        state.equalsSelected = true;
                        state.calculation = state.calculationArr[0];
                        state.calculationArr.length = 0;
                    }
                }
            } else {//Operator is followed by equals, ie '5 + ='
                //Do only on 1st equals click
                if (!state.equalsSelected) {
                    state.constantNum = state.calculationArr[0];
                    state.operator = state.calculationArr[1];
                    state.equalsSelected = true;
                }
                if (state.equalsSelected) {
                    state.currentNum = state.calculationArr[0];
                    state.calculationArr.length = 0;
                    state.calculationArr.push(state.currentNum);
                    state.calculationArr.push(state.operator);
                    state.calculationArr.push(state.constantNum);
                    compute(state.calculationArr);
                    let index = state.calculation.indexOf(' ') !== -1 ? state.calculation.indexOf(' ') : state.calculation.length;
                    $('#accumulator').html(state.calculation.substring(0, index) + ' ' + state.operator + ' ' + state.constantNum + ' = ' + state.calculationArr[0]);
                    state.calculation = state.calculationArr[0];
                }
            }
        }
    });
}

function handleAcButtonClick() {
    $('#ac-button').on('click', function() {
        state.currentNum = '0';
        $('#total').html('0');
        state.calculation = '';
        $('#accumulator').html('0');
        state.calculationArr.length = 0;
        state.operatorSelected = true;
        state.equalsSelected = false;
    });
}

function handleCeButtonClick() {
    $('#ce-button').on('click', function() {
        if (state.equalsSelected) {
            $('#ac-button').click();
        } else {
            state.currentNum = '';
            $('#total').html('0');
            state.operatorSelected = true;
        }
    });
}

function handleBackButtonClick() {
    $('#back-button').on('click', function() {
        if (!state.equalsSelected && !state.operatorSelected) {
            state.currentNum = state.currentNum.substring(0, state.currentNum.length - 1);
            if (state.currentNum === '') {
                state.currentNum = '0';
                $('#total').html('0');
            } else {
                $('#total').html(state.currentNum);
            }
        }
    });
}

function handleNegativeButtonClick() {
    $('#negative-button').on('click', function() {
        if (state.currentNum !== '' && state.currentNum !== '0') {
            if (state.currentNum.indexOf('-') === -1) {
                state.currentNum = '-' + state.currentNum;
                if (state.equalsSelected) {
                    state.calculation = '-' + state.calculation;
                }
            } else {
                state.currentNum = state.currentNum.substring(1);
                if (state.equalsSelected) {
                    state.calculation = state.calculation.substring(1);
                }
            }
            if (state.calculationArr.length === 1) {
                state.calculationArr[0] = state.currentNum;
                state.calculation = state.currentNum;
            }
            $('#total').html(state.currentNum);
        }
    });
}

function addKeyCommand(list) {
    Object.keys(list).forEach(function(key) {
        document.addEventListener('keyup', function(e) {
            if (state.allowedKeys[e.keyCode] === key) {
                $('#' + key).click();
            }
        })
    })
}

function handleKeyPressEvent() {
    document.onkeypress = function(e) {
        if (e.keyCode === 43) {
            $('#add-button').click();
        }
        if (e.keyCode === 61 || e.keyCode === 13) {
            e.preventDefault();
            $('#equals-button').click();
        }
        if (e.keyCode === 42) {
            $('#multiply-button').click();
            state.multiplied = true;
        }
    }
}

function handleKeyUpEvent() {
    document.addEventListener('keyup', function(e) {
        //'back' key
        if (e.keyCode === 8) {
            $('#back-button').click();
        }
        //'delete' key
        if (e.keyCode === 46) {
            $('#ac-button').click();
        }
    })
}

function handleEightButtonClick() {
    $('#eight-button').on('click', function(e) {
        if (state.multiplied) {
            state.currentNum = '';
            if (state.calculationArr.length === 0) {
                $('#total').html('0');
            } else {
                $('#total').html(state.calculationArr[0]);
            }
            state.multiplied = false;
            state.operatorSelected = true;
        }
    });
}

//Run on page load
$(function() {
    handleNumberButtonClick();
    handleOperatorButtonClick();
    handleEqualsButtonClick();
    handleAcButtonClick();
    handleCeButtonClick();
    handleBackButtonClick();
    handleNegativeButtonClick();
    addKeyCommand(state.numberList);
    addKeyCommand(state.operatorList);
    handleKeyPressEvent();
    handleKeyUpEvent();
    handleEightButtonClick();
});