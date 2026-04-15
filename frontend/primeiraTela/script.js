// Configuração da API e token de autenticação
const API_BASE = "https://trainee-projetos-api.vercel.app";
const TOKEN = "equipe-alpha-2026";

let projetos = []; 

// Selecionando os elementos da tela
const cards = document.getElementById("cards");
const search = document.getElementById("search");
const filtroStatus = document.getElementById("status");
const btn = document.getElementById("addBtn");

// Conecta com a API
async function fetchAPI(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "x-team-token": TOKEN
    }
  });
 // Lança exceção se a conexão falhar 
  if (!res.ok) throw new Error(`Erro na API (${res.status}) ao acessar ${endpoint}`);

  return res.json();
}

async function carregarProjetos() {
  try {
    // Busca a lista na rota /projects 
    const dadosAPI = await fetchAPI("/projects");

    // Transforma os dados da API para o formato dos card
    projetos = dadosAPI.map(p => {
      let statusFormatado = (p.status || "em andamento").toLowerCase();
      if (statusFormatado.includes("concluíd")) {
        statusFormatado = "concluido";
      }
      // Deixa a descrição para a proxima pagina com a visao geral do projeto clicado
      return {
        nome: p.name || "Sem nome",
        status: statusFormatado, 
        descricao: p.client ? `Cliente: ${p.client}` : "Sem descrição"
      };
    });

    // Depois de carregar e formatar, chama o filtro para renderizar a lista na tela
    filtrar();

  } catch (erro) {
    console.error("Erro ao carregar projetos:", erro);
    cards.innerHTML = `<p style="color: #ce3c3c;>Erro ao carregar os projetos da API.</p>`;
  }
}

function renderizar(lista) {
  // Limpa a tela
  cards.innerHTML = "";

  // Para cada projeto,formata para o card
  lista.forEach((p) => {
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
// A função filtra a lista completa de projetos
function filtrar() {
  const texto = search.value.toLowerCase();
  const statusSelecionado = filtroStatus.value;

  const listaFiltrada = projetos.filter(p => {
    const bateTexto = p.nome.toLowerCase().includes(texto);
    const bateStatus = statusSelecionado === "all" || p.status === statusSelecionado;
    return bateTexto && bateStatus;
  });

  renderizar(listaFiltrada);
}
// Eventos para os filtros e botão de adicionar
btn.onclick = () => {
  const nome = prompt("Nome do projeto:");
  const statusNovo = prompt("Status (em andamento/concluido):");

  if (nome && statusNovo) {
    // Adiciona o novo projeto à lista 
    projetos.push({ nome, status: statusNovo.toLowerCase(), descricao: "Adicionado manualmente" });
    filtrar();
  }
};
search.oninput = filtrar;
filtroStatus.onchange = filtrar;

// Inicia a aplicação acionando a API
carregarProjetos();