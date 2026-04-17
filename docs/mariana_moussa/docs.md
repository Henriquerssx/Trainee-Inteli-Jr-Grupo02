# Documentação Individual

## Componente desenvolvido
Dashboard de acompanhamento de projetos — permite visualizar o progresso geral do projeto, a distribuição de tarefas por status e prioridade, o índice de desempenho de prazo (SPI) e os membros da equipe.

---

## Wireframe

Antes de escrever qualquer linha de código, elaborei um wireframe no Figma para estruturar o layout do dashboard e definir quais informações deveriam estar presentes e como se relacionariam visualmente:

![Wireframe inicial](image.png)

O wireframe desenvolvido contempla:
- cabeçalho com o título "Dashboard", um indicador de status geral e a identificação do projeto;
- painel de tarefas com total e tarefas concluídas;
- bloco de status com espaço para indicadores visuais e barra de progressão;
- caixas dedicadas para Cliente, Prioridade e Prazo;
- área de distribuição de tarefas com métricas de Feitas, Fazendo e A Fazer;
- painel de Equipe com lista de membros;
- indicador de progresso e bloco de informações adicionais;
- barra de "Última atualização" na base da tela.

Esse wireframe foi elaborado de forma independente antes de qualquer referência externa, e representa as decisões iniciais sobre hierarquia de informação, agrupamento de cards e fluxo de leitura da tela.

Durante o processo, ao comparar minha proposta com o wireframe desenvolvido pelo Vitor — que apresentava uma distribuição de cards mais clara e uma hierarquia visual mais bem resolvida — tomei uma decisão estratégica: em vez de implementar o meu wireframe do zero, optei por usar o dele como referência visual para a implementação em HTML. Entendi que a entrega individual seria mais valiosa se o código produzido pudesse ser aproveitado diretamente na entrega em grupo, sem necessidade de refatoração. A prioridade foi a produtividade coletiva.


![Imagem final](imagemfinal.png)

A versão implementada mantém o tema escuro e organiza os cards em um grid de três colunas, com os seguintes componentes:
- cabeçalho com o título do projeto, identificação do grupo (Grupo 2 – Trainee – Inteli Jr.) e badge de status;
- card de Total de tarefas com subcards para Feitas, Fazendo e A Fazer, cada um com seu contador;
- card de Distribuição de tarefas com área reservada para gráfico (ApexCharts);
- card de Índice de Desempenho de Prazo (SPI) com área reservada para gráfico;
- card de Status do projeto com barra de Progresso geral e campos de Cliente, Responsável, Prazo e Prioridade;
- card de Tarefas por prioridade com destaques para Atrasadas e Alta prioridade, além de barras de progresso para Alta, Média e Baixa;
- card de Membros da equipe com lista de cinco integrantes.

---

## Processo de desenvolvimento

Com a referência visual definida, assumi integralmente a responsabilidade pela implementação: estruturei o HTML, defini a hierarquia dos elementos, escolhi as bibliotecas, organizei o grid de três colunas e tomei todas as decisões de código de forma independente.

Durante a execução, usei o Claude pontualmente como apoio técnico — para entender quais bibliotecas fariam mais sentido para o tipo de interface proposta (chegando ao Tailwind CSS pela agilidade e ao ApexCharts pela compatibilidade com tema escuro), e para tirar dúvidas pontuais enquanto montava os cards, como ajustar espaçamentos e entender classes específicas do Tailwind.

A IA funcionou como suporte técnico, não como guia criativo. As decisões de estrutura, organização e hierarquia de conteúdo foram feitas de forma independente.

---

## Relação com a entrega em grupo

A decisão de implementar com base no wireframe do Vitor foi intencional e orientada à entrega em grupo: o objetivo era que o código produzido individualmente pudesse ser aproveitado diretamente como base do dashboard da tela do projeto, sem necessidade de refatoração.

O arquivo `index.html` foi estruturado pensando nisso — com espaços reservados para integração com a API, comentários indicando cada seção e as bibliotecas já importadas, de modo que a base pudesse ser aproveitada no fluxo coletivo com o mínimo de atrito.

---

## Ferramentas de IA utilizadas

- **Claude (Anthropic)** — suporte técnico para dúvidas sobre Tailwind, escolha de bibliotecas e ajustes pontuais de estrutura HTML. Não foi utilizado para decisões criativas ou de layout.

---

## Decisões técnicas

- **Tailwind CSS via CDN** — escolhido pela agilidade no desenvolvimento, sem necessidade de instalação ou build;
- **ApexCharts via CDN** — escolhido pela facilidade de integração com JavaScript puro e boa compatibilidade com tema escuro. As áreas de gráfico estão reservadas no HTML; a implementação foi planejada para a etapa de integração em grupo;
- **arquivo único `index.html`** — para simplicidade na entrega individual, com espaços reservados para futura integração com a API.

---

## Dependências do componente

Para funcionar de forma completa na entrega em grupo, o componente depende de:
- dados da API: total de tarefas, distribuição por status, prioridades, SPI e lista de membros;
- integração via `fetch()` nos pontos marcados com `—` no HTML.