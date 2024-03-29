var currVal = 0;
var prevVal = 0;
var currText = "";
var prevText = "";
var valText = "";
var decimal = false;
var result = 0;
var operation = "none";
var operationFlag = true;

function removeTrailingZeros(str){
    const newStr = str.replace(/\.?0+$/, '');
    return newStr.replace(/\.$/, '');
}

const calcObject = {
    'none': (num1, num2) => false,
    'add': (num1, num2) => num1 + num2,
    'sub': (num1, num2) => num1 - num2,
    'mult': (num1, num2) => num1 * num2,
    'div': (num1, num2) => {
        if (num2 == 0) {
            clear();
            prevText = "Division by zero!";
            updateDisplay();
            return; 
        }
        var result = (num1 / num2).toFixed(13);
        var str = removeTrailingZeros(result);
        return str;
    }
}

const upperDisplay = document.querySelector('.prev-text');
const lowerDisplay = document.querySelector('.new-text');
const leftKeypad = document.querySelector('.left');
const clearButton = document.getElementById('clear');

function clear() {
    currVal = 0;
    prevVal = 0;
    currText = "";
    prevText = "";
    valText = "";
    decimal = false;
    result = 0;
    operation = "";
    updateDisplay();
}

clearButton.addEventListener('click', clear);

function updateDisplay() {
    lowerDisplay.textContent = currText;
    upperDisplay.textContent = prevText;
}

function createKeypad(){
    for (var i = 7; i>0; i = i - 3) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (var j = 0; j<3; j++) {
            const key = document.createElement('button');
            key.classList.add('key');
            key.textContent = i + j;
            row.appendChild(key);
        }
        leftKeypad.appendChild(row);
    }
    const lastRow = document.createElement('div');
    lastRow.classList.add('row');
    lastRowElements = [0, '.'];
    for (const i of lastRowElements) {
        const key = document.createElement('button');
        key.classList.add('key'); 
        var id = 'last-row-' + i;
        key.setAttribute('id', id);

        key.textContent = i;
        lastRow.appendChild(key);
    }
    leftKeypad.appendChild(lastRow);
}

createKeypad();
updateDisplay();

const keys = document.querySelectorAll('.key');

function updateVals(str) {
    valText = valText + str;
    currText = currText + str;
    currVal = parseFloat(valText);
    updateDisplay();
}

function operator(op, keyText) {
    operationFlag = true;
    decimal = false;
    operation = op;
    currText = currText + keyText;
    updateDisplay();
    prevVal = currVal;
    valText = "";
}

function keyClick(event) {
    const key = event.target;
    var char = key.textContent.charCodeAt(0);
    if (char>47 && char<58){    //all digits
        if (!operationFlag) {
            clear();
            operationFlag = true;
        }
        updateVals(key.textContent);
        updateDisplay();
    } 
    else if (char == 46 && !decimal) {    //decimal
        if (!operationFlag) {
            clear();
            operationFlag = true;
        }
        decimal = true;
        updateVals(key.textContent);
        updateDisplay();
    }
    else if (char == 247) { //division
        operator('div', key.textContent);
    }
    else if (char == 215) { //multiplication
        operator('mult', key.textContent);
    }
    else if (char == 43) {  //addition
        operator('add', key.textContent);
    }
    else if (char == 8722) {    //subtraction
        operator('sub', key.textContent);
    }
    else if (char == 61) {  //equals
        operationFlag = false;
        decimal = false;
        if (!calcObject[operation](prevVal, currVal)) {
            return;
        }
        var result = calcObject[operation](prevVal, currVal);
        prevText = currText;
        prevVal = result;
        currVal = result;
        currText = ("" + result);
        updateDisplay();
    }
}

keys.forEach((key) => {
    key.addEventListener('click', keyClick); 
});

document.addEventListener('keyup', function(event){
    var keyPressed = event.key;
    console.log("key: " + keyPressed +  " " + keyPressed.charCodeAt(0));
    if (keyPressed.charCodeAt(0) > 47 && keyPressed.charCodeAt(0) < 58){
        if (!operationFlag) {
            clear();
            operationFlag = true;
        }
        updateVals(keyPressed);
        updateDisplay();
    }
    else if (keyPressed == '/') {
        console.log("divide");
        operator('div', '÷');
    }
    else if (keyPressed == '*') {
        console.log("multitply");
        operator('mult', '×');
    }
    else if (keyPressed == '+') {
        console.log("add");
        operator('add', keyPressed);
    }
    else if (keyPressed == '-') {
        console.log("subtract");
        operator('sub', keyPressed);
    }
    else if (keyPressed == '.') {
        if (!operationFlag) {
            clear();
            operationFlag = true;
        }
        decimal = true;
        updateVals(keyPressed);
        updateDisplay();
    }
    else if (keyPressed == 'Enter') {
        operationFlag = false;
        decimal = false;
        if (!calcObject[operation](prevVal, currVal)) {
            return;
        }
        var result = calcObject[operation](prevVal, currVal);
        prevText = currText;
        prevVal = result;
        currVal = result;
        currText = ("" + result);
        updateDisplay();
    }
});