const leftKeypad = document.querySelector('.left');

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
}

createKeypad();