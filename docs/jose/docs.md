# Documentação Individual

### Componente desenvolvido

**Dashboard de acompanhamento de projetos** — Uma interface centralizada para visão geral de projetos, métricas de produtividade e gestão de membros. O componente apresenta estatísticas específicas de tecnologias, como Java e Spring Boot, além de um gráfico de atividade semanal.

### Wireframe

Desenvolvi este dashboard tendo como referência o site da própria Inteli Júnior, visando um filtro de busca inteligente e insights em projetos com a stack. A estrutura foi projetada para alinhar a experiência do usuário aos padrões visuais da instituição e permitir uma visualização rápida do volume e do status de projetos segmentados por tecnologia.

### Processo de desenvolvimento

Com a referência visual criada no figma, transformei a estrutura em código utilizando HTML e CSS. A interface foi construída do zero, focando em um layout moderno com tema escuro (*dark mode*).

Durante o desenvolvimento, utilizei IA como suporte técnico para otimizar a organização do *CSS Grid* e do *Flexbox*, garantindo que os cards de estatísticas e a barra lateral fossem posicionados corretamente. A IA auxiliou em duvidas na criação de elementos SVG e espaçamentos internos para garantir uma interface limpa.

### Relação com a entrega em grupo

Este componente serve como a base visual e estrutural para o projeto do grupo. O código foi organizado de maneira semântica no `index.html`, com classes de estilo bem definidas no `style.css`, facilitando a futura integração com scripts de busca e o consumo de dados de uma API.

### Ferramentas de IA utilizadas

* **Claude / Gemini** — Atuaram como suporte técnico para ajustes de CSS e auxílio na criação da estrutura visual do gráfico de barras.

### Decisões técnicas

* **HTML e CSS** — Opção pela simplicidade e total controle sobre a estilização, sem dependência de frameworks externos nesta fase.
* **CSS Grid** — Utilizado para a `gradeEstatisticas` e para a divisão principal do dashboard (`linhaInferior`).
* **Flexbox** — Aplicado na barra superior de busca, nos filtros e nos itens da barra lateral para garantir alinhamento vertical e horizontal.
* **Ícones SVG Inline** — Inseridos diretamente no HTML para permitir a customização de cores via CSS e garantir carregamento instantâneo.

### Dependências do componente

Para a integração final na entrega em grupo, o componente precisará de:
* **Integração com API**: Substituição dos dados estáticos por dados reais.
* **Lógica de Filtro**: Implementação de JavaScript para que o "filtro de busca inteligente" processe as entradas do usuário e atualize a lista de projetos.
* **Dinamicidade no Gráfico**: Conexão das barras de atividade com o histórico real de commits ou entregas dos projetos.