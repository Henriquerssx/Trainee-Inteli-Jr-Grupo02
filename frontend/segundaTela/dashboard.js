// Lógica da segunda tela

// Pega o id do projeto pela URL.
function obterIdProjeto() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || 1;
}

// Monta a lista de membros com base nas tarefas.
function extrairMembros(tarefas) {
  const membros = {};
  tarefas.forEach(tarefa => {
    if (tarefa.assignee && typeof tarefa.assignee === "string") {
      membros[tarefa.assignee.trim()] = true;
    }
  });
  return Object.keys(membros);
}

// Conta tarefas atrasadas usando a data de entrega.
function contarAtrasadas(tarefas) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return tarefas.filter(tarefa => {
    if (!tarefa.dueDate) return false;

    // Compara a data sem considerar o horário
    const partes = tarefa.dueDate.split("-");
    const vencimento = new Date(partes[0], partes[1] - 1, partes[2]);

    const concluida = (tarefa.status || "").toLowerCase().includes("conclu");
    return !concluida && vencimento < hoje;
  });
}

// Conta quantas tarefas estão com prioridade alta.
function contarAltaPrioridade(tarefas) {
  return tarefas.filter(t => (t.priority || "").toLowerCase() === "alta").length;
}

// Preenche o resumo principal do projeto.
function preencherStatusProjeto(projeto) {
  document.getElementById("proj-nome").innerText = projeto.name || "—";
  document.getElementById("header-proj-nome").innerText = projeto.name || "Projeto";
  document.getElementById("proj-status").innerText = projeto.status || "—";
  document.getElementById("proj-cliente").innerText = projeto.client || "—";
  document.getElementById("proj-owner").innerText = projeto.owner || "—";
  document.getElementById("proj-deadline").innerText = projeto.dueDate || "—";
  document.getElementById("proj-priority").innerText = projeto.priority || "—";

  const progresso = projeto.progress || 0;
  document.getElementById("proj-progress-text").innerText = progresso + "%";
  document.getElementById("proj-progress-bar").style.width = progresso + "%";
}

// Soma as tarefas por status e atualiza os cards.
function preencherTarefas(tarefas) {
  let concluidas = 0;
  let emAndamento = 0;
  let aFazer = 0;

  tarefas.forEach(tarefa => {
    const status = (tarefa.status || "").toLowerCase();

    if (status.includes("conclu")) {
      concluidas += 1;
    } else if (status.includes("andamento") || status.includes("revis")) {
      emAndamento += 1;
    } else if (status.includes("fazer")) {
      aFazer += 1;
    }
  });

  const total = tarefas.length;

  document.getElementById("dash-total-tasks").innerText = total;
  document.getElementById("dash-tasks-done").innerText = concluidas;
  document.getElementById("dash-tasks-doing").innerText = emAndamento;
  document.getElementById("dash-tasks-todo").innerText = aFazer;

  atualizarGrafico(concluidas, emAndamento, aFazer);

  return { total, concluidas, emAndamento, aFazer };
}

// Atualiza o gráfico circular com os totais calculados.
function atualizarGrafico(concluidas, emAndamento, aFazer) {
  const total = concluidas + emAndamento + aFazer;
  const grafico = document.getElementById("grafico-tarefas");
  if (!grafico || total === 0) return;

  const pConcluidas = (concluidas / total) * 100;
  const pEmAndamento = (emAndamento / total) * 100;

  const limite1 = pConcluidas;
  const limite2 = limite1 + pEmAndamento;

  grafico.style.background = `conic-gradient(
    #c60505 0% ${limite1}%,
    #686262 ${limite1}% ${limite2}%,
    #c8c9c7 ${limite2}% 100%
  )`;

  document.getElementById("legenda-feitas").innerHTML = `<span style="background:#c60505"></span> Feitas — ${Math.round(pConcluidas)}%`;
  document.getElementById("legenda-fazendo").innerHTML = `<span style="background:#686262"></span> Fazendo — ${Math.round(pEmAndamento)}%`;
  document.getElementById("legenda-afazer").innerHTML = `<span style="background:#c8c9c7"></span> A Fazer — ${Math.round(100 - limite2)}%`;
}

// Mostra a distribuição no Kanban.
function preencherPrioridades(tarefas, atrasadas) {
  let alta = 0;
  let media = 0;

  tarefas.forEach(tarefa => {
    const prioridade = (tarefa.priority || "").toLowerCase();
    if (prioridade === "alta") alta += 1;
    else if (prioridade === "média" || prioridade === "media") media += 1;
  });

  // Só atualiza se o ID ainda existir no seu HTML
  const atrasadasEl = document.getElementById("prio-atrasadas-val");
  if (atrasadasEl) atrasadasEl.innerText = atrasadas;

  const altaEl = document.getElementById("prio-alta-val");
  if (altaEl) altaEl.innerText = alta;
  
  const mediaEl = document.getElementById("prio-media-val");
  if (mediaEl) mediaEl.innerText = media;
}

// Renderiza os membros da equipe.
function preencherMembros(membros) {
  const container = document.getElementById("team-members-list");
  if (!container) return;

  if (membros.length === 0) {
    container.innerHTML = `<p class="text-sm text-gray-400">Nenhum membro encontrado.</p>`;
    return;
  }

  container.innerHTML = membros.map(membro => `
    <div class="bg-[#222] rounded-lg p-3 text-sm text-gray-200">
      ${membro}
    </div>
  `).join("");
}

// Liga o botão da IA com o resumo gerado.
function configurarBotaoIA(dadosParaIA) {
  const btn = document.getElementById("ai-btn");
  const output = document.getElementById("ai-output");
  const status = document.getElementById("ai-status");

  if (!btn) return;

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.innerText = "Analisando...";
    status.innerText = "Enviando dados para o Groq...";
    output.innerText = "Aguarde...";

    try {
      const resumo = await analisarProjeto(dadosParaIA);
      output.innerText = resumo;
      status.innerText = "Análise concluída.";
    } catch (erro) {
      console.error(erro);
      output.innerText = "Não foi possível gerar a análise. Verifique sua chave do Groq no config-local.js.";
      status.innerText = "Erro na análise.";
    }

    btn.disabled = false;
    btn.innerText = "Analisar novamente";
  });
}
// Lógica da segunda tela

// Pega o id do projeto pela URL.
function obterIdProjeto() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || 1;
}

// Monta a lista de membros com base nas tarefas.
function extrairMembros(tarefas) {
  const membros = {};
  tarefas.forEach(tarefa => {
    if (tarefa.assignee && typeof tarefa.assignee === "string") {
      membros[tarefa.assignee.trim()] = true;
    }
  });
  return Object.keys(membros);
}

// Conta tarefas atrasadas usando a data de entrega.
function contarAtrasadas(tarefas) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return tarefas.filter(tarefa => {
    if (!tarefa.dueDate) return false;

    // Compara a data sem considerar o horário
    const partes = tarefa.dueDate.split("-");
    const vencimento = new Date(partes[0], partes[1] - 1, partes[2]);

    const concluida = (tarefa.status || "").toLowerCase().includes("conclu");
    return !concluida && vencimento < hoje;
  });
}

// Conta quantas tarefas estão com prioridade alta.
function contarAltaPrioridade(tarefas) {
  return tarefas.filter(t => (t.priority || "").toLowerCase() === "alta").length;
}

// Preenche o resumo principal do projeto.
function preencherStatusProjeto(projeto) {
  document.getElementById("proj-nome").innerText = projeto.name || "—";
  document.getElementById("header-proj-nome").innerText = projeto.name || "Projeto";
  document.getElementById("proj-status").innerText = projeto.status || "—";
  document.getElementById("proj-cliente").innerText = projeto.client || "—";
  document.getElementById("proj-owner").innerText = projeto.owner || "—";
  document.getElementById("proj-deadline").innerText = projeto.dueDate || "—";
  document.getElementById("proj-priority").innerText = projeto.priority || "—";

  const progresso = projeto.progress || 0;
  document.getElementById("proj-progress-text").innerText = progresso + "%";
  document.getElementById("proj-progress-bar").style.width = progresso + "%";
}

// Soma as tarefas por status e atualiza os cards.
function preencherTarefas(tarefas) {
  let concluidas = 0;
  let emAndamento = 0;
  let aFazer = 0;

  tarefas.forEach(tarefa => {
    const status = (tarefa.status || "").toLowerCase();

    if (status.includes("conclu")) {
      concluidas += 1;
    } else if (status.includes("andamento") || status.includes("revis")) {
      emAndamento += 1;
    } else if (status.includes("fazer")) {
      aFazer += 1;
    }
  });

  const total = tarefas.length;

  document.getElementById("dash-total-tasks").innerText = total;
  document.getElementById("dash-tasks-done").innerText = concluidas;
  document.getElementById("dash-tasks-doing").innerText = emAndamento;
  document.getElementById("dash-tasks-todo").innerText = aFazer;

  atualizarGrafico(concluidas, emAndamento, aFazer);

  return { total, concluidas, emAndamento, aFazer };
}

// Atualiza o gráfico circular com os totais calculados.
function atualizarGrafico(concluidas, emAndamento, aFazer) {
  const total = concluidas + emAndamento + aFazer;
  const grafico = document.getElementById("grafico-tarefas");
  if (!grafico || total === 0) return;

  const pConcluidas = (concluidas / total) * 100;
  const pEmAndamento = (emAndamento / total) * 100;

  const limite1 = pConcluidas;
  const limite2 = limite1 + pEmAndamento;

  grafico.style.background = `conic-gradient(
    #c60505 0% ${limite1}%,
    #686262 ${limite1}% ${limite2}%,
    #c8c9c7 ${limite2}% 100%
  )`;

  document.getElementById("legenda-feitas").innerHTML = `<span style="background:#c60505"></span> Feitas — ${Math.round(pConcluidas)}%`;
  document.getElementById("legenda-fazendo").innerHTML = `<span style="background:#686262"></span> Fazendo — ${Math.round(pEmAndamento)}%`;
  document.getElementById("legenda-afazer").innerHTML = `<span style="background:#c8c9c7"></span> A Fazer — ${Math.round(100 - limite2)}%`;
}

// Mostra a distribuição no Kanban.
function preencherPrioridades(tarefas, atrasadas) {
  let alta = 0;
  let media = 0;

  tarefas.forEach(tarefa => {
    const prioridade = (tarefa.priority || "").toLowerCase();
    if (prioridade === "alta") alta += 1;
    else if (prioridade === "média" || prioridade === "media") media += 1;
  });

  // Só atualiza se o ID ainda existir no seu HTML
  const atrasadasEl = document.getElementById("prio-atrasadas-val");
  if (atrasadasEl) atrasadasEl.innerText = atrasadas;

  const altaEl = document.getElementById("prio-alta-val");
  if (altaEl) altaEl.innerText = alta;
  
  const mediaEl = document.getElementById("prio-media-val");
  if (mediaEl) mediaEl.innerText = media;
}

// Renderiza os membros da equipe.
function preencherMembros(membros) {
  const container = document.getElementById("team-members-list");
  if (!container) return;

  if (membros.length === 0) {
    container.innerHTML = `<p class="text-sm text-gray-400">Nenhum membro encontrado.</p>`;
    return;
  }

  container.innerHTML = membros.map(membro => `
    <div class="bg-[#222] rounded-lg p-3 text-sm text-gray-200">
      ${membro}
    </div>
  `).join("");
}

// Liga o botão da IA com o resumo gerado.
function configurarBotaoIA(dadosParaIA) {
  const btn = document.getElementById("ai-btn");
  const output = document.getElementById("ai-output");
  const status = document.getElementById("ai-status");

  if (!btn) return;

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.innerText = "Analisando...";
    status.innerText = "Enviando dados para o Groq...";
    output.innerText = "Aguarde...";

    try {
      const resumo = await analisarProjeto(dadosParaIA);
      output.innerText = resumo;
      status.innerText = "Análise concluída.";
    } catch (erro) {
      console.error(erro);
      output.innerText = "Não foi possível gerar a análise. Verifique sua chave do Groq no config-local.js.";
      status.innerText = "Erro na análise.";
    }

    btn.disabled = false;
    btn.innerText = "Analisar novamente";
  });
}

// Carrega os dados do projeto e monta a tela.
async function inicializar() {
  const id = obterIdProjeto();

  try {
    const [projeto, tarefas] = await Promise.all([
      buscarProjeto(id),
      buscarTarefas(id)
    ]);

    preencherStatusProjeto(projeto);
    const contagens = preencherTarefas(tarefas);

    const atrasadas = contarAtrasadas(tarefas).length;
    const altaPrioridade = contarAltaPrioridade(tarefas);
    
    // Agora o código não vai mais travar aqui!
    preencherPrioridades(tarefas, atrasadas);

    const membros = extrairMembros(tarefas);
    preencherMembros(membros);

    const dadosParaIA = {
      nome: projeto.name || "Projeto",
      status: projeto.status || "—",
      progresso: projeto.progress || 0,
      totalTarefas: contagens.total,
      concluidas: contagens.concluidas,
      emAndamento: contagens.emAndamento,
      aFazer: contagens.aFazer,
      atrasadas,
      altaPrioridade,
      membros
    };

    configurarBotaoIA(dadosParaIA);

  } catch (erro) {
    console.error("Erro ao carregar dashboard:", erro);
  }
}

function configurarArrastarSoltar() {
  const cartoes = document.querySelectorAll('[draggable="true"]');
  const zonasDrop = document.querySelectorAll('.zona-drop');


  cartoes.forEach(cartao => {
    cartao.addEventListener('dragstart', () => {
      cartao.classList.add('arrastando');
      cartao.style.opacity = '0.5';
    });

    cartao.addEventListener('dragend', () => {
      cartao.classList.remove('arrastando');
      cartao.style.opacity = '1';
    });
  });


  zonasDrop.forEach(zona => {
    zona.addEventListener('dragover', (evento) => {
      evento.preventDefault(); 
      const cartaoArrastado = document.querySelector('.arrastando');
      if (cartaoArrastado) {
        zona.appendChild(cartaoArrastado);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", inicializar);

// Carrega os dados do projeto e monta a tela.
async function inicializar() {
  const id = obterIdProjeto();

  try {
    const [projeto, tarefas] = await Promise.all([
      buscarProjeto(id),
      buscarTarefas(id)
    ]);

    preencherStatusProjeto(projeto);
    const contagens = preencherTarefas(tarefas);

    const atrasadas = contarAtrasadas(tarefas).length;
    const altaPrioridade = contarAltaPrioridade(tarefas);
    
    // Agora o código não vai mais travar aqui!
    preencherPrioridades(tarefas, atrasadas);

    const membros = extrairMembros(tarefas);
    preencherMembros(membros);

    const dadosParaIA = {
      nome: projeto.name || "Projeto",
      status: projeto.status || "—",
      progresso: projeto.progress || 0,
      totalTarefas: contagens.total,
      concluidas: contagens.concluidas,
      emAndamento: contagens.emAndamento,
      aFazer: contagens.aFazer,
      atrasadas,
      altaPrioridade,
      membros
    };

    configurarBotaoIA(dadosParaIA);
    configurarArrastarSoltar();

  } catch (erro) {
    console.error("Erro ao carregar dashboard:", erro);
  }
}


document.addEventListener("DOMContentLoaded", inicializar);