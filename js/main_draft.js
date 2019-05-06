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
    //"decimal-button": ".",
    //"equals-button": "="
};
var calculation = "";
var equationArr = [];
var calculationArr = [];
var currentNum = "";
/*function evaluation(string) {
    var arr = string.split(/+|-|*|\//);
    console.log(arr);
}*/

function findDecimalPlace(arr, num) {
    if (arr[num].indexOf(".") > 0) {
        return arr[num].length - arr[num].indexOf(".") - 1;
    } else {
        return 0;
    }
}

function compute(arr) {
    console.log("compute run");
    console.log("calculationArr inside compute = " + calculationArr);
    if (arr.length === 3) {
        console.log("inside compute");
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
                //console.log("decimalPlace = " + decimalPlace + typeof decimalPlace);
                //console.log("arr[0] = " + typeof Number.parseFloat(arr[0]).toPrecision());
                //console.log("arr[2] = " + typeof Number.parseFloat(arr[2]).toPrecision());
                currentNum = +Number.parseFloat(arr[0]).toPrecision() + +Number.parseFloat(arr[2]).toPrecision();
                currentNum = currentNum.toFixed(decimalPlace);
                //currentNum = parseInt(arr[0]) + parseInt(arr[2]);
                console.log("arr = " + arr);
                console.log("calculated currentNum = " + typeof currentNum);
                break;
            case "-":
                console.log("arr[0] = " + typeof Number.parseFloat(arr[0]).toPrecision());
                console.log("arr[2] = " + typeof Number.parseFloat(arr[2]).toPrecision());
                currentNum = Number.parseFloat(arr[0]).toPrecision() - Number.parseFloat(arr[2]).toPrecision();
                //currentNum = parseInt(arr[0]) - parseInt(arr[2]);
                console.log("arr = " + arr);
                console.log("calculated currentNum = " + typeof currentNum);
                break;
            case "x":
                console.log("arr[0] = " + typeof Number.parseFloat(arr[0]).toPrecision());
                console.log("arr[2] = " + typeof Number.parseFloat(arr[2]).toPrecision());
                currentNum = Number.parseFloat(arr[0]).toPrecision() * Number.parseFloat(arr[2]).toPrecision();
                //currentNum = parseInt(arr[0]) * parseInt(arr[2]);
                console.log("arr = " + arr);
                console.log("calculated currentNum = " + typeof currentNum);
                break;
            case "/":
                console.log("arr[0] = " + typeof Number.parseFloat(arr[0]).toPrecision());
                console.log("arr[2] = " + typeof Number.parseFloat(arr[2]).toPrecision());
                currentNum = Number.parseFloat(arr[0]).toPrecision() / Number.parseFloat(arr[2]).toPrecision();
                //currentNum = parseInt(arr[0]) / parseInt(arr[2]);
                console.log("arr = " + arr);
                console.log("calculated currentNum = " + typeof currentNum);
                break;
        }
        currentNum = currentNum.toString();
        console.log("currentNum = " + currentNum);

        //Get rid of .0, .00, etc
        var reg = /^[1-9]+$/;
        if (currentNum.indexOf(".") > 0) {
            var afterDecimal = currentNum.slice(currentNum.indexOf(".") + 1, currentNum.length);
            console.log("afterDecimal = " + afterDecimal);
            var afterDecArr = afterDecimal.split("");
            var matchArr = [];
            console.log("afterDecArr = " + afterDecArr);
            for (i = 0; i < afterDecArr.length; i++) {
                if (afterDecArr[i].match(reg)) {
                    matchArr.push(afterDecArr[i]);
                }
            }
            if (matchArr.length === 0) {
                currentNum = currentNum.slice(0, currentNum.indexOf("."));
            } else {
                //Get rid of .10, .100, etc
                console.log("inside else");
                for (i = afterDecArr.length - 1; i > 0; i--) {
                    console.log("afterDecArr[i] = " + afterDecArr[i]);
                    if (afterDecArr[i] === "0") {
                        console.log("inside if");
                        currentNum = currentNum.slice(0, -1);
                        console.log("currentNum = " + currentNum);
                    } else {
                        break;
                    }
                }
            }
            //if (reg.test(afterDecimal) === false) {
            /*if (afterDecArr === null) {
                console.log("test false");
                currentNum = currentNum.slice(0, currentNum.indexOf("."));
            }*/
        }
            ////////////currentNum = currentNum.toExponential();

        if (currentNum.length > 16) {
            if (currentNum.indexOf(".") <= 1) {
                currentNum = Number.parseFloat(currentNum).toExponential(10);
                currentNum = currentNum.toString();
            } else {
                var tempArr = [];
                tempArr.push(currentNum);
                var maxDecimalPlace = 16 - (currentNum.length - findDecimalPlace(tempArr, 0));

                console.log("maxDecimalPlace = " + maxDecimalPlace);
                currentNum = Number.parseFloat(currentNum).toFixed(maxDecimalPlace);
            }

            //currentNum = Math.round(parseInt(currentNum) * 100000000000000000) / 100000000000000000;
            //currentNum = currentNum.toString();
        }
        ////if (currentNum === "Infinity" || currentNum === "-Infinity" || currentNum === "NaN") {
            //console.log("inside Infinity")
            //currentNum = "Cannot divide by zero";
            //console.log("currentNum after inf = " + currentNum)
            //$('#total').html("Cannot divide by zero");
            //$('#accumulator').html("Cannot divide by zero");
            //currentNum = "0";
            //calculation = "0";
            //$('#ac-button').click();
            //alert("Cannot divide by zero");
        ////} else {
            $('#total').html(currentNum);
        ////}
        //calculation = currentNum;
        calculationArr.length = 0;
        console.log("calculationArr first = " + calculationArr);
        console.log(currentNum);
        /*if (currentNum === "Cannot divide by zero") {
            console.log("gerp");
            currentNum = "0";
            calculationArr.push(currentNum);
        }*/
        //if (currentNum !== "Infinity") {
        calculationArr.push(currentNum);
    //}
        currentNum = "";
        console.log("calculationArr second = " + calculationArr)
    /////}
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
                /*if (calculationArr.length === 2) {
                    console.log("calculationArr = " + calculationArr);
                    calculationArr.length = 0;
                }*/
                console.log("currentNum = " + currentNum);
                console.log("calculation = " + calculation);
                /*if (currentNum === "0") {
                    currentNum = "";
                    calculation = "";
                }*/
                if (currentNum === "0") {
                    currentNum = "";
                }
                if (calculation === "0") {
                    calculation = "";
                }
                //console.log("ITT = " + calculationArr[calculationArr.length - 1]);
                //console.log("MUGH = " + calculation[calculation.length - 1]);
                if (calculation[calculation.length - 1] === "0" && calculation[calculation.length - 2] === " ") {
                    //calculationArr.pop();
                    console.log("calculation before slice = " + calculation);
                    calculation = calculation.slice(0, -1);
                    console.log("calculation after slice = " + calculation);
                }
                ////////
                if (operatorSelected === true && equalsSelected === true) {
                    calculationArr.length = 0;
                    operatorSelected = false;
                }
                if (equalsSelected === true) {
                    currentNum = "";
                    calculation = "";
                    equalsSelected = false;
                }

                /////////
                if (currentNum.length < 16) {
                    console.log("currentNum before = " + currentNum);
                    console.log("calculation before before = " + calculation);
                    if (key === "decimal-button" && currentNum === "") {
                        currentNum += 0;
                        //calculation += 0;///////////
                    }
                    currentNum += numberList[key];
                    console.log("currentNum after = " + currentNum);
                    console.log("calculation before = " + calculation);
                    //calculation += numberList[key];///////////////
                    //calculationArr.push(currentNum);
                    console.log("calculation after = " + calculation);
                    //$('#total').html(numberList[key])
                    $('#total').html(currentNum);
                    //$('#accumulator').html(calculation);//////////
                    operatorSelected = false;
                }
            }
        });
    });

    Object.keys(operatorList).forEach(function(key) {
        $('#' + key).on('click', function() {
            console.log("calculationArr at beginning = " + calculationArr);
            console.log("operatorSelected now = " + operatorSelected);
            console.log("equalsSelected now = " + equalsSelected);
            //Get rid of 0., 1., 2., etc...
            if (currentNum[currentNum.length - 1] === ".") {
                currentNum = currentNum.slice(0, -1);
                $("#total").html(currentNum);
            }
            if (equalsSelected === true) {
                operatorSelected = false;
            }

            if (operatorSelected === false && calculationArr[0] !== "Infinity") {
                console.log("calculationArr[0] = " + calculationArr[0]);
                if (equalsSelected === false && calculation !== "0") {
                    calculation += currentNum;
                }
                if (equalsSelected === true) {
                    //currentNum = "";
                    //calculation = "";
                    equalsSelected = false;
                }
                console.log("currentNum = " + currentNum);
                console.log("calculation = " + calculation);
                //$('#accumulator').html(calculation);

                //equationArr.push(currentNum);
                if (calculationArr.length !== 1) {
                    calculationArr.push(currentNum);
                }
                console.log("calculationArr after first push = " + calculationArr + " " + calculationArr.length);
                currentNum = "";
                compute(calculationArr);

                if (calculationArr[0] === "Infinity" || calculationArr[0] === "-Infinity" || calculationArr[0] === "NaN") {
                    $('#ac-button').click();
                    $('#total').html("Cannot divide by zero");
                    $('#accumulator').html("Cannot divide by zero");
                    console.log("calculationArr after AC = " + calculationArr);
                    console.log("calculation after AC = " + calculation);
                }
                else {//if (calculationArr[0] !== "Infinity") {
                    calculation += " ";
                    calculation += operatorList[key];
                    calculation += " ";
                    //equationArr.push(operatorList[key]);
                    calculationArr.push(operatorList[key]);
                    console.log("calculationArr after second push = " + calculationArr);
                    console.log("calculation = " + calculation);
                    //$('#total').html(operatorList[key]);
                    $('#accumulator').html(calculation);
                    operatorSelected = true;
                } /*else {
                    calculationArr.length = 0;
                    calculation = "";
                    //$('#accumulator').html("Cannot divide by zero");
                }*/
            } else {
                //console.log(calculation[calculation.length - 1]);
                console.log("calculation after else = " + calculation);
                if (calculation !== "") {
                    calculation = calculation.slice(0, -1);
                    calculation = calculation.slice(0, -1);
                    //equationArr.pop();
                    calculationArr.pop();
                    console.log("calculationArr after pop = " + calculationArr);
                    calculation += operatorList[key];
                    calculation += " ";
                    //equationArr.push(operatorList[key]);
                    calculationArr.push(operatorList[key]);
                    console.log("calculationArr after push = " + calculationArr);
                    $('#accumulator').html(calculation);
                }
            }
        });
    });

    var constantNum;
    var operator;
    $('#equals-button').on('click', function() {
        console.log("after equals calculation = " + calculation);
        if (calculation !== "") {
            //Get rid of 0., 1., 2., etc...
            if (currentNum[currentNum.length - 1] === ".") {
                currentNum = currentNum.slice(0, -1);
            }
            console.log("equals");
            console.log("currentNum = " + currentNum);

            if (operatorSelected === false) {
                console.log("inside first");
                calculationArr.push(currentNum);
                calculation = calculation + currentNum + " = ";
                compute(calculationArr);
                currentNum = calculationArr[0];
                console.log("currentNum = " + currentNum);
                calculation = calculation + currentNum;
                if (calculationArr[0] === "Infinity" || calculationArr[0] === "-Infinity" || calculationArr[0] === "NaN") {
                    console.log("JVBNJBDVIDI");
                    $('#ac-button').click();
                    $('#total').html("Cannot divide by zero");
                    $('#accumulator').html("Cannot divide by zero");
                } else {
                    $('#accumulator').html(calculation);
                    equalsSelected = true;
                    calculation = calculationArr[0];
                    console.log("calculation = " + calculation);
                    calculationArr.length = 0;
                    console.log("calculationArr after equals = " + calculationArr);
                }
            } else {
                if (equalsSelected === false) {
                    console.log("inside second");
                    constantNum = calculationArr[0];
                    console.log("constantNum = " + constantNum);
                    operator = calculationArr[1];
                    console.log("operator = " + operator);
                    equalsSelected = true;
                    //operatorSelected = false;
                    //console.log("currentNum = " + currentNum);
                }
                if (equalsSelected === true) {
                    console.log("inside third");
                    console.log("constantNum = " + constantNum);
                    console.log("operator = " + operator);
                    console.log("calculationArr = " + calculationArr);
                    currentNum = calculationArr[0];
                    calculationArr.length = 0;
                    console.log("calculationArr = " + calculationArr);
                    calculationArr.push(currentNum);
                    console.log("calculationArr = " + calculationArr);
                    calculationArr.push(operator);
                    console.log("calculationArr = " + calculationArr);
                    calculationArr.push(constantNum);
                    console.log("calculationArr = " + calculationArr);
                    compute(calculationArr);
                    calculation = calculationArr[0];
                    $('#accumulator').html(calculation);
                }
            }
            //equalsSelected = true;
        }
    });

    $('#ac-button').on('click', function() {
        console.log("AC!!!!");
        currentNum = "0";
        $('#total').html("0");
        calculation = "";
        $('#accumulator').html("0");
        calculationArr.length = 0;
        operatorSelected = true;
        equalsSelected = false;
        console.log("currentNum = " + currentNum);
        console.log("calculation = " + calculation);
        console.log("operatorSelected = " + operatorSelected);
        console.log("equalsSelected = " + equalsSelected);
    });

    $('#ce-button').on('click', function() {
        if (equalsSelected === true) {
            $('#ac-button').click();
        } else {
            currentNum = "";
            $('#total').html("0");
            operatorSelected = true;
        }
        //equalsSelected = false;
        //calculation = calculation.slice(0, -1);
        //$('#accumulator').html(calculation);
    });

    var allowedKeys = {
        //8: "ce-button",
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
        //111: "divide-button",
        191: "divide-button",
        //88: "multiply-button",
        42: "multiply-button",
        //109: "minus-button",
        189: "minus-button",
        107: "add-button",
        //13: "equals-button",
        //187: "equals-button",
        61: "equals-button",
        190: "decimal-button"
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
        console.log("keycode = " + e.keyCode);
        if (e.keyCode === 43) {
            //console.log("inside");
            $('#add-button').click();
        }
        if (e.keyCode === 61 || e.keyCode === 13) {
            e.preventDefault();
            $('#equals-button').click();
        }
        if (e.keyCode === 42) {
            //e.preventDefault();
            $('#multiply-button').click();
            //currentNum = "";
            multiplied = true;
            console.log("multiplied = " + multiplied);
        }
        /*if (e.keyCode === 56) {
            e.preventDefault();
        }*/
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
            //e.preventDefault();
            //console.log("currentNum before = " + currentNum);
            currentNum = "";
            console.log("after eight calculationArr = " + calculationArr);
            console.log("after eight calculation = " + calculation);
            if (calculationArr.length === 0) {
                $('#total').html("0");
            } else {
                $('#total').html(calculationArr[0]);
            }
            //console.log("currentNum after = " + currentNum);
            multiplied = false;
            operatorSelected = true;
            //console.log("multiplied now = " + multiplied);
        }
    });

    /*Object.keys(numberList).forEach(function(key) {
        document.addEventListener('keyup', function(e) {
            if (allowedKeys[e.keyCode] === key) {
                $('#' + key).click();
            }
        })
    })*/
})