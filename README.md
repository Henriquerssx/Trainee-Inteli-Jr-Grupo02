## Trainee Inteli JR Grupo 02

## Sobre o Projeto

Desenvolvido como parte do programa Trainee da Inteli JR, o Gerenciador de Projetos é uma plataforma focada em organização e produtividade. Nosso principal objetivo é facilitar o acompanhamento diário das atividades da IJ por meio de um dashboard completo, oferecendo uma visão clara, centralizada e visual do andamento das tarefas.

**Principais Funcionalidades:**
* Relatório de IA.
* Navegação entre tela inicial (vitrine de projetos) e dashboard específico.
* Filtragem de visualização de projetos prontos, em desenvolvimento e em revisão.
  
# Estrutura do Sistema

## Organização do Projeto

Descreva abaixo como o projeto está estruturado tanto fisicamente (pastas e arquivos) quanto logicamente (arquitetura e navegação/API).

### Árvore de Arquivos

```bash
Trainee-Inteli-Jr-Grupo02
┣ nome-da-pasta-1        # 
┣ nome-da-pasta-2        # 
┣ nome-da-pasta-3        # 
┣ arquivo-principal.js   # 
┗ README.md
```

---

## Decisões Técnicas

| Tecnologia / Ferramenta | Finalidade no Projeto                       | Por que foi escolhida?                                                  |
| ----------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| Tailwind CSS (via CDN) | Estilização rápida e responsiva do dashboard secundário | Permite criar a interface do dashboard com utilitários prontos sem precisar de configuração de build. |
| HTML5 + CSS customizado | Estrutura e identidade visual da tela inicial | Garante controle total sobre o layout e o visual da página inicial sem uso de frameworks CSS. |
| JavaScript vanilla + Fetch API | Listar e filtrar projetos dinamicamente | Mantém a aplicação leve e facilita o consumo da API com lógica simples de navegação e filtro. |
| LocalStorage | Salvar previews de imagens de projetos no browser | Permite persistir imagens de visualização entre sessões sem precisar de backend adicional. |
| Groq / OpenAI style API | Gerar resumo executivo em linguagem natural | Oferece análise de IA integrada ao dashboard usando chamadas HTTP simples e chave local de configuração. |

---

## Uso de Inteligência Artificial

**Utilizou IA no projeto?** Sim, apenas como assistente pontual. Optamos por construir a aplicação do zero, valorizando o esforço intelectual e a lógica autoral da equipe. Acreditamos que essa entrega se tratava do quanto estávamos dispostos a criar e aprender, e não em gerar um projeto com muitos artifícios de IA.

| Ferramenta de IA | Ocasião / Finalidade             | Como foi utilizada?                                               |
| ---------------- | -------------------------------- | ----------------------------------------------------------------- |
| preencher        | preencher                        | preencher   |
| preencher        | preencher                        | preencher   |

---

## Divisão de Responsabilidades

### Scrum Master

**Nome:** Pietra Feitoza

**Atuação e Responsabilidades:**

* Mediou e organizou reuniões de alinhamento
* Acompanhou o andamento das tarefas da equipe
* Garantiu a atualização das tarefas no Kanban 
* Responsável pela entrega da documentação

---

## Atuação dos Membros

| Nome           | Papel / Foco             | Entregas Realizadas |
| -------------- | ------------------------ | ------------------- |
| José           | Desenvolvedor Front-end   | Responsável por testar os endpoints e repassar para a equipe, além de desenvolver o código da segunda tela. |
| Lucas Delmiro  | Integração com IA        | Responsável por estudar e implementar a integração com IA no projeto, realizando testes iniciais e a implementando. |
| Pablo Marchina | Desenvolvedor Front-end  | Responsável por desenvolver a programação da tela inicial do projeto, criando a base para aprimoramento. |
| Mariana Moussa | Desenvolvedora Front-end | Responsável por iniciar a programação da segunda tela do projeto, adicionando os elementos essenciais. |
| Vitor Tadashi  | Desenvolvedor Front-end  | Responsável por iniciar o conceito da segunda tela do projeto, propondo ideias e contribuindo para o desenvolvimento conjunto. |
| Pietra Feitoza | Scrum Master / Front-end | Auxílio no desenvolvimento front-end, principalmente no concept inicial e desenvolvimento da primeira tela, refinamento de UX das duas telas e preenchimento da documentação. |

Como um protótipo desenvolvido em apenas uma semana, acreditamos que há margem para melhoria do projeto. Por isso, incluímos uma seção para explicar o que pode ser implementado no site, visando evoluir a aplicação e agregar ainda mais valor à gestão da IJ.

Aqui estão algumas das melhorias e novas funcionalidades mapeadas para o futuro da plataforma:

* **Sistema de Autenticação e Perfis:** Implementar login seguro e diferentes níveis de permissão (ex: Diretores, Gerentes e Membros), garantindo que cada usuário veja apenas as informações relevantes para o seu cargo.
* **Notificações e Alertas:** Criar um sistema de avisos para alertar sobre prazos próximos do vencimento ou tarefas atrasadas.
* **Calendário do time:** Permitir que os Scrums vejam um calendário com datas de entrega de tarefas e projeto, para um melhor acompanhamento.
* **Melhoria de UI/UX:** Refinar a interface com base nos feedbacks contínuos dos stakeholders (Inteli JR), garantindo uma experiência de uso cada vez mais intuitiva e perfeitamente alinhada às necessidades reais da equipe.


