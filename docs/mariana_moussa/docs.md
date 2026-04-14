# Documentação Individual

## Componente desenvolvido
Dashboard de acompanhamento de projetos — visão geral de tarefas, status, prioridades, SPI e membros da equipe.

---

## Wireframe
Elaborei um wireframe inicial no Figma para estruturar o layout do dashboard antes de partir para o código:

Durante o processo, percebi que o wireframe que eu tinha desenhado não traduzia tão bem a experiência que eu queria passar — o visual ficou confuso e a distribuição dos cards não estava clara o suficiente. Em paralelo, o Vitor havia desenvolvido um wireframe com uma abordagem mais limpa e bem resolvida, então o grupo decidiu em conjunto adotar a referência dele como base para a entrega em grupo.

---

## Processo de desenvolvimento

Com o wireframe do Vitor como referência, comecei a transformar estrutura em código HTML. A ideia era já construir o componente individual de forma que ele pudesse ser diretamente aproveitado na entrega em grupo.

Durante o desenvolvimento, usei o Claude pontualmente como apoio técnico: para entender quais bibliotecas fariam mais sentido para o tipo de interface proposta, chegando ao Tailwind CSS pela praticidade e ao ApexCharts para os gráficos. Também usei para tirar dúvidas enquanto montava os cards, como ajustar espaçamentos, entender classes do Tailwind e organizar o grid de três colunas.

A estrutura e as decisões de layout já tinham uma base definida antes, a IA funcionou mais como suporte técnico do que como guia criativo.

---

## Relação com a entrega em grupo

O componente desenvolvido aqui é a base direta do que o grupo irá utilizar. O arquivo `index.html` já está estruturado com os espaços reservados para integração com a API, comentários indicando cada seção e as bibliotecas. A ideia é que a entrega em grupo parta exatamente deste código, adicionando as demais telas, a navegação e o consumo real dos dados.

---

## Ferramentas de IA utilizadas
- Claude (Anthropic) — usada como suporte técnico para dúvidas sobre Tailwind, escolha de bibliotecas e ajustes de estrutura HTML.
---

## Decisões técnicas
- **Tailwind CSS via CDN** — escolhido pela agilidade no desenvolvimento, sem necessidade de instalação ou build
- **ApexCharts via CDN** — escolhido pela facilidade de integração com JavaScript puro e boa compatibilidade com tema escuro
- Arquivo único `index.html` para simplicidade na entrega individual, com espaços reservados para futura integração com a API

---

## Dependências do componente
Para funcionar de forma completa na entrega em grupo, o componente depende de:
- Dados da API: total de tarefas, distribuição por status, prioridades, SPI e lista de membros
- Integração via `fetch()` nos pontos marcados com `—` no HTML