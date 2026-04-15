// projetos genericos só para testar
let projetos = [
  { 
    nome: "Sistema escolar", 
    status: "em andamento", 
    descricao: "Portal para alunos e professores" 
  },
  { 
    nome: "Site institucional", 
    status: "concluido", 
    descricao: "Landing page da empresa" 
  },
  { 
    nome: "App mobile", 
    status: "em andamento", 
    descricao: "Aplicativo de entregas" 
  },
  { // <- Faltava abrir esta chave
    nome: "Automação de Leads", 
    status: "concluido", 
    descricao: "Robô para disparo de e-mails e captação de clientes" 
  },
  { 
    nome: "IA Médica", 
    status: "em andamento", 
    descricao: "Algoritmo de visão computacional para exames" 
  },
  { 
    nome: "Redesign Institucional", 
    status: "concluido", 
    descricao: "Nova interface moderna para o site da prefeitura" 
  }
]; 

// colocando os elementos 
const cards = document.getElementById("cards");
const search = document.getElementById("search");
const filtroStatus = document.getElementById("status");
const btn = document.getElementById("addBtn");

// funcão principal da tela
function renderizar(lista) {

  // limpa a tela
  cards.innerHTML = "";

  // para cada projeto
  lista.forEach((p, index) => {

    // cria card
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <div class="card-topo">
            <h4>${p.nome}</h4>
            <h5>${p.descricao}</h5>
        </div>
        <p class="id">${p.status}</p>
    `;

    cards.appendChild(card);
  });
}

// função do filtro
function filtrar() {

  const texto = search.value.toLowerCase();

  const listaFiltrada = projetos.filter(p => {
    return p.nome.toLowerCase().includes(texto) &&
      (filtroStatus.value === "all" || p.status === filtroStatus.value);
  });

  renderizar(listaFiltrada);
}

// botão para adionar projeto
btn.onclick = () => {
  const nome = prompt("Nome do projeto:");
  const statusNovo = prompt("Status (andamento/concluido):");

  if (nome && statusNovo) {
    projetos.push({ nome, status: statusNovo });
    filtrar();
  }
};

// para remover algum projeto
/*function remover(index) {
  projetos.splice(index, 1);
  filtrar();
}*/

search.oninput = filtrar;
filtroStatus.onchange = filtrar;

// iniciar
renderizar(projetos);