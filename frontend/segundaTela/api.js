// Funções de acesso à API

const API_BASE = "https://trainee-projetos-api.vercel.app";
const TOKEN = "equipe-alpha-2026";

async function buscarDadosApi(rota) {
  const resposta = await fetch(API_BASE + rota, {
    headers: { "x-team-token": TOKEN }
  });

  if (!resposta.ok) {
    throw new Error("Erro na API (" + resposta.status + ") ao acessar " + rota);
  }

  return resposta.json();
}

async function buscarProjetos() {
  return buscarDadosApi("/projects");
}

async function buscarProjeto(id) {
  return buscarDadosApi("/projects/" + id);
}

async function buscarDashboard(idProjeto) {
  return buscarDadosApi("/dashboard?projectId=" + idProjeto);
}

async function buscarTarefas(idProjeto) {
  return buscarDadosApi("/tasks?projectId=" + idProjeto);
}