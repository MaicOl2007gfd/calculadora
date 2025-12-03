const pantalla = document.getElementById("resultado");
const botones = document.querySelectorAll("button");

let value = "0";
pantalla.value = "0";
//      EVENTOS DE LOS BOTONES
botones.forEach(btn => {
  btn.addEventListener("click", () => {

    const num = btn.dataset.num;
    const operador = btn.dataset.operator;
    const action = btn.dataset.action;

    if (num !== undefined) return addNumber(num);
    if (operador !== undefined) return addOperator(operador);
    if (action !== undefined) return manejarAccion(action);

  });
});
//          AGREGAR NÚMEROS
function addNumber(num) {

  if (value === "Error") value = "0";

  if (value === "0") {
    value = num;
  } else {
    value += num;
  }

  pantalla.value = value;
}
//          AGREGAR OPERADOR
function addOperator(op) {

  const ultimo = value.slice(-1);

  if (value === "0") {
    if (op === "-") {
      value = "0-";
      pantalla.value = value;
      return;
    }
    alert("El formato usado no es válido!");
    return;
  }

  if (/[\+\-x/%]$/.test(ultimo)) {

    if (op === "-" && ultimo !== "-") {
      value += "-";
      pantalla.value = value;
      return;
    }

    alert("El formato usado no es válido!");
    return;
  }

  value += op;
  pantalla.value = value;
}
//          AGREGAR DECIMAL
function addDecimal() {

  if (value === "0") {
    value = "0.";
    pantalla.value = value;
    return;
  }

  if (/[\+\-x/%]$/.test(value)) {
    value += "0.";
    pantalla.value = value;
    return;
  }

  const partes = value.split(/[\+\-x/%]/);
  const ultimo = partes[partes.length - 1];

  if (ultimo.includes(".")) return;

  value += ".";
  pantalla.value = value;
}
//           ACCIONES
function manejarAccion(action) {
  if (action === "clear") return clearAll();
  if (action === "delete") return deleteLast();
  if (action === "decimal") return addDecimal();
  if (action === "equal") return calcular();
}
//             CÁLCULO
function calcular() {
  try {

    if (value.trim() === "") {
      pantalla.value = "Error";
      resetAfter();
      return;
    }

    let expr = value;

    // MANEJO DEL PORCENTAJE 
    expr = expr.replace(
      /(\d+)([\+\-x/])(\d+)%/g, (_, a, op, b) => {
        return `${a}${op} (${a} * ${b}/100)`;
      }
    );

    // Reemplazar x por *
    expr = expr.replace(/x/g, "*");

    if (/[\+\-x/]$/.test(value)) {
      pantalla.value = "Error";
      resetAfter();
      return;
    }

    // Evaluar
    let resultado = eval(expr);

    if (!isFinite(resultado)) {
      pantalla.value = "Error";
      resetAfter();
      return;
    }

    pantalla.value = resultado;
    value = String(resultado);

    setTimeout(() => {
      value = "0";
      pantalla.value = "0";
    }, 8000);

  } catch (error) {
    pantalla.value = "Error";
    resetAfter();
  }
}
//        BORRAR ÚLTIMO
function deleteLast() {

  if (value.length <= 1) {
    value = "0";
  } else {
    value = value.slice(0, -1);
  }

  pantalla.value = value;
}
//            BORRAR TODO
function clearAll() {
  value = "0";
  pantalla.value = "0";
}
//   Reset después de error
function resetAfter() {
  value = "0";
  setTimeout(() => pantalla.value = "0", 3000);
}
