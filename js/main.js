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
    if (arr.length === 3) {
        switch (arr[1]) {
            case '+':
                let decimalPlace;
                let firstDecPlace = findDecimalPlace(arr, 0);
                let secondDecPlace = findDecimalPlace(arr, 2);
                if (firstDecPlace > secondDecPlace) {
                    decimalPlace = firstDecPlace;
                } else {
                    decimalPlace = secondDecPlace;
                }
                state.currentNum = +Number.parseFloat(arr[0]).toPrecision() + +Number.parseFloat(arr[2]).toPrecision();
                state.currentNum = state.currentNum.toFixed(decimalPlace);
                break;
            case '-':
                state.currentNum = Number.parseFloat(arr[0]).toPrecision() - Number.parseFloat(arr[2]).toPrecision();
                break;
            case 'x':
                state.currentNum = Number.parseFloat(arr[0]).toPrecision() * Number.parseFloat(arr[2]).toPrecision();
                break;
            case '/':
                state.currentNum = Number.parseFloat(arr[0]).toPrecision() / Number.parseFloat(arr[2]).toPrecision();
                break;
        }
        state.currentNum = state.currentNum.toString();
        //Get rid of .0, .00, etc
        let reg = /^[1-9]+$/;
        if (state.currentNum.indexOf('.') > 0) {
            let afterDecimal = state.currentNum.slice(state.currentNum.indexOf('.') + 1, state.currentNum.length);
            let afterDecArr = afterDecimal.split('');
            let matchArr = [];
            for (i = 0; i < afterDecArr.length; i++) {
                if (afterDecArr[i].match(reg)) {
                    matchArr.push(afterDecArr[i]);
                }
            }
            if (matchArr.length === 0) {
                state.currentNum = state.currentNum.slice(0, state.currentNum.indexOf('.'));
            } else {
                //Get rid of .10, .100, etc
                for (i = afterDecArr.length - 1; i > 0; i--) {
                    if (afterDecArr[i] === '0') {
                        state.currentNum = state.currentNum.slice(0, -1);
                    } else {
                        break;
                    }
                }
            }
        }
        //Make sure number does not exceed character limit
        if (state.currentNum.length > 16) {
            if (state.currentNum.indexOf('.') <= 1) {
                state.currentNum = Number.parseFloat(state.currentNum).toExponential(10);
                state.currentNum = state.currentNum.toString();
            } else {
                let tempArr = [];
                tempArr.push(state.currentNum);
                let maxDecimalPlace = 16 - (state.currentNum.length - findDecimalPlace(tempArr, 0));
                state.currentNum = Number.parseFloat(state.currentNum).toFixed(maxDecimalPlace);
            }
        }
        $('#total').html(state.currentNum);
        state.calculationArr.length = 0;
        state.calculationArr.push(state.currentNum);
        state.currentNum = '';
    }
}

//Run on page load
$(function() {
    Object.keys(state.numberList).forEach(function(key) {
        $('#' + key).on('click', function() {
            if (state.currentNum.indexOf('.') >= 0 && key === 'decimal-button') {
                let doubleDecimal = true;
            } else {
                doubleDecimal = false;
            }
            if (!doubleDecimal) {
                if (state.currentNum === '0') {
                    state.currentNum = '';
                }
                if (state.calculation === '0') {
                    state.calculation = '';
                }
                if (state.calculation[state.calculation.length - 1] === '0' && state.calculation[state.calculation.length - 2] === ' ') {
                    state.calculation = state.calculation.slice(0, -1);
                }
                if (state.operatorSelected && state.equalsSelected) {
                    state.calculationArr.length = 0;
                    state.operatorSelected = false;
                }
                if (state.equalsSelected) {
                    state.currentNum = '';
                    state.calculation = '';
                    state.equalsSelected = false;
                }
                if (state.currentNum.length < 16) {
                    if (key === 'decimal-button' && state.currentNum === '') {
                        state.currentNum += 0;
                    }
                    state.currentNum += state.numberList[key];
                    $('#total').html(state.currentNum);
                    state.operatorSelected = false;
                }
            }
        });
    });

    Object.keys(state.operatorList).forEach(function(key) {
        $('#' + key).on('click', function() {
            //Get rid of 0., 1., 2., etc...
            if (state.currentNum[state.currentNum.length - 1] === '.') {
                state.currentNum = state.currentNum.slice(0, -1);
                $('#total').html(state.currentNum);
            }
            if (state.equalsSelected) {
                state.operatorSelected = false;
            }
            if (!state.operatorSelected && state.calculationArr[0] !== 'Infinity') {
                if (!state.equalsSelected && state.calculation !== '0') {
                    state.calculation += state.currentNum;
                }
                if (state.equalsSelected) {
                    state.equalsSelected = false;
                }
                if (state.calculationArr.length !== 1) {
                    state.calculationArr.push(state.currentNum);
                }
                state.currentNum = '';
                compute(state.calculationArr);
                if (state.calculationArr[0] === 'Infinity' || state.calculationArr[0] === '-Infinity' || state.calculationArr[0] === 'NaN') {
                    $('#ac-button').click();
                    $('#total').html('Cannot divide by zero');
                    $('#accumulator').html('Cannot divide by zero');
                }
                else {
                    state.calculation += ' ';
                    state.calculation += state.operatorList[key];
                    state.calculation += ' ';
                    state.calculationArr.push(state.operatorList[key]);
                    $('#accumulator').html(state.calculation);
                    state.operatorSelected = true;
                }
            } else {
                if (state.calculation !== '') {
                    state.calculation = state.calculation.slice(0, -1);
                    state.calculation = state.calculation.slice(0, -1);
                    state.calculationArr.pop();
                    state.calculation += state.operatorList[key];
                    state.calculation += ' ';
                    state.calculationArr.push(state.operatorList[key]);
                    $('#accumulator').html(state.calculation);
                }
            }
        });
    });

    $('#equals-button').on('click', function() {
        if (state.calculation !== '') {
            //Get rid of 0., 1., 2., etc...
            if (state.currentNum[state.currentNum.length - 1] === '.') {
                state.currentNum = state.currentNum.slice(0, -1);
            }
            if (!state.operatorSelected) {
                if (!state.equalsSelected) {
                    state.calculationArr.push(state.currentNum);
                    state.calculation = state.calculation + state.currentNum + ' = ';
                    compute(state.calculationArr);
                    state.currentNum = state.calculationArr[0];
                    state.calculation = state.calculation + state.currentNum;
                    if (state.calculationArr[0] === 'Infinity' || state.calculationArr[0] === '-Infinity' || state.calculationArr[0] === 'NaN') {
                        $('#ac-button').click();
                        $('#total').html('Cannot divide by zero');
                        $('#accumulator').html('Cannot divide by zero');
                    } else {
                        $('#accumulator').html(state.calculation);
                        state.equalsSelected = true;
                        state.calculation = state.calculationArr[0];
                        state.calculationArr.length = 0;
                    }
                }
            } else {
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
                    state.calculation = state.calculationArr[0];
                    $('#accumulator').html(state.calculation);
                }
            }
        }
    });

    $('#ac-button').on('click', function() {
        state.currentNum = '0';
        $('#total').html('0');
        state.calculation = '';
        $('#accumulator').html('0');
        state.calculationArr.length = 0;
        state.operatorSelected = true;
        state.equalsSelected = false;
    });

    $('#ce-button').on('click', function() {
        if (state.equalsSelected) {
            $('#ac-button').click();
        } else {
            state.currentNum = '';
            $('#total').html('0');
            state.operatorSelected = true;
        }
    });

    function addKeyCommand(list) {
        Object.keys(list).forEach(function(key) {
            document.addEventListener('keyup', function(e) {
                if (state.allowedKeys[e.keyCode] === key) {
                    $('#' + key).click();
                }
            })
        })
    }

    addKeyCommand(state.numberList);
    addKeyCommand(state.operatorList);

    document.onkeypress = function(e) {
        if (e.keyCode === 43) {
            $('#add-button').click();
        }
        if (e.keyCode === 61 || e.keyCode === 13) {
            $('#equals-button').click();
        }
        if (e.keyCode === 42) {
            $('#multiply-button').click();
            state.multiplied = true;
        }
    }

    document.addEventListener('keyup', function(e) {
        if (e.keyCode === 8) {
            $('#ce-button').click();
        }
        if (e.keyCode === 46) {
            $('#ac-button').click();
        }
    })

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
})