// Selecionando elementos
const form = document.querySelector("#formMensagem");
const input = document.querySelector("#mensagem");
const erro = document.querySelector("#erro");
const lista = document.querySelector("#lista");

// Array para armazenar mensagens
let mensagens = [];

// Função para validar texto
function validarTexto(texto) {
  if (texto.trim() === "") {
    erro.textContent = "Texto não pode estar vazio!";
    return false;
  }

  erro.textContent = "";
  return true;
}

// Função para renderizar lista
function render() {
  lista.textContent = "";

  for (let i = 0; i < mensagens.length; i++) {
    const li = document.createElement("li");
    li.textContent = mensagens[i];
    lista.appendChild(li);
  }
}

// Evento de submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const textoDigitado = input.value;

  if (!validarTexto(textoDigitado)) {
    return;
  }

  mensagens.push(textoDigitado.trim());

  render();

  input.value = "";
});