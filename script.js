const out = document.querySelector('.result'); // отображаемое значение на странице
let fstNumb = '0'; // первое число
let sndNumb = ''; // второе число
let sign = ''; // знак

////////////////////////////////////////
///////////////MATH/////////////////////
////////////////////////////////////////

// массив функций мат.операций
const MathOp = {
  Multiply: (a, b) => a * b,
  Division: (a, b) => {
    if (b === 0) return NaN;
    else return a / b;
  },
  Sum: (a, b) => a + b,
  Substract: (a, b) => a - b,
};

// функция возвращает результат sign для чисел a и b
function Calculate(a, b, sign) {
  switch (sign) {
    case '+':
      fstNumb = MathOp.Sum(a, b);
      break;
    case '-':
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

// функция считает процент
function Percent() {
  // если это первое число
  if (sign === '') {
    fstNumb /= 100;
    ChangeOut(fstNumb);
  }
  // если второе
  else {
    sndNumb = (sndNumb * fstNumb) / 100; // считаем процент этого числа от первого (100 + 4% от 100)
    ChangeOut(sndNumb);
  }
}

////////////////////////////////////////
///////////////OUTPUT///////////////////
////////////////////////////////////////

// функция меняет отображаемое значение на странице и заносит прошлое значение в соответствующую переменную
function ChangeOut(outputStr) {
  if (Number(outputStr) < Number.MAX_SAFE_INTEGER) {
    if (outputStr.length > 12) out.style.fontSize = '40px';
    else out.style.fontSize = '50px';
    out.textContent = outputStr;

    // если знак ещё не был введён, то записываем в первое число
    if (sign === '') fstNumb = outputStr;
    else sndNumb = outputStr; // иначе во второе
  }
}

// функция очищает все переменные и отображаемое значение
function Clear() {
  fstNumb = '0';
  sndNumb = '';
  sign = '';
  out.textContent = fstNumb;
}

// функция убирает последний введённый символ
function Backspace() {
  let outputStr = out.textContent;
  // если в строке один символ
  if (out.textContent.length === 1) {
    outputStr = '0'; // заменяем его на 0
  } else {
    outputStr = outputStr.slice(0, -1); // убираем последний символ в строке
  }

  ChangeOut(outputStr);
}

// функция добавляет точку к строке
function AddPoint() {
  let outputStr = out.textContent;
  // если в строке сейчас 0, либо знак
  if (outputStr === '0' || !Number(outputStr)) {
    outputStr = '0.'; // дописать к точке дополнительно 0 в начале
  } else if (!outputStr.includes('.')) {
    // если в строке ещё нет точки
    outputStr += '.';
  }

  ChangeOut(outputStr);
}

// функция добавляет новую цифру к строке
function AddNumber(symbol) {
  let outputStr = out.textContent;
  // если в строке сейчас 0, либо знак
  if (outputStr === '0' || (!Number(outputStr) && outputStr !== '0.')) {
    outputStr = symbol; // перезаписываем значение строки на принятый символ
  } else {
    outputStr += symbol; // иначе добавляем к строке символ
  }

  ChangeOut(outputStr);
}

////////////////////////////////////////
///////////////MAIN/////////////////////
////////////////////////////////////////

// функция в зависимости от принятого сивола запускает те или иные действия
const ChooseAction = (symbol) => {
  switch (symbol) {
    case '+':
    case '-':
    case '×':
    case '÷':
      // если передан символ мат. операций
      out.textContent = symbol; //заменяем отображаемое значение на принятый символ
      sign = symbol; // сохраняем его
      break;
    case '=':
      // если числа не NaN
      if (fstNumb && sndNumb) {
        Calculate(Number(fstNumb), Number(sndNumb), sign);
      } else {
        fstNumb = sndNumb;
      }
      if (String(fstNumb).length > 13) fstNumb = Number(fstNumb).toFixed(13);
      fstNumb = fstNumb.replace(/0*$/, '');
      ChangeOut(fstNumb);
      sign = ''; // сбрасываем знак
      break;
    case 'C':
      Clear();
      break;
    case '':
      // не применять backspace на знаках
      if (sign === '' || sndNumb !== '') Backspace();
      break;
    case '.':
      AddPoint();
      break;
    case '%':
      Percent();
      break;
    default:
      AddNumber(symbol);
      break;
  }
};

function SwitchTheme() {
  let screen = document.querySelector('.screen');
  screen.classList.toggle('theme-light');
}

const init = () => {
  const btns = document.querySelectorAll('.calc__button'); //полчучаем псевдомассив всех кнопок
  for (let btn of btns) {
    btn.addEventListener(
      'click',
      () =>
        //весим функцию на клик по каждой кнопке
        ChooseAction(btn.textContent.trim()) //в функцию передаём текстовое значение блока с убранными пробелами
    );
  }

  const btnTheme = document.querySelector('input');
  btnTheme.addEventListener('change', SwitchTheme);
};

init();
