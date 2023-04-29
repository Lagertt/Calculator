const out = document.querySelector('.result');
let fstNumb = '0'; //первое число
let sndNumb = ''; // второе число
let sign = '';

const MathOp = {
    Multiply: (a, b) => a * b,
    Division: (a, b) => {
        if (b === 0) return NaN;
        else return a / b;
    },
    Sum: (a, b) => a + b,
    Substract: (a, b) => a - b,
};

function ChangeOut(outputStr) {
    out.textContent = outputStr;
    if (sign === '') fstNumb = outputStr;
    else sndNumb = outputStr;
}

function Clear() {
    fstNumb = '0';
    sndNumb = '';
    sign = '';
    out.textContent = fstNumb;
}

function Backspace() {
    let outputStr = out.textContent;
    if (out.textContent.length === 1) {
        outputStr = '0';
    } else {
        outputStr = outputStr.slice(0, -1);
    }

    ChangeOut(outputStr);
}

function AddPoint() {
    let outputStr = out.textContent;
    if (outputStr === '0' || !Number(outputStr)) {
        outputStr = '0.';
    } else if (!outputStr.includes('.')) {
        outputStr += '.';
    }

    ChangeOut(outputStr);
}

function AddNumber(symbol) {
    let outputStr = out.textContent;
    if (outputStr === '0' || (!Number(outputStr) && outputStr !== '0.')) {
        outputStr = symbol;
    } else {
        outputStr += symbol;
    }

    ChangeOut(outputStr);
}

function Calculate(a, b, sign) {
    switch (sign) {
        case '+':
            fstNumb = MathOp.Sum(a, b);
            break;
        case '−':
            fstNumb = MathOp.Substract(a, b);
            break;
        case '÷':
            fstNumb = MathOp.Division(a, b);
            break;
        case '×':
            fstNumb = MathOp.Multiply(a, b);
            break;
    }
    out.textContent = String(fstNumb);
}

const ChooseAction = (symbol) => {
    switch (symbol) {
        case '+':
        case '−':
        case '×':
        case '÷':
            out.textContent = symbol;
            sign = symbol;
            break;
        case '=':
            if (fstNumb && sndNumb) {
                Calculate(Number(fstNumb), Number(sndNumb), sign);
            } else {
                fstNumb = sndNumb;
            }
            ChangeOut(fstNumb);
            sign = '';
            break;
        case 'C':
            Clear();
            break;
        case '':
            Backspace();
            break;
        case '.':
            AddPoint();
            break;
        default:
            AddNumber(symbol);
            break;
    }
};

const init = () => {
    const btns = document.querySelectorAll('.calc__button');
    for (let btn of btns) {
        btn.addEventListener('click', () => {
            window.navigator.vibrate(200);
            ChooseAction(btn.textContent.trim());
        });
    }
};

init();
