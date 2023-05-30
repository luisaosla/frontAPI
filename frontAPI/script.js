const form = document.querySelector('#livrosForm')
const tituloInput = document.querySelector('#tituloInput')
const autorInput = document.querySelector('#autorInput')
const ano_publicacao = document.querySelector('#ano_publicacaoInput')
const URL = 'http://localhost:8000/livros.php'

const tableBody = document.querySelector('#livrosTable')

//-------------------------------------------------- função para carregar um livro --------------------------------------------------------

function carregarLivros() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(livros => {
            tableBody.innerHTML = ''

            for (let i = 0; i < livros.length; i++) {
                const tr = document.createElement('tr')
                const livro = livros[i]
                tr.innerHTML = `
            <td>${livro.id}</td>
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.ano_publicacao}</td>

            <td>
            <button oneclick="atualizarLivro(${livro.id})">Editar</button>
            <button oneclick="excluirLivro(${livro.id})">Excluir</button>
            </td>
            `
                tableBody.appendChild(tr)
            }
        })
}

//-------------------------------------------------- função para criar um livro --------------------------------------------------------


function adicionarLivro(event){
    event.preventDefault()

    const titulo = tituloInput.value
    const autor = autorInput.value
    const ano_publicacao = ano_publicacaoInput.value

    fetch(URL, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:
    `titulo=${encodeURIComponent(titulo)}&autor=${encodeURIComponent(autor)}&ano_publicacao=${ano_publicacao}`

    })
    .then(reponse => {
        if (reponse.ok) {
            carregarLivros()
            tituloInput.value = ''
            autorInput.value = ''
            ano_publicacao.value = ''
        } else {
            console.error('Erro ao add Livro')
            alert('Erro ao Add livro')
        }
    })
}

function excluirLivro(id){
    if(confirm('Deseja excluir esse livro?')){
        fetch(`$(URL)?id=$(id))`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                carregarLivros()
            }else{
                console.error('Erro ao excluir Livro')
                alert('Erro ao excluir Livro')
            }
        })
    }
}

form.addEventListener('submit', adicionarLivro)

carregarLivros()