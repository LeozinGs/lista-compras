//COMO O LOCAL STORAGE ENTENDE UMA ARRAY ----------------------------------------------------------- ASSIM
// ['pao', 'leite', 'manteiga'] quando mandar pro localStorage vai ser salvo como -> "['pao', 'leite', 'manteiga']" 

//COMO EU RECUPERO UMA ARRAY DO LOCAL STORAGE
// quando fizer o JSON.parse(lista) meu programa vai ler como -> ['pao', 'leite', 'manteiga']

//COMO EU MANDO UMA ARRAY PARA O LOCAL STORAGE
// quando eu fizer o JSON.stringify(listaCriada) a array se tornará "['pao', 'leite', 'manteiga']" novamente para o local storage entender.

//Variáveis e constantes.
const input = document.getElementById('input');
const btnAdd = document.getElementById('btn-add');
const btnClear = document.getElementById('btn-clear');
const list = document.getElementById('list');
const menu = document.querySelector('.menu');
const menuList = document.querySelector('.menu_list');
const form = document.querySelector('.form_container');

const body = document.querySelector('body');

let listaDeCompras = JSON.parse(localStorage.getItem('lista')) || [];

//Função para abrir menu lateral
function openMenu() {
    menuList.classList.toggle('active');
}

// Função para renderizar a lista
function renderizarLista() {
    list.innerHTML = '';
    listaDeCompras.forEach((item, index) => {
        list.innerHTML += `
        <li class="list_item">${item}<span class="btn_container"><span class="material-icons edit" data-index="${index}">edit</span><span class="material-icons delete" data-index="${index}">delete</span></span></li>
        <hr>
        `;
    });
}

// Adiciona o item à lista
function adicionarItemNaLista() {
    if (input.value != ' ' && input.value != '') {
        listaDeCompras.push(input.value.charAt(0).toUpperCase() + input.value.slice(1));
        localStorage.setItem('lista', JSON.stringify(listaDeCompras));
        input.value = '';
        renderizarLista();
    } else {
        alert('Preencha o campo com algum item válido');
    }
}

// Limpa a lista de compras
function limparListaDeCompras() {
    localStorage.setItem('lista', JSON.stringify([]));
    input.value = '';
    list.innerHTML = '';
    listaDeCompras = [];
}

// Deleta o item clicado
function deletarItem(event) {
    if (event.target.classList.contains('delete')) {
        const index = event.target.getAttribute('data-index');
        listaDeCompras.splice(index, 1);
        localStorage.setItem('lista', JSON.stringify(listaDeCompras));
        renderizarLista();
    }
}

//Edita o item clicado
function editarItem(event) {
    if (event.target.classList.contains('edit')) {
        const index = event.target.getAttribute('data-index');
        const novoValor = prompt('Edite seu item.');
        listaDeCompras.splice(index, 1);
        listaDeCompras.splice(index, 0, (novoValor.charAt(0).toUpperCase() + novoValor.slice(1)));
        localStorage.setItem('lista', JSON.stringify(listaDeCompras));
        renderizarLista();

    }
}

// Eventos
//Eventos de adicionar item na lista.
btnAdd.addEventListener('click', () => {
    adicionarItemNaLista();
    console.log(listaDeCompras);
    input.focus();
});
form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    adicionarItemNaLista();
    input.focus();
});

//Evento de limpar lista
btnClear.addEventListener('click', () => {
    limparListaDeCompras();
    console.log(listaDeCompras);
});

//Evento de deletar item.
list.addEventListener('click', deletarItem);

//Evento de editar item.
list.addEventListener('click', editarItem);

//Evento de abrir menu.
menu.addEventListener('click', (event) => {
    event.stopPropagation();
    openMenu();
});

//Evento de click no body para fechar o menu.
body.addEventListener('click', () => {
    if (menuList.classList.contains('active')) {
        menuList.classList.toggle('active');
    }
});

// Renderiza a lista inicial ao carregar a página
renderizarLista();