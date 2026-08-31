let history = [];
const operate = (a, op, b) => {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? null : a / b;
    default: return null;
  }
};

const isValidNumber = (n) => !isNaN(n) && n !== null && n !== '';

// Pinta el historial (más reciente primero)
const renderHistory = () => {
  const $list = $('#historyList');
  $list.empty();
  history.forEach(({ a, op, b, resultValue }) => {
    $list.append(`<li>${a} ${op} ${b} = ${resultValue}</li>`);
  });
};

$(document).ready(() => {
  $('#calcForm').on('submit', (e) => {
    e.preventDefault();

    const a = parseFloat($('#num1').val());
    const b = parseFloat($('#num2').val());
    const op = $('#operation').val();
    const $result = $('#result');

    console.log('➡️ Operación solicitada:', { a, op, b });

    if (!isValidNumber(a) || !isValidNumber(b)) {
      $result.text('Error: ingresa números válidos').addClass('error');
      console.error('❌ Entrada inválida');
      return;
    }

    if (op === '/' && b === 0) {
      $result.text('Error: no se puede dividir por cero').addClass('error');
      console.error('❌ División por cero');
      return;
    }

    const resultValue = operate(a, op, b);
    $result.text(`Resultado: ${resultValue}`).removeClass('error');
    console.log('✅ Resultado:', resultValue);


    const entry = { a, op, b, resultValue };
    history = [entry, ...history];
    renderHistory();
    console.log('📜 Estado del historial:', history);
  });
});
