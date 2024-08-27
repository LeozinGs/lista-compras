//COMO O LOCAL STORAGE ENTENDE UMA ARRAY ----------------------------------------------------------- ASSIM
// ['pao', 'leite', 'manteiga'] quando mandar pro localStorage vai ser salvo como -> "['pao', 'leite', 'manteiga']" 

//COMO EU RECUPERO UMA ARRAY DO LOCAL STORAGE
// quando fizer o JSON.parse(lista) meu programa vai ler como -> ['pao', 'leite', 'manteiga']

//COMO EU MANDO UMA ARRAY PARA O LOCAL STORAGE
// quando eu fizer o JSON.stringify(listaCriada) a array se tornará "['pao', 'leite', 'manteiga']" novamente para o local storage entender.

const input = document.getElementById('input');
const btnAdd = document.getElementById('btn-add');
const btnClear = document.getElementById('btn-clear');
const list = document.getElementById('list');
const menu = document.querySelector('.menu');
const menuList = document.querySelector('.menu_list');

let listaDeCompras = JSON.parse(localStorage.getItem('lista')) || [];

// Função para renderizar a lista
function renderizarLista() {
    list.innerHTML = '';
    listaDeCompras.forEach((item, index) => {
        list.innerHTML += `
        <li class="list_item">${item}<span class="material-icons delete" data-index="${index}">delete</span></li>
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

    // Eventos
    btnAdd.addEventListener('click', () => {
        adicionarItemNaLista();
        console.log(listaDeCompras);
    });

    btnClear.addEventListener('click', () => {
        limparListaDeCompras();
        console.log(listaDeCompras);
    });

    list.addEventListener('click', deletarItem);

    menu.addEventListener('click', () => {
        menuList.classList.toggle('active');
    });

    // Renderiza a lista inicial ao carregar a página
    renderizarLista();