// projetos genericos só para testar
let projetos = [
  { nome: "Sistema escolar", status: "andamento" },
  { nome: "Site institucional", status: "concluido" },
  { nome: "App mobile", status: "andamento" }
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
        <h4>${p.nome}</h4>
        <p>${p.status}</p>

        <button onclick="remover(${index})">remover</button>
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
function remover(index) {
  projetos.splice(index, 1);
  filtrar();
}

search.oninput = filtrar;
filtroStatus.onchange = filtrar;

// iniciar
renderizar(projetos);