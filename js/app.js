
//Modal regra de 3

function abrirModal() {
  document.getElementById("modalRegra3").style.display = "flex";
}


//Modal regra de 3
function fecharModal() {
  document.getElementById("modalRegra3").style.display = "none";
  limparCampos();
}

function abrirModalDivisor() {
  document.getElementById("modalDivisor").classList.add("active");
}

function fecharModalDivisor() {
  document.getElementById("modalDivisor").classList.remove("active");
}

//Função principal do cálculo regra de 3.
function calcularRegra3() {
  const A = parseFloat(document.getElementById("valorA").value);
  const B = parseFloat(document.getElementById("valorB").value);
  const C = parseFloat(document.getElementById("valorC").value);

  if (isNaN(A) || isNaN(B) || isNaN(C) || A === 0) {
    document.getElementById("resultadoRegra3").innerText =
      "Preencha todos os valores corretamente.";
    return;
  }

  const X = (B * C) / A;

  document.getElementById("valorX").value = X.toFixed(2);
  document.getElementById("resultadoRegra3").innerText =
    `Resultado: X = ${X.toFixed(2)}`;
}

//Limpar campos
function limparCampos() {
  ["valorA", "valorB", "valorC", "valorX"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("resultadoRegra3").innerText = "";
}


function abrirModalOhm() {
  document.getElementById("modalOhm").style.display = "flex";
}

function fecharModalOhm() {
  document.getElementById("modalOhm").style.display = "none";
  limparOhm();
}

function calcularOhm() {
  const V = parseFloat(document.getElementById("tensao").value);
  const I = parseFloat(document.getElementById("corrente").value);
  const R = parseFloat(document.getElementById("resistencia").value);

  let tensao = V;
  let corrente = I;
  let resistencia = R;

  const preenchidos = [!isNaN(V), !isNaN(I), !isNaN(R)].filter(Boolean).length;

  if (preenchidos < 2) {
    document.getElementById("resultadoOhm").innerText =
      "Preencha pelo menos dois valores.";
    return;
  }

  if (isNaN(tensao)) tensao = resistencia * corrente;
  if (isNaN(corrente)) corrente = tensao / resistencia;
  if (isNaN(resistencia)) resistencia = tensao / corrente;


  const potencia = tensao * corrente;

  document.getElementById("tensao").value = tensao.toFixed(2);
  document.getElementById("corrente").value = corrente.toFixed(2);
  document.getElementById("resistencia").value = resistencia.toFixed(2);
  document.getElementById("potencia").value = potencia.toFixed(2);

  document.getElementById("resultadoOhm").innerText =
    `Resultado calculado com sucesso.`;
}

function limparOhm() {
  ["tensao", "corrente", "resistencia", "potencia"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("resultadoOhm").innerText = "";
}


function abrirModalResistores() {
  document.getElementById("modalResistores").style.display = "flex";
}

function fecharModalResistores() {
  document.getElementById("modalResistores").style.display = "none";
  limparResistores();
}

function adicionarResistor() {
  const container = document.getElementById("listaResistores");
  const input = document.createElement("input");
  input.type = "number";
  input.className = "resistor";
  input.placeholder = `Resistor ${container.children.length + 1} (Ω)`;
  container.appendChild(input);
}

function calcularCores() {
  const tipo = document.querySelector('input[name="tipoFaixa"]:checked').value;

  const f1 = document.getElementById("faixa1").value;
  const f2 = document.getElementById("faixa2").value;
  const f3 = document.getElementById("faixa3").value;
  const mult = document.getElementById("multiplicador").value;
  const tol = document.getElementById("tolerancia").value;

  if (f1 === "" || f2 === "" || mult === "" || tol === "" ||
     (tipo === "5" && f3 === "")) {
    document.getElementById("resultadoCores").innerText =
      "Selecione todas as faixas do resistor.";
    return;
  }

  let valorBase = tipo === "5"
    ? parseInt(`${f1}${f2}${f3}`)
    : parseInt(`${f1}${f2}`);

  const resistencia = valorBase * parseFloat(mult);

  let valorFormatado = resistencia + " Ω";
  if (resistencia >= 1_000_000) {
    valorFormatado = (resistencia / 1_000_000).toFixed(2) + " MΩ";
  } else if (resistencia >= 1_000) {
    valorFormatado = (resistencia / 1_000).toFixed(2) + " kΩ";
  }

  document.getElementById("resultadoCores").innerText =
    `Valor: ${valorFormatado} ${tol}`;
}

function calcularResistores() {
  const resistores = document.querySelectorAll(".resistor");
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  let valores = [];

  resistores.forEach(input => {
    const valor = parseFloat(input.value);
    if (!isNaN(valor) && valor > 0) {
      valores.push(valor);
    }
  });

  if (valores.length < 2) {
    document.getElementById("resultadoResistores").innerText =
      "Informe pelo menos dois resistores válidos.";
    return;
  }

  let resultado = 0;

  if (tipo === "serie") {
    resultado = valores.reduce((a, b) => a + b, 0);
  } else {
    let soma = valores.reduce((a, b) => a + (1 / b), 0);
    resultado = 1 / soma;
  }

  document.getElementById("resultadoResistores").innerText =
    `Resistência equivalente: ${resultado.toFixed(2)} Ω`;
}

function limparResistores() {
  document.getElementById("listaResistores").innerHTML = `
    <input type="number" class="resistor" placeholder="Resistor 1 (Ω)">
    <input type="number" class="resistor" placeholder="Resistor 2 (Ω)">
  `;
  document.getElementById("resultadoResistores").innerText = "";
}


function abrirModalCores() {
  document.getElementById("modalCores").style.display = "flex";
}

function fecharModalCores() {
  document.getElementById("modalCores").style.display = "none";
  document.getElementById("resultadoCores").innerText = "";
}

function calcularCores() {
  const f1 = document.getElementById("faixa1").value;
  const f2 = document.getElementById("faixa2").value;
  const mult = document.getElementById("multiplicador").value;
  const tol = document.getElementById("tolerancia").value;

  if (f1 === "" || f2 === "" || mult === "" || tol === "") {
    document.getElementById("resultadoCores").innerText =
      "Selecione todas as faixas do resistor.";
    return;
  }

  const valorBase = parseInt(`${f1}${f2}`);
  const resistencia = valorBase * parseFloat(mult);

  let valorFormatado = resistencia + " Ω";
  if (resistencia >= 1_000_000) {
    valorFormatado = (resistencia / 1_000_000).toFixed(2) + " MΩ";
  } else if (resistencia >= 1_000) {
    valorFormatado = (resistencia / 1_000).toFixed(2) + " kΩ";
  }

  document.getElementById("resultadoCores").innerText =
    `Valor: ${valorFormatado} ${tol}`;
}



document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('input[name="tipoFaixa"]').forEach(radio => {
    radio.addEventListener("change", () => {
      const tipo = document.querySelector('input[name="tipoFaixa"]:checked').value;
      document.getElementById("faixa3").style.display =
        tipo === "5" ? "block" : "none";
    });
  });
});


function limparCores() {
  document.getElementById("faixa1").value = "";
  document.getElementById("faixa2").value = "";
  document.getElementById("faixa3").value = "";
  document.getElementById("multiplicador").value = "";
  document.getElementById("tolerancia").value = "";

  // Volta para 4 faixas por padrão
  document.querySelector('input[name="tipoFaixa"][value="4"]').checked = true;
  document.getElementById("faixa3").style.display = "none";

  document.getElementById("resultadoCores").innerText = "";
}




function limparDivisor() {
  document.getElementById("vin").value = "";
  document.getElementById("r1").value = "";
  document.getElementById("r2").value = "";
  document.getElementById("vout").value = "";
  document.getElementById("resultadoDivisor").innerHTML = "";
}

function calcularDivisor() {

  const vin = parseFloat(document.getElementById("vin").value);
  const r1 = parseFloat(document.getElementById("r1").value);
  const r2 = parseFloat(document.getElementById("r2").value);

  if (!vin || !r1 || !r2) {
    alert("Preencha todos os campos!");
    return;
  }

  const vout = vin * (r2 / (r1 + r2));

  document.getElementById("vout").value = vout.toFixed(2) + " V";

  document.getElementById("resultadoDivisor").innerHTML =
    `<strong>Resultado:</strong> ${vout.toFixed(2)} V`;
}

