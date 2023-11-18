# Projeto Trybe Futebol Clube
## Este repositório contém o desenvolvimento do meu 25º projeto na Trybe

Este foi o último projeto do módulo de Backend e serviu para consolidar todos os conhecimentos adquiridos ao longo de meses de estudo!
A ideia aqui foi criar um site informativo sobre partidas e classificações de futebol! ⚽️  

Minha função era desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que elas funcionassem consumindo um banco de dados.
O backend estava dockerizado utilizando modelagem de dados através do Sequelize e minha API precisava ser consumida por um front-end já provido no projeto.

## Detalhes do projeto

Confira os requisitos exigidos pela Trybe (texto extraído dos readme oficial da Trybe):

> O projeto é composto de 4 unidades:

<details><summary>Detalhes</summary>
<p>


1️⃣ **Banco de dados:**
  - Será um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.

2️⃣ **Back-end:**
 - O ambiente onde foi realizada a maior parte das implementações exigidas.
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - Sua aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
 
3️⃣ **Front-end:**
  - O front já está concluído, não é necessário realizar modificações no mesmo. A única exceção será seu Dockerfile que precisará ser configurado.
  - Todos os testes a partir do requisito de login usam o `puppeteer` para simular uma pessoa acessando o site `http://localhost:3000/`;
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints construídos nos requisitos.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up`;

  </p>
</details>

---

**Crie os arquivos dockerfile:**

<details><summary>Detalhes</summary>
<p>

> As pastas `frontend/` e `backend/` devem possuir um arquivo `Dockerfile` cada, configurados corretamente para a aplicação começar a rodar.
> Neste projeto, **não utilizar** o comando [**USER**](https://docs.docker.com/engine/reference/builder/#user) e **não alterar o usuário** para `node`.

</p>
</details>

---

**1 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de times**

---

**2 - (`TDD`) Desenvolva testes que cubram no mínimo 5 por cento dos arquivos em `/app/backend/src`, com um mínimo de 7 linhas cobertas**

---

**3 - Desenvolva o endpoint `/teams` no back-end de forma que ele possa retornar todos os times corretamente**

<details><summary>Detalhes</summary>
<p>

> Deve ser uma rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  ...
]
```

</p>
</details>

---

**4 - (`TDD`) Desenvolva testes que cubram no mínimo 10 por cento dos arquivos em `/app/backend/src`, com um mínimo de 19 linhas cobertas**

---

**5 - Desenvolva o endpoint `/teams/:id` no back-end de forma que ele possa retornar dados de um time específico**

<details><summary>Detalhes</summary>
<p>

> Deve ser uma rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
{
  "id": 5,
  "teamName": "Cruzeiro"
}
```
</p>
</details>

---

<details>
  <summary><strong> PARA OS REQUISITOS 6 ATÉ 12: </strong></summary>

> A rota utilizada deve ser (`/login`);

> A rota deve receber os campos `email` e `password` e esses campos devem ser validados no banco de dados:
  - O campo `email` deve receber um email válido. Ex: `tfc@projeto.com`;
  - O campo `password` deve ter mais de 6 caracteres.
  - Além de válidos, é necessário que o email e a senha estejam cadastrados no banco para ser feito o login;

> O body da requisição deve conter o seguinte formato:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

</details>

---

**6 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de pessoas usuárias**

---

**7 - (`TDD`) Desenvolva testes que cubram no mínimo 15 por cento dos arquivos em `/app/backend/src`, com um mínimo de 25 linhas cobertas**

---

**8 - Desenvolva o endpoint `/login` no back-end de maneira que ele permita o acesso com dados válidos no front-end**

<details><summary>Detalhes</summary>
<p>

> A rota de ser do tipo `POST`;

> O avaliador verificará se é possível fazer o login com dados corretos e que, após o acesso, será redirecionado para a tela de jogos.

> O endpoint `/login` no back-end não deve permitir o acesso sem informar um email no front-end

> O endpoint `/login` no back-end não deve permitir o acesso sem informar uma senha no front-end

> As senhas que existem no banco de dados estão encriptadas.

> Se o login foi feito com sucesso, o resultado retornado deverá ser similar ao exibido abaixo, com um status http `200`:

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
    }
    ```

> Se o login não tiver o campo "email", o resultado retornado deverá ser a mensagem abaixo, com um status http `400`:

    ```json
    { "message": "All fields must be filled" }
    ```

> Se o login não tiver o campo "password", o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:

    ```json
    { "message": "All fields must be filled" }
    ```

</p>
</details>

---

**9 - (`TDD`) Desenvolva testes que cubram no mínimo 20 por cento dos arquivos em `/app/backend/src`, com um mínimo de 35 linhas cobertas**

---

**10 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso com um email não cadastrado ou senha incorreta no front-end**

<details><summary>Detalhes</summary>
<p>

> Se o login tiver o "email" **inválido** ou a "senha" **inválida**, o resultado retornado será similar ao exibido abaixo, com um status http `401`:

  ```json
    { "message": "Invalid email or password" }
  ```

> Sendo emails inválidos:
  - Emails com formato inválido: `@exemplo.com`, `exemplo@exemplo`, `exemplo@.com`, `exemplo.exemplo.com`;
  - Emails com formato válido, mas não cadastrados no banco;
> Sendo senhas inválidas:
  - Senhas com formato inválido: com um tamanho **menor** do que `6 caracteres`;
  - Senhas com formato válido, mas não cadastradas no banco;

</p>
</details>

---

**11 - (`TDD`) Desenvolva testes que cubram no mínimo 30 por cento dos arquivos em `/app/backend/src`, com um mínimo de 45 linhas cobertas**

---

**12 - Desenvolva um middleware de validação para o `token`, verificando se ele é válido, e desenvolva o endpoint `/login/role` no back-end de maneira que ele retorne os dados corretamente no front-end**

<details><summary>Detalhes</summary>
<p>

> Deve ser uma rota `GET` que receba um `header` com parâmetro `authorization`, onde ficará armazenado o token gerado no login;

> Será validado na API que não é possível retornar um objeto com o tipo de usuário, sem um token;

> Caso o token não seja informado, deve-se retornar, com um status `401`, a seguinte mensagem:

  ```json
  { "message": "Token not found" }
  ```

> Será validado na API que não é possível retornar um objeto com o tipo de usuário, com um token inválido

> Caso o token informado não seja válido, deve-se retornar, com um status `401`, a seguinte mensagem:

  ```json
  { "message": "Token must be a valid token" }
  ```

> O avaliador verificará se ao tentar bater na rota com um token válido, o mesmo retornará o tipo de usuário.

  A resposta deve ser de status `200` com um `objeto` contendo a `role` do *user*:
  ```json
    { "role": "admin" }
  ```

</p>
</details>

---

**13 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de partidas**

---

**14 - (`TDD`) Desenvolva testes que cubram no mínimo 45 por cento dos arquivos em `/app/backend/src`, com um mínimo de 70 linhas cobertas**

---

**15 - Desenvolva o endpoint `/matches` de forma que os dados apareçam corretamente na tela de partidas no front-end**

<details><summary>Detalhes</summary>
<p>

> A rota deve ser um `GET` e retorna uma lista de partidas;

> Será validado que a página apresentará todos os dados de partidas sem nenhum filtro.

---

**16 - Desenvolva o endpoint `/matches` de forma que seja possível filtrar somente as partidas em andamento, e também filtrar somente as partidas finalizadas, na tela de partidas do front-end**

<details><summary>Detalhes</summary>
<p>

> A rota deverá ser do tipo `GET` e retornar uma lista de partidas filtradas;

> Será validado que, ao escolher a opção de partidas em andamento, serão filtradas todas as partidas em andamento;

> Essa requisição deverá usar `query string` para definir o parâmetro:
    ex: `/matches?inProgress=true`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 41,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeamId": 6,
      "homeTeamGoals": 1,
      "awayTeamId": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Ferroviária"
      },
      "awayTeam": {
        "teamName": "Avaí/Kindermann"
      }
    }
  ]
  ```

> Será validado que, ao escolher a opção de partidas finalizadas, serão filtradas todas as partidas finalizadas;

> Essa requisição deverá usar `query string` para definir o parâmetro.
    ex: `/matches?inProgress=false`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Internacional"
      },
      "awayTeam": {
        "teamName": "Santos"
      }
    }
  ]
  ```

</p>
</details>

---

**17 - Desenvolva o endpoint `/matches/:id/finish` de modo que seja possível finalizar uma partida no banco de dados**

<details><summary>Detalhes</summary>
<p>

> A rota deve ser do tipo `PATCH`;

> Será recebido o `id` pelo parâmetro da URL;

> Será validado que não é possível alterar uma partida sem um token;

> Será validado que, ao finalizar uma partida, a alteração é feita no banco de dados e na página.

> Deve-se retornar, com um status `200`, a seguinte mensagem:

  ```json
  { "message": "Finished" }
  ```

</p>
</details>

---

**18 - Desenvolva o endpoint `/matches/:id` de forma que seja possível atualizar partidas em andamento**

<details><summary>Detalhes</summary>
<p>

> O endpoint deve ser do tipo `PATCH`;

> Será recebido o `id` pelo parâmetro da URL;

> Será validado que não é possível alterar uma partida sem um token;

> Será avaliado que é possível alterar o resultado de uma partida.

> O corpo da requisição terá o seguinte formato:

  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```

> Será avaliado que o endpoint responde à requisição com um status `200` e qualquer corpo.

</p>
</details>

---

**19 - (`TDD`) Desenvolva testes que cubram no mínimo 60 por cento dos arquivos em `/app/backend/src`, com um mínimo de 80 linhas cobertas**

---

**20 - Desenvolva o endpoint `/matches` de modo que seja possível cadastrar uma nova partida em andamento no banco de dados**

<details><summary>Detalhes</summary>
<p>

> A rota deverá ser do tipo `POST` e retornar a partida inserida no banco de dados;

> Será validado que não é possível inserir uma partida sem um token;

> Será validado que é possível salvar um jogo no banco de dados e ver o jogo na página de jogos;

> O corpo da requisição terá o seguinte formato:

  ```json
  {
    "homeTeamId": 16, // O valor deve ser o id do time
    "awayTeamId": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }
  ```

> Caso a partida seja inserida com sucesso, deve-se retornar os dados da partida, com _status_ `201`:

  ```json
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 8,
    "awayTeamGoals": 2,
    "inProgress": true
  }
  ```

</p>
</details>

---

**21 - Desenvolva o endpoint `/matches` de forma que não seja possível inserir uma partida com times iguais nem com um time que não existe na tabela de times**

<details><summary>Detalhes</summary>
<p>

> Será validado que não é possível inserir uma partida em que o `homeTeam` e o `awayTeam` sejam iguais, por exemplo: Barcelona x Barcelona;

  - Caso isso ocorra, deve-se retornar, com um status `422`, a seguinte mensagem:

  ```json
  { "message": "It is not possible to create a match with two equal teams" }
  ```

> Será validado que não é possível inserir uma partida com um time que não existe na tabela teams;

  - Caso algum dos times não esteja cadastrado no banco de dados, deve-se retornar, com um status `404,` a seguinte mensagem:

  ```json
  { "message": "There is no team with such id!" }
  ```

</p>
</details>

---

<details>
  <summary><strong> REGRAS DE CLASSIFICAÇÃO </strong></summary>

> Para construir a classificação dos times, devem ser seguidas as seguintes regras de negócios:

    - `Classificação`: Posição na classificação;
    - `Time`: Nome do time;
    - `P`: Total de Pontos;
    - `J`: Total de Jogos;
    - `V`: Total de Vitórias;
    - `E`: Total de Empates;
    - `D`: Total de Derrotas;
    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos;
    - `SG`: Saldo total de gols;
    - `%`: Aproveitamento do time.

> Para calcular o `Total de Pontos`, você deve levar em consideração que:

    - O time `vitorioso`: marcará +3 pontos;
    - O time `perdedor`: marcará 0 pontos;
    - Em caso de `empate`: ambos os times marcam +1 ponto.

> Para o campo `Aproveitamento do time (%)`, que é a porcentagem de jogos ganhos, use a seguinte fórmula: `[P / (J * 3)] * 100`, onde:

    - `P`: Total de Pontos;
    - `J`: Total de Jogos.

    Obs.: O seu resultado deverá ser limitado a `duas casas decimais`.

> Para calcular `Saldo de Gols` use a seguinte fórmula: `GP - GC`, onde:

    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos.

  - O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no `Total de Pontos`, você deve levar em consideração os seguintes critérios para desempate:

  - 1º Total de Vitórias;
  - 2º Saldo de gols;
  - 3º Gols a favor;

</details>

---

**22 - (`Bônus`; `TDD`) Desenvolva testes que cubram no mínimo 80 por cento dos arquivos em `/app/backend/src`, com um mínimo de 100 linhas cobertas**

---

**23 - Desenvolva o endpoint `/leaderboard/home` de forma que retorne as informações do desempenho dos times da casa com as seguintes propriedades: `name`, `totalPoints`, `totalGames`, `totalVictories`, `totalDraws`, `totalLosses`, `goalsFavor` e `goalsOwn`**

<details><summary>Detalhes</summary>
<p>

> O endpoint deverá ser do tipo `GET`;

> Será avaliado que ao fazer a requisição ao endpoint `/leaderboard/home` serão retornados os campos e valores corretos, considerando os dados iniciais do banco de dados;

  - **Não** será avaliada a ordenação dos dados;

  - Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.

</p>
</details>

---

**24 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados, incluindo as propriedades `goalsBalance` e `efficiency`, além das propriedades do requisito anterior**

<details><summary>Detalhes</summary>
<p>

> O endpoint deverá ser do tipo `GET`;

> Será avaliado que ao fazer a requisição ao endpoint `/leaderboard/home` serão retornados os campos e valores corretos, considerando os dados iniciais do banco de dados;

> Será avaliado se os dados estão ordenados conforme as regras de negócio definidas;

> Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.

</p>
</details>

---

**25 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional**

> Será avaliado que após acrescentar a partida Corinthians 2 X 1 Internacional e fazer a requisição ao endpoint `/leaderboard/home`, serão retornados os campos e valores corretos.

> Será avaliado se os dados estão ordenados conforme as regras de negócio definidas.

</p>
</details>

---

## Sobre o curso da Trybe
O programa total de estudo conta com mais de 1.500 horas de aulas presenciais e online,divididas ao longo de 12 meses. O conteúdo aborda introdução ao desenvolvimento de software, front-end, back-end, ciência da computação, engenharia de software, metodologias ágeis e habilidades comportamentais.
