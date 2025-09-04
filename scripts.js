// Seleciona os elementos do botão de upload e o input de upload
const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

// Ao clicar no botão, dispara o clique no input de upload escondido
uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

// Função que lê o conteúdo do arquivo selecionado e retorna uma Promise
function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        // Cria um novo leitor de arquivo
        const leitor = new FileReader();
        // Define o que acontece quando a leitura é completada com sucesso
        leitor.onload = () => {
            // Resolve a Promise com um objeto contendo a URL e o nome do arquivo
            resolve({ url: leitor.result, nome: arquivo.name })
        }
        // Define o que acontece em caso de erro na leitura do arquivo
        leitor.onerro = () => {
            // Rejeita a Promise com uma mensagem de erro personalizada
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }
        // Inicia a leitura do arquivo como uma URL data (base64)
        leitor.readAsDataURL(arquivo)
    })
}
// Seleciona elementos HTML da página
const imagemPrincipal = document.querySelector(".main-image");
const nomeDaImagem = document.querySelector(".container-imagem-nome p")

// Adiciona um ouvinte de evento para o input de upload de arquivo
inputUpload.addEventListener("change", async (evento) => {
    // Obtém o arquivo selecionado pelo usuário
    const arquivo = evento.target.files[0];
    // Verifica se um arquivo foi selecionado
    if (arquivo) {
        try {
            // Aguarda a leitura do conteúdo do arquivo
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            // Atualiza a imagem principal com a URL do arquivo
            imagemPrincipal.src = conteudoDoArquivo.url;
            // Atualiza o nome da imagem na página
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            // Em caso de erro na leitura do arquivo, exibe uma mensagem de erro no console
            console.error("Erro na leitura do arquivo")
        }
    }
})

// Seleciona o input de tags e a lista onde as tags serão exibidas
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

// Evento para remover uma tag ao clicar no "x"
listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
})

// Lista de tags disponíveis
const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

// Função que simula consulta a um banco/API para validar tags
async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)// Simula 1 segundo de delay
    })
}

// Evento para adicionar uma tag ao pressionar Enter
inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault(); // Impede o submit do form
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    // Código para adicionar a tag
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    alert("Tag não foi encontrada.");
                }
            } catch (erro) {
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verifcar a existência da tag. Verifique o console.")
            }
        }
    }
});

// Botão Publicar
const botaoPublicar = document.querySelector(".botao-publicar");

// Função que simula publicação do projeto (50% de chance de sucesso)
async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           const deuCerto = Math.random() > 0.5  // 50% de chance
        
            if (deuCerto) {
                resolve("Projeto publicado com sucesso!");
            } else {
                reject("Erro ao publicar o projeto!");
            }
        }, 2000)
    })
}

// Evento de clique no botão Publicar
botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        // Código que pode gerar erro
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Deu tudo certo!")
    } catch (error) {
         // O que fazer se um erro ocorrer
        console.log("Deu errado: ", error)
        alert("Deu tudo errado!");
    }

})

// Botão Descartar
const botaoDescartar = document.querySelector(".botao-descartar");

// Evento de clique no botão Descartar
botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();

    // Reseta o formulário
    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png"; 
    nomeDaImagem.textContent = "imagem_projeto.png";

    listaTags.innerHTML = "";
})



/*querySelector: Seleciona elementos HTML na página usando seletores de classe (".main-imagem" e ".container-imagem-nome p").
inputUpload.addEventListener: Adiciona um ouvinte de evento para o input de upload de arquivo (inputUpload). O evento change é acionado quando o usuário seleciona um arquivo.
Evento change: Quando o evento é acionado, o código dentro da função assíncrona (async (evento) => { ... }) é executado.
Obtendo o Arquivo: evento.target.files[0] obtém o arquivo selecionado pelo usuário no input de upload.
Await e try...catch: await lerConteudoDoArquivo(arquivo) espera pela conclusão da função lerConteudoDoArquivo e captura qualquer erro usando try...catch.
Atualização da Página: Se a leitura for bem-sucedida, imagemPrincipal.src é atualizado com a URL do arquivo e nomeDaImagem.textContent é atualizado com o nome do arquivo.*/