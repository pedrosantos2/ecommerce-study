# Stock Control App

Este projeto é um **sistema de controle de estoque** composto por duas aplicações:

1. **Backend** em Spring Boot (Java 21) para gerenciar autenticação JWT, produtos e categorias.
2. **Frontend** em Angular (Node 20) para interface do usuário, incluindo login, cadastro, listagem, busca e paginação.

O banco de dados (PostgreSQL) é executado em um container Docker e gerenciado via Docker Compose.

---

## Tecnologias

* **Java 21**
* **Spring Boot**
* **PostgreSQL** (imagem oficial Docker)
* **Angular** (v18+)
* **Node.js 20**
* **Tailwind CSS**
* **JWT** para autenticação

---

## Pré-requisitos

* Docker & Docker Compose
* Java 21 (JDK 21)
* Node.js 20.x
* npm (gerenciador de pacotes do Node)
* Angular CLI (opcional)

---

## Estrutura do repositório

```
root/
├── backend/               # Aplicação Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile         # Para empacotar como imagem Java
├── frontend/              # Aplicação Angular
│   ├── src/
│   ├── package.json
│   └── tailwind.config.js
├── docker-compose.yml     # Banco de dados PostgreSQL
└── README.md              # Este arquivo
```

---

## Banco de Dados (Docker Compose)

1. Edite, se necessário, as credenciais em `docker-compose.yml`.

2. Suba o container:

   ```bash
   docker-compose up -d
   ```

3. Isso criará um container **PostgreSQL** na porta `5432` com um database e usuário configurados.

---

## Backend (Spring Boot)

1. Certifique-se de ter **Java 21** instalado:

   ```bash
   java -version
   ```
2. Entre na pasta `backend/`:

   ```bash
   cd backend
   ```
3. Ajuste as propriedades de conexão em `application.properties` (usuário, senha, URL do DB).
4. Compile e execute:

   ```bash
   mvn clean package
   java -jar target/*.jar
   ```

Ou, para desenvolvimento direto pelo Spring Boot:

```bash
mvn spring-boot:run
```

O backend ficará disponível em `http://localhost:8080`.

---

## Frontend (Angular)

1. Certifique-se de ter **Node.js 20** e **npm**:

   ```bash
   node -v   # deve ser v20.x
   npm -v
   ```
2. Entre na pasta `frontend/`:

   ```bash
   cd frontend
   ```
3. Instale dependências:

   ```bash
   npm install
   ```
4. Execute a aplicação:

   ```bash
   npm start
   ```

O frontend rodará em `http://localhost:4200` e consumirá a API em `http://localhost:8080`.

---

## Fluxo de Autenticação

1. Acesse `/login` para obter o **JWT**.
2. Após login, o token é armazenado no `localStorage`.
3. Rotas protegidas usam um **AuthGuard** que verifica o token.
4. O **AuthInterceptor** injeta o header `Authorization: Bearer <token>` em todas as requisições HTTP.

---

## Cadastro de Usuário

* Endpoint: `POST /auth/register`
* Payload JSON:

  ```json
  {
    "username": "seu_usuario",
    "email": "email@dominio.com",
    "password": "sua_senha"
  }
  ```
* Em caso de sucesso, retorna **201 Created**.

---

## Produtos e Categorias

* **GET** `/home/produtos`          → lista todos os produtos

* **POST** `/home/produtos`         → cria um produto

* **PUT** `/home/produtos/{id}`     → atualiza um produto

* **DELETE** `/home/produtos/{id}`  → exclui um produto

* **GET** `/home/categorias`        → lista todas as categorias

* **POST** `/home/categorias`       → cria uma categoria

* **PUT** `/home/categorias/{id}`   → atualiza uma categoria

* **DELETE** `/home/categorias/{id}`→ exclui uma categoria

---

## Métricas de Acesso

* **GET** `/home/metrics/accessCount` → retorna `{ "count": <número de acessos> }`

---

## Observações Finais

* Ajuste `docker-compose.yml` e `application.properties` conforme seu ambiente.
* Para produção, proteja suas chaves (`jwt.secret`) e ajuste `spring.profiles`.
* Sinta-se à vontade para aprimorar a UI, adicionar filtros e relatórios.

---

**Boas implementações!**
