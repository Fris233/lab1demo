const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

let current = '0';
let previous = null;
let operator = null;
let shouldReset = false;

function compute() {
    if (!operator || previous === null) return;
    const a = parseFloat(previous);
    const b = parseFloat(current);

    if (operator === '+') current = a + b;
    else if (operator === '-') current = a - b;
    else if (operator === '*') current = a * b;
    else if (operator === '/') current = b === 0 ? 'Error' : a / b;

    current = String(current);
    operator = null;
    previous = null;
    shouldReset = true;
}

buttons.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const { action, val } = btn.dataset;

    if (!action) {
        if (val === '.' && current.includes('.')) return;
        if (current === '0' || shouldReset) {
            current = val === '.' ? '0.' : val;
            shouldReset = false;
        } else {
            current += val;
        }
    } else if (action === 'op') {
        if (operator && !shouldReset) compute();
        previous = current;
        operator = val;
        shouldReset = true;
    } else if (action === 'calc') {
        compute();
    } else if (action === 'clear') {
        current = '0';
        previous = null;
        operator = null;
        shouldReset = false;
    } else if (action === 'sign') {
        current = String(parseFloat(current) * -1);
    } else if (action === 'percent') {
        current = String(parseFloat(current) / 100);
    }

    display.textContent = current;
});