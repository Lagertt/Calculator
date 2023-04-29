let outputStr = document.querySelector('.result').textContent;
let bufValue = 0;

const ChangeOutputStr = () => {
    document.querySelector('.result').textContent = outputStr;
};

const Clear = () => {
    bufValue = 0;
    outputStr = '0';
    ChangeOutputStr();
};

const Backspace = () => {
    if (outputStr.length === 1) {
        outputStr = '0';
    } else {
        outputStr = outputStr.slice(0, -1);
    }

    ChangeOutputStr();
};

const Multiply = () => {};

const Division = () => {};

const Percent = () => {};

const Plus = () => {
    bufValue = Number(outputStr);
    //outputStr = Number(outputStr) + bufValue;
};

const Minus = () => {
    bufValue = Number(outputStr);
    //outputStr = Number(outputStr) - bufValue;
};

const AddPoint = () => {
    if (outputStr === '0') {
        outputStr = '0.';
    } else if (!outputStr.includes('.')) {
        outputStr += '.';
    }

    ChangeOutputStr();
};

const AddNumber = (symbol) => {
    if (outputStr === '0') {
        outputStr = symbol;
    } else {
        outputStr += symbol;
    }

    ChangeOutputStr();
};

const ChooseAction = (symbol) => {
    switch (symbol) {
        case '+':
            Plus();
            break;
        case '−':
            Minus();
            break;
        case '=':
            ChangeOutputStr();
            break;
        case 'C':
            Clear();
            break;
        case '':
            Backspace();
            break;
        case '×':
            Multiply();
            break;
        case '÷':
            Division();
            break;
        case '%':
            Percent();
            break;
        case '.':
            AddPoint();
            break;
        default:
            AddNumber(symbol);
    }
};

const init = () => {
    const btns = document.querySelectorAll('.calc__button');
    for (let btn of btns) {
        btn.addEventListener('click', () =>
            ChooseAction(btn.textContent.trim())
        );
    }
};

init();
