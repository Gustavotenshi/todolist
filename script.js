const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
  const li = document.createElement('li');
  li.classList.add('flex');
  return li;
};

inputTarefa.addEventListener('keypress', (e) => {
 if(e.keyCode === 13) {
  if(!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
 }
});

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
};

function criaBotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  botaoApagar.setAttribute('class', 'apagar');
  li.appendChild(botaoApagar);
}

function criaTarefa(textInput) {
  const li = criaLi();
  li.innerText = textInput;
  tarefas.appendChild(li);
  limpaInput()
  criaBotaoApagar(li);
  salvarTarefa();
};

btnTarefa.addEventListener('click', () => {
  if(!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener('click', (e) => {
  const el = e.target;
  if(el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefa();
  };
});

function salvarTarefa() {
  const liTarefas  = tarefas.querySelectorAll('li');
  const listaDeTarefas = []

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function lerTarefas() {
  const tarefas = localStorage.getItem('tarefas')
  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}

lerTarefas()
