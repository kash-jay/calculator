var currVal = 0;
var prevVal = 0;
var currText = "0";
var prevText = "0";

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
    console.log(key.textContent);
}

keys.forEach((key) => {
    key.addEventListener('click', keyClick); 
});