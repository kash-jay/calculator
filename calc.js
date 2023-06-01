var currVal = 0;
var prevVal = 0;
var currText = "";
var prevText = "";
var valText = "";
var decimal = false;
var result = 0;
var operation = "";
var operationFlag = true;

function removeTrailingZeros(str){
    const newStr = str.replace(/\.?0+$/, '');
    return newStr.replace(/\.$/, '');
}

const calcObject = {
    'add': (num1, num2) => num1 + num2,
    'sub': (num1, num2) => num1 - num2,
    'mult': (num1, num2) => num1 * num2,
    'div': (num1, num2) => {
        var result = (num1 / num2).toFixed(13);
        var str = removeTrailingZeros(result);
        return parseFloat(str);
    }  
}

const upperDisplay = document.querySelector('.prev-text');
const lowerDisplay = document.querySelector('.new-text');
const leftKeypad = document.querySelector('.left');
const clearButton = document.getElementById('clear');

function clear() {
    console.log("clearing");
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

function keyClick(event) {
    const key = event.target;
    var char = key.textContent.charCodeAt(0);
    console.log(key.textContent);
    if (char>47 && char<58){    //all digits
        if (!operationFlag) {
            clear();
        }
        valText = valText + key.textContent;
        currText = currText + key.textContent;
        currVal = parseFloat(valText);
        updateDisplay();
    } 
    else if (char == 46 && !decimal) {    //decimal
        if (!operationFlag) {
            clear();
        }
        decimal = true;
        valText = valText + key.textContent;
        currText = currText + key.textContent;
        currVal = parseFloat(valText);
        updateDisplay();
    }
    else if (char == 247) { //division
        operationFlag = true;
        decimal = false;
        operation = 'div';
        currText = currText + key.textContent;
        updateDisplay();
        prevVal = currVal;
        valText = "";
    }
    else if (char == 215) { //multiplication
        operationFlag = true;
        decimal = false;
        operation = 'mult';
        currText = currText + key.textContent;
        updateDisplay();
        prevVal = currVal;
        valText = "";
    }
    else if (char == 43) {  //addition
        operationFlag = true;
        decimal = false;
        operation = 'add';
        currText = currText + key.textContent;
        updateDisplay();
        prevVal = currVal;
        valText = "";
    }
    else if (char == 8722) {    //subtraction
        operationFlag = true;
        decimal = false;
        operation = 'sub';
        currText = currText + key.textContent;
        updateDisplay();
        prevVal = currVal;
        valText = "";
    }
    else if (char == 61) {  //equals
        operationFlag = false;
        decimal = false;
        console.log("operation: " + operation);
        console.log("prevVal: " + prevVal);
        console.log("currVal: " + currVal);
        var result = calcObject[operation](prevVal, currVal);
        console.log("result: " + result);
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

