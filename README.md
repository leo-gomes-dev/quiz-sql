# Simulado Acadêmico Interativo: SQL Injection

Este projeto é um **Quiz/Simulado Interativo** desenvolvido com foco em segurança da informação, abordando conceitos teóricos e práticos sobre a vulnerabilidade de **SQL Injection (Injeção de SQL)**.

O objetivo deste repositório é servir como um laboratório de estudos para fixação do conteúdo antes das avaliações e como um ambiente prático para exercitar o fluxo de colaboração profissional no Git e GitHub (via *Branches*, *Pull Requests* e *Code Review*).

---

## Tecnologias Utilizadas
O projeto foi construído utilizando desenvolvimento web padrão (focado na legibilidade e simplicidade para estudantes):
- **HTML5:** Estrutura semântica para os cards de perguntas e respostas.
- **CSS3:** Estilização limpa, moderna, responsiva e com feedback visual dinâmico de erros/acertos.
- **JavaScript (Vanilla):** Lógica nativa de validação, contagem de pontuação e revelação do gabarito com explicações técnicas.

---

## Guia de Colaboração (Para Alunos e Colegas)

Para garantir que todos pontuem em **Pull Requests** e **Code Review** no perfil do GitHub, siga estritamente o fluxo abaixo para adicionar novas questões:

### 1. Clonar o Repositório
Abra o terminal no seu computador e baixe o projeto:
```bash
git clone https://github.com/leo-gomes-dev/quiz-sql.git
```

### 2. Sincronizar com o Ambiente de Desenvolvimento
Mude para a branch `develop` (onde todas as implementações dos alunos se encontram):
```bash
git checkout develop
git pull origin develop
```

### 3. Criar uma Nova Branch para suas Questões
Crie uma ramificação própria usando as iniciais do seu recurso (Exemplo se for adicionar as Questões 4 e 5):
```bash
git checkout -b feat/questoes-4-e-5
```

### 4. Implementar e Enviar
Insira as suas perguntas no arquivo `public/index.html` seguindo o modelo padrão de tags do projeto. Após testar no navegador, salve as alterações:
```bash
git add .
git commit -m "feat: adiciona questoes 4 e 5 ao simulado"
git push origin feat/questoes-4-e-5
```

---

## Regra do Jogo para Ganhar Medalhas no GitHub
1. Após dar o `git push`, **não faça o merge direto**. Acesse o site do GitHub e abra um **Pull Request** tendo a branch `develop` como base de destino.
2. Marque um colega de equipe para fazer o **Code Review** (Revisão de Código) na aba *Files changed*.
3. O colega revisor deve analisar as perguntas, deixar feedbacks e clicar no botão **Approve**.
4. Somente após a aprovação visual no painel do GitHub, o merge na `develop` deve ser consolidar!

---

## 📚 Conteúdo Abordado no Quiz
- Mecanismos de exploração e concatenação de strings.
- Impacto de caracteres de comentário (`--`, `#`) em sistemas de autenticação.
- Mitigação e blindagem utilizando **Prepared Statements**.
