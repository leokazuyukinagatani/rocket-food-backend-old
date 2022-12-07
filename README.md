[Tecnologias](#-stack-utilizada) |
[Como Executar](#-rodando-localmente) |
[Projeto](#-stack-utilizada) |
[Testes](#-rodando-os-testes) |
[Documentação](#-documentação-da-api)  |
[Next Level](#-melhorias) 

![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


# Rocket Food

E-commerce para restaurantes desenvolvido como projeto final do curso Explorer da Rocketseat.

## Funcionalidades
### Usuário
- criar usuário ✅
- buscar usuário por email ✅
- colocar foto de perfil 

### Autenticação
- JWT ✅

### ACL
- criar role ✅
- criar permissão ✅
- atribuir roles e permissões a um usuário ✅

### Produto
- criar produto ✅
- deletar produto ✅
- listar produtos ✅
- atualizar produto ✅
- favoritar um produto
- colocar foto do produto

### Categoria
- criar categoria  ✅
- listar categorias 

### Ingredientes
- criar ingrediente
- deletar ingrediente
- listar ingredientes
- atualizar ingrediente
- colocar foto do ingrediente

### Pedido
- criar pedido
- listar pedidos


## Stack utilizada

**Back-end:** Node, Express

## Roadmap
  - Setup(Express, Prisma)
  - Criação do Banco de dados
  - Criação do Diagram ERD

## Rodando localmente

Clone o projeto

```bash
  git clone https://link-para-o-projeto
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Documentação da API

#### Retorna todos os itens

```http
  GET /api/items
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/items/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### add(num1, num2)

Recebe dois números e retorna a sua soma.


## Entidades

![Logo](./prisma/ERD.svg)


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`API_KEY`

`ANOTHER_API_KEY`


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Melhorias

Que melhorias você fez no seu código? Ex: refatorações, melhorias de performance, acessibilidade, etc


## Aprendizados

O que você aprendeu construindo esse projeto? Quais desafios você enfrentou e como você superou-os?


## Suporte

Para suporte, mande um email para fake@fake.com ou entre em nosso canal do Slack.