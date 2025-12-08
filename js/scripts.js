function novaTarefa(coluna){
    var idNome = "nome-" + coluna
    var idDescricao = "descricao-" + coluna
    var idPrioridade = "prioridade-" + coluna
    var idData = "data-" + coluna

    var nome = document.getElementById(idNome).value
    var descricao = document.getElementById(idDescricao).value
    var prioridade = document.getElementById(idPrioridade).value
    var data = document.getElementById(idData).value

    if(nome == ""){
        alert("Por favor, insira o nome da tarefa.")
        return
    }

    var tarefa = {nome: nome, descricao: descricao, prioridade: prioridade, data: data, coluna: coluna}

    var lista_tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

    lista_tarefas.push(tarefa)

    localStorage.setItem("tarefas", JSON.stringify(lista_tarefas))

    document.getElementById(idNome).value = ""
    document.getElementById(idDescricao).value = ""
    document.getElementById(idPrioridade).value = "media"
    document.getElementById(idData).value = ""

    exibirTarefas()
}

function removeTarefa(event, index){
    if(event) event.stopPropagation();

    var lista_tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

    lista_tarefas.splice(index, 1)

    localStorage.setItem("tarefas", JSON.stringify(lista_tarefas))

    exibirTarefas()
}

function moverTarefa(index){
    var lista_tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
    var tarefa = lista_tarefas[index]

    if(tarefa.coluna == "fazer"){
        tarefa.coluna = "fazendo"
    } else if(tarefa.coluna == "fazendo"){
        tarefa.coluna = "feito"
    } else if(tarefa.coluna == "feito"){
        tarefa.coluna = "fazer"
    }

    localStorage.setItem("tarefas", JSON.stringify(lista_tarefas))

    exibirTarefas()
}

function editarTarefa(event, index){
    if(event) event.stopPropagation();

    var lista_tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
    var tarefa = lista_tarefas[index]

    document.getElementById("editar-nome").value = tarefa.nome
    document.getElementById("editar-descricao").value = tarefa.descricao
    document.getElementById("editar-prioridade").value = tarefa.prioridade
    document.getElementById("editar-data").value = tarefa.data

    indiceEdicao = index

    document.getElementById("fade").classList.remove("hide")
    document.getElementById("modal").classList.remove("hide")
}

function fecharModal(){
    document.getElementById("fade").classList.add("hide")
    document.getElementById("modal").classList.add("hide")
}

function salvarEdicao(){
    var lista_tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

    lista_tarefas[indiceEdicao].nome = document.getElementById("editar-nome").value
    lista_tarefas[indiceEdicao].descricao = document.getElementById("editar-descricao").value
    lista_tarefas[indiceEdicao].prioridade = document.getElementById("editar-prioridade").value
    lista_tarefas[indiceEdicao].data = document.getElementById("editar-data").value

    localStorage.setItem("tarefas", JSON.stringify(lista_tarefas))

    document.getElementById("fade").classList.add("hide")
    document.getElementById("modal").classList.add("hide")

    fecharModal()
    exibirTarefas()
}

function exibirTarefas(){
    var lista_tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

    var lista_fazer = document.getElementById("lista-fazer")
    var lista_fazendo = document.getElementById("lista-fazendo")
    var lista_feito = document.getElementById("lista-feito")

    lista_fazer.innerHTML = ""
    lista_fazendo.innerHTML = ""
    lista_feito.innerHTML = ""

    for(var i = 0; i < lista_tarefas.length; i++){
        let card = document.createElement("div")
        let t = lista_tarefas[i]

        var textoData = "Sem data"
        if(t.data && t.data != ""){
            textoData = t.data.split("-").reverse().join("/")
        }

        var classeBorda = ""
        if(t.prioridade == "baixa"){
            classeBorda = "prioridade-baixa"
        } else if(t.prioridade == "media"){
            classeBorda = "prioridade-media"
        } else{
            classeBorda = "prioridade-alta"
        }

        card.className = "kanban-card " + classeBorda

        card.innerHTML = 
            "<div class=\"conteudo-card\" onclick=\"moverTarefa("+ i +")\" title=\"clique para mover\">" + 
                "<h3 class='" + classeBorda + "'>" + t.nome + " <span class='texto-prio'>(" + t.prioridade + ")</span></h3>" +
                "<p class='desc'>" + (t.descricao || "") + "</p>" +
                "<div class='info-baixo'>" +
                    "<small>📅 " + textoData + "</small>" +
                "</div>" +
            "</div>" +
            "<button class='bt-remover' onclick='removeTarefa(event, "+ i +")'>x</button>" +
            "<button class='bt-editar' onclick='editarTarefa(event, "+ i +")'>✏️</button>"

        if(lista_tarefas[i].coluna == "fazer"){
            lista_fazer.appendChild(card)
        } else if(lista_tarefas[i].coluna == "fazendo"){
            lista_fazendo.appendChild(card)
        } else if(lista_tarefas[i].coluna == "feito"){
            lista_feito.appendChild(card)
        }
    }
}

function salvarPerfil(){
    var nome = document.getElementById("perfil-nome").value
    var email = document.getElementById("perfil-email").value

    var perfil = {nome: nome, email: email}

    localStorage.setItem("perfil", JSON.stringify(perfil))
    alert("Perfil salvo com sucesso!")
}