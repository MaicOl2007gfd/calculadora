const pantalla = document.getElementById("resultado");
const botones = document.querySelectorAll("button");

let value = "0";
pantalla.value = "0";

// EVENTOS DE BOTONES
botones.forEach(btn => {
  btn.addEventListener("click", () => {

    let texto = btn.textContent.trim();

    if (btn.classList.contains("numero")) {
      return addNumber(texto);
    }

    if (btn.classList.contains("operador")) {
      return manejarOperador(texto);
    }

  });
});

// MANEJAR OPERADORES SEGÚN EL TEXTO DEL BOTÓN
function manejarOperador(op) {

  if (op === "C") return clearAll();
  if (op === "<-") return deleteLast();
  if (op === "=") return calcular();
  if (op === ".") return addDecimal();

  // Mapear operadores visuales a operadores lógicos
  const map = {
    "÷": "/",
    "×": "x",
    "+": "+",
    "-": "-",
    "%": "%"
  };

  addOperator(map[op]);
}

//  AGREGAR NÚMERO 
function addNumber(num) {

  if (value === "Error") value = "0";

  if (value === "0") {
    value = num;
  } else {
    value += num;
  }

  pantalla.value = value;
}

//  AGREGAR OPERADOR 
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

//  AGREGAR DECIMAL 
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

//  CÁLCULO 
function calcular() {
  try {

    if (value.trim() === "") {
      pantalla.value = "Error";
      resetAfter();
      return;
    }

    let expr = value;

    // porcentaje
    expr = expr.replace(
      /(\d+)([\+\-x/])(\d+)%/g,
      (_, a, op, b) => `${a}${op} (${a} * ${b}/100)`
    );

    expr = expr.replace(/x/g, "*");

    if (/[\+\-x/]$/.test(value)) {
      pantalla.value = "Error";
      resetAfter();
      return;
    }

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

//  BORRAR ÚLTIMO 
function deleteLast() {
  if (value.length <= 1) {
    value = "0";
  } else {
    value = value.slice(0, -1);
  }
  pantalla.value = value;
}

//  BORRAR TODO 
function clearAll() {
  value = "0";
  pantalla.value = "0";
}

function resetAfter() {
  value = "0";
  setTimeout(() => pantalla.value = "0", 3000);
}
