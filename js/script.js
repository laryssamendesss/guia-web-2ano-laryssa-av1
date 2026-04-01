// Array para armazenar as tarefas
const tarefas = [];

// Seleção de elementos do DOM
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const lista = document.querySelector("#lista");
const msg = document.querySelector("#msg");

// Função para validar se a tarefa não está vazia
function validarTarefa(texto) {
  if (texto.trim() === "") {
    msg.textContent = "Digite uma tarefa!";
    return false;
  }

  msg.textContent = "";
  return true;
}

// Função para renderizar (atualizar) a lista de tarefas na tela
function renderTarefas() {
  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    
    // Cria um container flex para tarefa e botões
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "space-between";
    container.style.alignItems = "center";
    container.style.width = "100%";
    
    // Cria o texto da tarefa
    const textoTarefa = document.createElement("span");
    textoTarefa.textContent = tarefa;
    
    // Cria o container de botões
    const containerBotoes = document.createElement("div");
    containerBotoes.style.display = "flex";
    containerBotoes.style.gap = "8px";
    
    // Cria o botão de editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btn-editar");
    btnEditar.addEventListener("click", () => {
      // Modo edição
      container.style.flexDirection = "column";
      container.style.alignItems = "flex-start";
      container.style.gap = "10px";
      
      // Remove o texto original
      textoTarefa.remove();
      
      // Cria um input para editar
      const inputEditar = document.createElement("input");
      inputEditar.type = "text";
      inputEditar.value = tarefa;
      inputEditar.style.flex = "1";
      inputEditar.style.width = "100%";
      inputEditar.style.padding = "10px";
      inputEditar.style.border = "2px solid #667eea";
      inputEditar.style.borderRadius = "4px";
      inputEditar.style.fontSize = "14px";
      
      // Cria botão salvar
      const btnSalvar = document.createElement("button");
      btnSalvar.textContent = "Salvar";
      btnSalvar.classList.add("btn-salvar");
      btnSalvar.addEventListener("click", () => {
        if (inputEditar.value.trim() === "") {
          msg.textContent = "A tarefa não pode estar vazia!";
          return;
        }
        tarefas[index] = inputEditar.value.trim();
        msg.textContent = "";
        renderTarefas();
      });
      
      // Cria botão cancelar
      const btnCancelar = document.createElement("button");
      btnCancelar.textContent = "Cancelar";
      btnCancelar.classList.add("btn-cancelar");
      btnCancelar.addEventListener("click", () => {
        renderTarefas();
      });
      
      // Adiciona elementos ao container
      container.appendChild(inputEditar);
      
      const containerBotoesEditar = document.createElement("div");
      containerBotoesEditar.style.display = "flex";
      containerBotoesEditar.style.gap = "8px";
      containerBotoesEditar.style.width = "100%";
      containerBotoesEditar.appendChild(btnSalvar);
      containerBotoesEditar.appendChild(btnCancelar);
      containerBotoesEditar.appendChild(btnEditar);
      
      container.appendChild(containerBotoesEditar);
      
      inputEditar.focus();
      inputEditar.select();
    });
    
    // Cria o botão de exclusão
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("btn-excluir");
    btnExcluir.addEventListener("click", () => {
      tarefas.splice(index, 1);
      renderTarefas();
    });
    
    // Adiciona texto ao container
    container.appendChild(textoTarefa);
    
    // Adiciona botões ao container de botões
    containerBotoes.appendChild(btnEditar);
    containerBotoes.appendChild(btnExcluir);
    
    // Adiciona container de botões ao container principal
    container.appendChild(containerBotoes);
    
    // Adiciona container ao li
    li.appendChild(container);
    lista.appendChild(li);
  });
}

// Event listener para o formulário (evento submit)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const texto = input.value;

  if (!validarTarefa(texto)) return;

  tarefas.push(texto.trim());
  input.value = "";
  input.focus();

  renderTarefas();
});

// Event listener para atualizar mensagem de erro em tempo real
input.addEventListener("input", () => {
  if (msg.textContent) {
    validarTarefa(input.value);
  }
});
