let display = document.querySelector('.calculator-display p');
let operatorDisplay = document.querySelector('.calculator-display span');
let calculatorBtn = document.querySelector('.calculator-button-group');
let previousVal = 0;
let operator = '';
const arithmetic = new RegExp('[+-x÷]');
display.textContent = '0';
calculatorBtn.addEventListener('click', function (e) {
  let dataType = e.target.dataset.type;
  let btnValue = e.target.textContent;
  if (dataType === 'num') {
    // 若最前面為0加小數點
    if (
      display.textContent.includes('.') &&
      display.textContent.indexOf('0') === 0
    ) {
      display.textContent += parseFloat(btnValue);
      return;
    }
    // 將初始化的0消掉
    if (display.textContent[0] === '0') {
      display.textContent = display.textContent.slice(1);
      display.textContent += parseFloat(btnValue);
      return;
    }
    if (operator === '=') {
      display.textContent = '';
    }
    display.textContent += parseFloat(btnValue);
  }
  if (dataType === 'operator') {
    operatorData.forEach((item) => {
      if (Object.keys(item)[0] === btnValue) {
        item[btnValue]();
      }
    });
    return;
  }
});

const operatorData = [
  {
    '√': function () {
      display.textContent = Math.sqrt(
        parseFloat(display.textContent === '' ? 0 : display.textContent)
      );
    },
  },
  {
    'x²': function () {
      if (isNaN(parseFloat(display.textContent)) || display.textContent == 0) {
        alert('無法次方');
      } else {
        let value = display.textContent;
        display.textContent = Math.pow(value, 2);
      }
    },
  },
  {
    '1/x': function () {
      if (isNaN(parseFloat(display.textContent)) || display.textContent == 0) {
        alert('無法一除');
      } else {
        let value = display.textContent;
        display.textContent = 1 / value;
      }
    },
  },
  {
    '←': function () {
      display.textContent = display.textContent.slice(
        0,
        display.textContent.length - 1
      );
      operator = '←';
    },
  },
  {
    C: function () {
      display.textContent = '0';
      previousVal = '0';
    },
  },
  {
    '+/-': function () {
      if (display.textContent.includes('-')) {
        display.textContent = display.textContent.slice(1);
      } else {
        display.textContent = '-' + display.textContent;
      }
    },
  },
  {
    '%': function () {
      display.textContent = parseFloat(display.textContent) * 0.01;
    },
  },
  {
    '÷': function () {
      saveValue();
      operator = '÷';
      operatorDisplay.textContent = operator;
    },
  },
  {
    x: function () {
      saveValue();
      operator = 'x';
      operatorDisplay.textContent = operator;
    },
  },
  {
    '-': function () {
      saveValue();
      operator = '-';
      operatorDisplay.textContent = operator;
    },
  },
  {
    '+': function () {
      saveValue();
      operator = '+';
      operatorDisplay.textContent = operator;
    },
  },
  {
    '.': function () {
      if (
        display.textContent.indexOf('.') !== 0 &&
        !display.textContent.includes('.')
      ) {
        // 注意轉成了字串
        display.textContent += '.';
      }
    },
  },
  {
    '=': function () {
      switch (operator) {
        case '÷':
          display.textContent =
            (10 * previousVal) / (10 * parseFloat(display.textContent));
          operator = '=';
          operatorDisplay.textContent = operator;
          return;
        case 'x':
          display.textContent =
            (10 * previousVal * 10 * parseFloat(display.textContent)) / 100;
          operator = '=';
          operatorDisplay.textContent = operator;
          return;
        case '-':
          display.textContent =
            (10 * previousVal - 10 * parseFloat(display.textContent)) / 10;
          operator = '=';
          operatorDisplay.textContent = operator;
          return;
        case '+':
          display.textContent =
            (10 * previousVal + 10 * parseFloat(display.textContent)) / 10;
          operator = '=';
          operatorDisplay.textContent = operator;
          return;
      }
    },
  },
];

function saveValue() {
  if (display.textContent !== ''||!arithmetic.test(operator)) {
      previousVal = parseFloat(display.textContent);
      display.textContent = '';
  }
}
