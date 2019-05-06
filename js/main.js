var numberList = {
    "zero-button": 0,
    "one-button": 1,
    "two-button": 2,
    "three-button": 3,
    "four-button": 4,
    "five-button": 5,
    "six-button": 6,
    "seven-button": 7,
    "eight-button": 8,
    "nine-button": 9,
    "decimal-button": "."
};

var operatorList = {
    "divide-button": "/",
    "multiply-button": "x",
    "minus-button": "-",
    "add-button": "+"
};

var calculation = "";
var calculationArr = [];
var currentNum = "";

function findDecimalPlace(arr, num) {
    if (arr[num].indexOf(".") > 0) {
        return arr[num].length - arr[num].indexOf(".") - 1;
    } else {
        return 0;
    }
}

function compute(arr) {
    if (arr.length === 3) {
        switch (arr[1]) {
            case "+":
                var decimalPlace;
                var firstDecPlace = findDecimalPlace(arr, 0);
                var secondDecPlace = findDecimalPlace(arr, 2);
                if (firstDecPlace > secondDecPlace) {
                    decimalPlace = firstDecPlace;
                } else {
                    decimalPlace = secondDecPlace;
                }
                currentNum = +Number.parseFloat(arr[0]).toPrecision() + +Number.parseFloat(arr[2]).toPrecision();
                currentNum = currentNum.toFixed(decimalPlace);
                break;
            case "-":
                currentNum = Number.parseFloat(arr[0]).toPrecision() - Number.parseFloat(arr[2]).toPrecision();
                break;
            case "x":
                currentNum = Number.parseFloat(arr[0]).toPrecision() * Number.parseFloat(arr[2]).toPrecision();
                break;
            case "/":
                currentNum = Number.parseFloat(arr[0]).toPrecision() / Number.parseFloat(arr[2]).toPrecision();
                break;
        }
        currentNum = currentNum.toString();
        //Get rid of .0, .00, etc
        var reg = /^[1-9]+$/;
        if (currentNum.indexOf(".") > 0) {
            var afterDecimal = currentNum.slice(currentNum.indexOf(".") + 1, currentNum.length);
            var afterDecArr = afterDecimal.split("");
            var matchArr = [];
            for (i = 0; i < afterDecArr.length; i++) {
                if (afterDecArr[i].match(reg)) {
                    matchArr.push(afterDecArr[i]);
                }
            }
            if (matchArr.length === 0) {
                currentNum = currentNum.slice(0, currentNum.indexOf("."));
            } else {
                //Get rid of .10, .100, etc
                for (i = afterDecArr.length - 1; i > 0; i--) {
                    if (afterDecArr[i] === "0") {
                        currentNum = currentNum.slice(0, -1);
                    } else {
                        break;
                    }
                }
            }
        }
        //Make sure number does not exceed character limit
        if (currentNum.length > 16) {
            if (currentNum.indexOf(".") <= 1) {
                currentNum = Number.parseFloat(currentNum).toExponential(10);
                currentNum = currentNum.toString();
            } else {
                var tempArr = [];
                tempArr.push(currentNum);
                var maxDecimalPlace = 16 - (currentNum.length - findDecimalPlace(tempArr, 0));
                currentNum = Number.parseFloat(currentNum).toFixed(maxDecimalPlace);
            }
        }
        $('#total').html(currentNum);
        calculationArr.length = 0;
        calculationArr.push(currentNum);
        currentNum = "";
    }
}

$(function() {
    var operatorSelected = true;
    var equalsSelected = false;
    Object.keys(numberList).forEach(function(key) {
        $('#' + key).on('click', function() {
            if (currentNum.indexOf(".") >= 0 && key === "decimal-button") {
                var doubleDecimal = true;
            } else {
                doubleDecimal = false;
            }
            if (doubleDecimal === false) {
                if (currentNum === "0") {
                    currentNum = "";
                }
                if (calculation === "0") {
                    calculation = "";
                }
                if (calculation[calculation.length - 1] === "0" && calculation[calculation.length - 2] === " ") {
                    calculation = calculation.slice(0, -1);
                }
                if (operatorSelected === true && equalsSelected === true) {
                    calculationArr.length = 0;
                    operatorSelected = false;
                }
                if (equalsSelected === true) {
                    currentNum = "";
                    calculation = "";
                    equalsSelected = false;
                }
                if (currentNum.length < 16) {
                    if (key === "decimal-button" && currentNum === "") {
                        currentNum += 0;
                    }
                    currentNum += numberList[key];
                    $('#total').html(currentNum);
                    operatorSelected = false;
                }
            }
        });
    });

    Object.keys(operatorList).forEach(function(key) {
        $('#' + key).on('click', function() {
            //Get rid of 0., 1., 2., etc...
            if (currentNum[currentNum.length - 1] === ".") {
                currentNum = currentNum.slice(0, -1);
                $("#total").html(currentNum);
            }
            if (equalsSelected === true) {
                operatorSelected = false;
            }
            if (operatorSelected === false && calculationArr[0] !== "Infinity") {
                if (equalsSelected === false && calculation !== "0") {
                    calculation += currentNum;
                }
                if (equalsSelected === true) {
                    equalsSelected = false;
                }
                if (calculationArr.length !== 1) {
                    calculationArr.push(currentNum);
                }
                currentNum = "";
                compute(calculationArr);
                if (calculationArr[0] === "Infinity" || calculationArr[0] === "-Infinity" || calculationArr[0] === "NaN") {
                    $('#ac-button').click();
                    $('#total').html("Cannot divide by zero");
                    $('#accumulator').html("Cannot divide by zero");
                }
                else {
                    calculation += " ";
                    calculation += operatorList[key];
                    calculation += " ";
                    calculationArr.push(operatorList[key]);
                    $('#accumulator').html(calculation);
                    operatorSelected = true;
                }
            } else {
                if (calculation !== "") {
                    calculation = calculation.slice(0, -1);
                    calculation = calculation.slice(0, -1);
                    calculationArr.pop();
                    calculation += operatorList[key];
                    calculation += " ";
                    calculationArr.push(operatorList[key]);
                    $('#accumulator').html(calculation);
                }
            }
        });
    });

    var constantNum;
    var operator;
    $('#equals-button').on('click', function() {
        if (calculation !== "") {
            //Get rid of 0., 1., 2., etc...
            if (currentNum[currentNum.length - 1] === ".") {
                currentNum = currentNum.slice(0, -1);
            }
            if (operatorSelected === false) {
                if (equalsSelected === false) {
                    calculationArr.push(currentNum);
                    calculation = calculation + currentNum + " = ";
                    compute(calculationArr);
                    currentNum = calculationArr[0];
                    calculation = calculation + currentNum;
                    if (calculationArr[0] === "Infinity" || calculationArr[0] === "-Infinity" || calculationArr[0] === "NaN") {
                        $('#ac-button').click();
                        $('#total').html("Cannot divide by zero");
                        $('#accumulator').html("Cannot divide by zero");
                    } else {
                        $('#accumulator').html(calculation);
                        equalsSelected = true;
                        calculation = calculationArr[0];
                        calculationArr.length = 0;
                    }
                }
            } else {
                if (equalsSelected === false) {
                    constantNum = calculationArr[0];
                    operator = calculationArr[1];
                    equalsSelected = true;
                }
                if (equalsSelected === true) {
                    currentNum = calculationArr[0];
                    calculationArr.length = 0;
                    calculationArr.push(currentNum);
                    calculationArr.push(operator);
                    calculationArr.push(constantNum);
                    compute(calculationArr);
                    calculation = calculationArr[0];
                    $('#accumulator').html(calculation);
                }
            }
        }
    });

    $('#ac-button').on('click', function() {
        currentNum = "0";
        $('#total').html("0");
        calculation = "";
        $('#accumulator').html("0");
        calculationArr.length = 0;
        operatorSelected = true;
        equalsSelected = false;
    });

    $('#ce-button').on('click', function() {
        if (equalsSelected === true) {
            $('#ac-button').click();
        } else {
            currentNum = "";
            $('#total').html("0");
            operatorSelected = true;
        }
    });

    var allowedKeys = {
        42: "multiply-button",
        48: "zero-button",
        49: "one-button",
        50: "two-button",
        51: "three-button",
        52: "four-button",
        53: "five-button",
        54: "six-button",
        55: "seven-button",
        56:"eight-button",
        57: "nine-button",
        61: "equals-button",
        107: "add-button",
        189: "minus-button",
        190: "decimal-button",
        191: "divide-button"
    }

    var multiplied = false;

    function addKeyCommand(list) {
        Object.keys(list).forEach(function(key) {
            document.addEventListener('keyup', function(e) {
                if (allowedKeys[e.keyCode] === key) {
                    $('#' + key).click();
                }
            })
        })
    }

    addKeyCommand(numberList);
    addKeyCommand(operatorList);

    document.onkeypress = function(e) {
        if (e.keyCode === 43) {
            $('#add-button').click();
        }
        if (e.keyCode === 61 || e.keyCode === 13) {
            //e.preventDefault();
            $('#equals-button').click();
        }
        if (e.keyCode === 42) {
            $('#multiply-button').click();
            multiplied = true;
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
        if (multiplied === true) {
            currentNum = "";
            if (calculationArr.length === 0) {
                $('#total').html("0");
            } else {
                $('#total').html(calculationArr[0]);
            }
            multiplied = false;
            operatorSelected = true;
        }
    });
})