# Documentação Individual — Dashboard (Lista de Projetos)

## Componente desenvolvido

Interface central para visualização e gestão dos projetos da equipe. O componente exibe os projetos em grid de cards, com informações de status, responsável e progresso de cada um. Permite busca por nome, filtragem por status e adição ou remoção de projetos.

O componente serviu de estrutura base para o desenvolvimento do grupo da primeira tela, a dashboard.

---
## Wireframe

O wireframe foi desenvolvido no Figma e representa a estrutura inicial da dashboard antes da implementação.

A interface é composta por:
- Barra de navegação, links de navegação (Dashboard, Kanban, Projetos, Adicionar Novo Projeto, Relatório da Sprint Geral) e botões de ação.
- Contador de projetos ativos e botões "Exportar Relatório" e "+ Nova Tarefa".
- Grid de cards de projeto em 3 colunas com: badge de status colorido, indicador de prioridade, nome da empresa cliente, título do projeto, descrição resumida, barra de progresso com cor por status, numerado do responsável e data de entrega.
- Card de ação "+ Adicionar Projeto" como último item do grid
- Link "Ver todos" para navegação da lista completa

A escolha do tema e da tipografia Fragment Mono segue a identidade visual da Inteli Junior, foi pensada em garantir que o componente individual se integre ao o do grupo sem conflito de estilos.

---

## Processo de desenvolvimento

O wireframe inicial projetado no Figma serviu como referência para a implementação. Alguns elementos foram adaptados durante o desenvolvimento a barra de progresso, por exemplo, foi mantida no card individualmente mas realocada para a tela de informações do projeto na entrega em grupo, que tem escopo mais adequado para dados de detalhe.

Outro membro do grupo também havia desenvolvido um wireframe para a mesma tela. Após comparação entre as duas propostas, o grupo optou pelo wireframe do colega como guia principal para a implementação, por apresentar uma distribuição de cards mais clara e uma hierarquia visual mais bem resolvida.

O componente foi construído em HTML, CSS e JavaScript. O desenvolvimento foi feito pelos seguintes passos primeiro a estrutura, depois a estilização, e por último a lógica de renderização.

A partir disso, o desenvolvimento passou a ser guiado pelos feedbacks do grupo. As diferenças entre o meu wireframe original e a tela atual, foram decisões tomadas coletivamente. Isso garantiu que o componente individual se alinhasse diretamente ao que seria usado na entrega em grupo, sem necessidade de refatoração.

O desenvolvimento foi acompanhado pelo grupo pois o componente seria usado como estrutura base para o projeto do grupo, então o foco foi fazer os elementos na tela funcionarem de forma simples.

---

## Relação com a entrega em grupo

Este componente serve como a dashboard no projeto. Na integração com o grupo:

- Os dados mockados são substituídos por chamadas reais a `GET /projects` via `api.js`
- O campo `progresso` foi passado para outra tela
- Subistituição do campo `owner` para `client`
- A adição via `prompt()` é substituída por um modal estilizado com `POST /tasks`
- Foi integrada com a segunda tela, onde clicando no card o usuário navega para a tela de informações do projeto. 

---

## Decisões técnicas

- **Separação entre `renderizar()` e `filtrar()`** — a lógica de filtragem e a lógica de exibição foram separadas em funções distintas. `filtrar()` calcula a lista resultante e `renderizar()` só exibe o que recebe, evitando duplicação de código.

- **id único por projeto** — uso de `Date.now()` para projetos adicionados em runtime, resolvendo o bug onde o índice do `forEach` apontava para o projeto errado quando o filtro estava ativo.

- **CSS Custom Properties (`--card-accent`)** — a cor de acento do card é definida pelo JS via `setProperty()` e consumida no CSS via `var()`, centralizando o mapeamento `status para cor` em um único lugar no código.

- **Filtros combinados em uma única passagem** — busca por nome e filtro por status operam no mesmo `.filter()`, produzindo uma única lista entregue para `renderizar()`.

---

## Ferramentas de IA utilizadas

- **Claude e ChatGpt** utilizados de maneiras diferentes durante o desenvolvimento individual:
  1. **Revisão de bugs** - Identificação de bugs e recomendações, como por exemplo a solução via id único.
  2. **Resposta de dúvidas** - Dúvidas de como estrutuar certas partes, principalmente a parte de css que eu não possuia muita experiência, foram respondidas pela IA.
  3. **Desenvolvimento inicial da programação** - Partes mais simples, como o html, tiveram o desenvolvimento acelerado pela IA.

O entendimento do código é claro. A IA foi usada somente como ferramenta de revisão e aceleração, não como substituta do raciocínio técnico.

---

## Dependências do componente

| Dependência | Tipo | Contexto |
|---|---|---|
| `style.css` | CSS externo | Estilização do layout, cards, badges e barra de progresso |
| `logo.png` | Asset | Logotipo da Inteli Júnior na barra de navegação |
| Fragment Mono | Google Fonts (CDN) | Tipografia monospace da interface |