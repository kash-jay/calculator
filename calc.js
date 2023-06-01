var currVal = 0;
var prevVal = 0;
var currText = "";
var prevText = "";
var valText = "";
var decimal = false;
var result = 0;
var operation = "";

const calcObject = {
    'add': (num1, num2) => num1 + num2,
    'sub': (num1, num2) => num1 - num2,
    'mult': (num1, num2) => num1 * num2,
    'div': (num1, num2) => num1 / num2,    
}

const upperDisplay = document.querySelector('.prev-text');
const lowerDisplay = document.querySelector('.new-text');
const leftKeypad = document.querySelector('.left');

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
        valText = valText + key.textContent;
        currText = currText + key.textContent;
        console.log("currText: " + currText);
        currVal = parseFloat(valText);
        console.log("prevVal: " + prevVal);
        console.log("currVal: " + currVal);
        updateDisplay();
    } 
    else if (char == 46 && !decimal) {    //decimal
        decimal = true;
        valText = valText + key.textContent;
        currText = currText + key.textContent;
        console.log("currText: " + currText);
        currVal = parseFloat(valText);
        console.log("prevVal: " + prevVal);
        console.log("currVal: " + currVal);
        updateDisplay();
    }
    // else if (char == 247) { //division
    //     operation = 'div';
    //     currText = currText + key.textContent;
    //     console.log("currText: " + currText);
    //     updateDisplay();
    //     prevVal = currVal;
    // }
    // else if (char == 215) {
    //     operation = 'mult';
    //     currText = currText + key.textContent;
    //     console.log("currText: " + currText);
    //     updateDisplay();

    // }
    else if (char == 43) {
        operation = 'add';
        currText = currText + key.textContent;
        console.log("currText: " + currText);
        updateDisplay();
        prevVal = currVal;
        valText = "";
    }
    // else if (char == 8722) {
    //     operation = 'sub';
    //     currText = currText + key.textContent;
    //     console.log("currText: " + currText);
    //     updateDisplay();

    // }
    else if (char == 61) {
        var result = calcObject[operation](prevVal, currVal);
        prevText = currText;
        prevVal = result;
        currText = "" + result;
        updateDisplay();
    }
}

keys.forEach((key) => {
    key.addEventListener('click', keyClick); 
});