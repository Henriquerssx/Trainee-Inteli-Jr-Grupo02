// Monta e envia o resumo para a Groq

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.1-8b-instant";

// Lê a chave local sem quebrar se o arquivo estiver vazio
function obterChaveGroq() {
  if (typeof GROQ_KEY !== "undefined") return GROQ_KEY;
  return "";
}

// Junta os dados do projeto em um texto curto para a IA
function montarPrompt(dados) {
  return `Você é um assistente de gestão de projetos. Analise os dados abaixo e escreva um resumo executivo em português, de 3 a 5 linhas. Seja direto e aponte problemas reais se houver. Não use asteriscos nem markdown.

Dados do projeto:
- Nome: ${dados.nome}
- Status: ${dados.status}
- Progresso: ${dados.progresso}%
- Total de tarefas: ${dados.totalTarefas}
- Concluídas: ${dados.concluidas}
- Em andamento: ${dados.emAndamento}
- A fazer: ${dados.aFazer}
- Atrasadas: ${dados.atrasadas}
- Alta prioridade: ${dados.altaPrioridade}
- Membros da equipe: ${dados.membros.join(", ")}`;
}

// Faz a chamada para a Groq
async function chamarGroq(prompt) {
  const chave = obterChaveGroq();

  if (!chave) {
    throw new Error("Chave do Groq não configurada. Crie o arquivo config-local.js com a sua chave.");
  }

  const resposta = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + chave
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!resposta.ok) {
    throw new Error("Erro ao chamar o Groq: " + resposta.status);
  }

  const dados = await resposta.json();
  return dados.choices[0].message.content.trim();
}

async function analisarProjeto(dados) {
  const prompt = montarPrompt(dados);
  return chamarGroq(prompt);
}