🚀 ZenFlow Dashboard

Bem-vindo ao ZenFlow Dashboard, uma aplicação web de página única (SPA) projetada para criar um santuário digital de foco e produtividade. Esta ferramenta ajuda os usuários a se concentrarem em suas tarefas através de um ambiente personalizável e ferramentas de produtividade integradas.

**➡️ [Acesse o site ao vivo aqui!](https://vipato.github.io/zenflow-dashboard/)**



✨ Funcionalidades Atuais

*   Timer Pomodoro Personalizável:** Um timer de foco visual que alterna entre períodos de trabalho e descanso, com durações que podem ser definidas pelo usuário.
*   Lista de Foco da Sessão:** Uma lista de tarefas volátil para que o usuário possa definir metas para a sessão de foco atual.
*   Bloco de Notas "Brain Dump" com Organização Simulada:** Um espaço para anotações rápidas que salva o conteúdo no `localStorage`. Inclui uma função "Organizar" que, no momento, utiliza respostas predefinidas para simular a organização do texto por uma IA, demonstrando a funcionalidade da UI sem a necessidade de uma chave de API.
*   Histórico de Sessões: O aplicativo registra cada ciclo de Pomodoro concluído, permitindo que o usuário visualize seu progresso.
*   Internacionalização (i18n): Suporte completo para os idiomas Português e Inglês, com um seletor de fácil acesso.
*   Atalhos de Teclado: Controles rápidos (`Espaço` para Iniciar/Pausar, `R` para Resetar) para uma experiência de usuário mais fluida.

 🛠️ Tecnologias e Arquitetura

Este projeto foi construído do zero com foco em tecnologias web modernas e boas práticas de desenvolvimento front-end.

*   Framework Front-End: React com TypeScript para um desenvolvimento robusto, tipado e escalável.
*   Build Tool: Vite para um ambiente de desenvolvimento extremamente rápido e um processo de build otimizado para produção.
*   Estilização: TailwindCSS para uma prototipagem rápida e um sistema de design baseado em utilitários, garantindo consistência visual.
*   Gerenciamento de Estado: Combinação de useState, useContext (para o estado de internacionalização) e localStorage para persistir as preferências do usuário e os dados da aplicação.
*   Responsividade: O design é totalmente responsivo, adaptando-se a telas de desktop, tablets e dispositivos móveis usando as diretrizes do TailwindCSS.

 ⚙️ Deploy e Automação (CI/CD)

A aplicação é implantada automaticamente no **GitHub Pages**, demonstrando um pipeline de CI/CD (Continuous Integration/Continuous Deployment) simples e eficaz.

*   Build: O comando `npm run build` utiliza o Vite para compilar o código React/TypeScript em arquivos estáticos otimizados (HTML, CSS, JS).
*   Deploy: O pacote `gh-pages` é utilizado para automatizar o processo de envio da pasta de build (`dist`) para uma branch `gh-pages` dedicada no repositório.
*   Fluxo: Qualquer nova alteração enviada para a branch `main` pode ser rapidamente implantada no site ao vivo executando um único comando: `npm run deploy`.

  roadmap do Projeto (Planos Futuros)

Este projeto foi projetado com a escalabilidade em mente. Os próximos passos planejados incluem:

*   Integração com IA Real: Substituir a organização de texto simulada por uma integração real com a API do Gemini ou outra LLM.
*   Player de Música Integrado: Adicionar um widget de player de música com uma seleção de faixas Lo-fi para aprimorar o ambiente de foco.
*   Autenticação de Usuário: Implementar um sistema de login (via Firebase Auth) para permitir que os usuários salvem suas configurações e históricos em diferentes dispositivos.
