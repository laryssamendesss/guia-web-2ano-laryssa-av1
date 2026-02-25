const form = document.querySelector("#formMensagem");
const input = document.querySelector("#mensagem");
const erro = document.querySelector("#erro");
const lista = document.querySelector("#lista");

// "Banco de dados" em memória (array)
let mensagens = [];

let editandoIndex = null;

function validarTexto(texto) {
  const txt = texto.trim();
  return txt.length > 0;
}

// Renderizando/mostrando a lista na tela
function render() {
  lista.innerHTML = "";

  // <li> para cada mensagem
  for (let i = 0; i < mensagens.length; i++) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = mensagens[i];

    span.addEventListener("click", () => {
      input.value = mensagens[i];
      input.focus();
      editandoIndex = i;

      erro.textContent =
        "Editando item " + (i + 1) + " (envie para salvar)";
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.type = "button";
    btnExcluir.textContent = "Excluir";

    btnExcluir.addEventListener("click", () => {
      mensagens.splice(i, 1);
      render();
    });

    li.append(span, " ", btnExcluir);
    lista.append(li);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const textoDigitado = input.value;

  if (!validarTexto(textoDigitado)) {
    erro.textContent = "Texto não pode estar vazio!";
    return;
  }

  erro.textContent = "";

  const textoFinal = textoDigitado.trim();

  if (editandoIndex !== null) {
    mensagens[editandoIndex] = textoFinal;
    editandoIndex = null;
  } else {
    mensagens.push(textoFinal);
  }

  render();

  input.value = "";
});

function falar() {
  const mensagem = mensagens.join(", ");
  let utterance = new SpeechSynthesisUtterance(mensagem);
  speechSynthesis.speak(utterance);
}

const botao = document.getElementById("btnFala");
botao.addEventListener("click", falar);
