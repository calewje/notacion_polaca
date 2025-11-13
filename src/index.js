import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../dist/public/css/main.css';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
  const opePolaca = document.getElementById('opePolaca');
  const opeNormal = document.getElementById('opeNormal');
  const resul = document.getElementById('resul');
  const btn_almacenar = document.getElementById('btn_almacenar');

  const operadores = ['+', '-', '*', '/'];
  let opeAlmacenar = [];
  
  function polacaANormal(expresion) {
    const sep = expresion.trim().split(/\s+/).reverse();
    const almacenar = [];

    for (let sep of sep) {
      if (!operadores.includes(sep)) {
        almacenar.push(sep);
      } else {
        const a = almacenar.pop();
        const b = almacenar.pop();
        almacenar.push(`(${a} ${sep} ${b})`);
      }
    }
    return almacenar.pop();
  }

  function evaluarExpresion(expr) {
    try {
      return new Function(`return ${expr}`)();
    } catch (e) {
      return 'Error';
    }
  }

  btn_almacenar.addEventListener('click', () => {
    const expresionPolaca = opePolaca.value.trim();

    if (expresionPolaca === '') {
      Swal.fire('Error', 'Por favor ingresa una expresión en notación polaca.', 'error');
      return;
    }

    const expresionNormal = polacaANormal(expresionPolaca);
    const resultado = evaluarExpresion(expresionNormal);

    opeNormal.value = expresionNormal;
    resul.value = resultado;

    opeAlmacenar.push(expresionPolaca);

    Swal.fire({
      icon: 'success',
      title: 'Operación almacenada',
      html: `<b>Notación Polaca:</b> ${expresionPolaca}`,
    });

    console.log('Operaciones almacenadas:', opeAlmacenar);
  });
});
