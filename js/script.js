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

// Evento de input para atualizar lista ao digitar
input.addEventListener("input", function () {
  const texto = input.value;
  mensagens = texto.split(',').map(item => item.trim()).filter(item => item !== "");
  render();
});

// Evento de submit (opcional, pode remover se não quiser adicionar extra)
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Não faz nada extra, já atualiza ao digitar
});