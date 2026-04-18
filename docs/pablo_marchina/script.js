// projetos genericos só para testar
let projetos = [
  { id: 1, nome: "Sistema escolar",    status: "andamento", progresso: 65,  owner: "Mariana Costa" },
  { id: 2, nome: "Site institucional", status: "concluido", progresso: 100, owner: "Rafael Silva"   },
  { id: 3, nome: "App mobile",         status: "andamento", progresso: 30,  owner: "João Pedro"     }
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

  if (lista.length === 0) {
    cards.innerHTML = `
      <div class="empty-state">
        <p>Nenhum projeto encontrado.</p>
      </div>
    `;
    return;
  }

  // para cada projeto
  lista.forEach((p, index) => {

    // cria card
    const card = document.createElement("div");
    card.className = "card";

    const cores = { andamento: "#C4203B", concluido: "#2ECC71", revisao: "#F4A217" };
    card.style.setProperty("--card-accent", cores[p.status] || "#333");

    card.innerHTML = `
      <h4>${p.nome}</h4>
      <span class="badge ${p.status}">${p.status}</span>
      <div class="card-owner">${p.owner}</div>
      <div class="progress-wrap">
        <div class="progress-label">
          <span>progresso</span>
          <span>${p.progresso}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${p.progresso}%; background: ${cores[p.status] || '#C4203B'}"></div>
        </div>
      </div>
      <button class="btn-remover" onclick="remover(${p.id})">remover</button>
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
  const statusNovo = prompt("Status: digite 'andamento' ou 'concluido'");
  const statusValido = ["andamento", "concluido"];

  if (nome && statusValido.includes(statusNovo)) {
    projetos.push({ id: Date.now(), nome, status: statusNovo });
    filtrar();
  } else if (nome) {
    alert("Status inválido. Use 'andamento' ou 'concluido'.");
  }
};

// para remover algum projeto
function remover(id) {
  projetos = projetos.filter(p => p.id !== id);
  filtrar();
}

search.oninput = filtrar;
filtroStatus.onchange = filtrar;

// iniciar
renderizar(projetos);