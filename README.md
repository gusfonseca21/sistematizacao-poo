# Sistematização para Programação Orientada a Objetos - Controle de Reclamações

## Requisitos

- **Java 17**
- **Banco de Dados MySQL**
  - Nome do Banco: `sistematizacao`
  - Nome da tabela: `complaints`

### Colunas da tabela:

- **id**: int; Não nulo; Auto Incremento; Chave primária
- **name**: varchar(50); Não Nulo
- **phone**: varchar(11); Não Nulo
- **description**: varchar(200); Não Nulo
- **code**: varchar(5); Não Nulo
- **solution**: varchar(200); Não Nulo

## Configurações de Conexão com o Banco de Dados

```
spring.datasource.url=jdbc:mysql://localhost:3306/sistematizacao
spring.datasource.username="NOME DE USUARIO DO BANCO DE DADOS"
spring.datasource.password="SENHA DO BANCO DE DADOS"
```


## Rodando o Servidor:

1. Clone o repositório na sua máquina
2. Resolva as dependências com o Maven
3. Crie um banco de dados MySQL com o nome "sistematizacao" e crie uma tabela chamada "complaints" com os requisitos acima
4. Conecte o banco adicionando as configurações de conexão com o banco acima, adicionando-as em `/src/main/resources/application.properties`
5. Inicie o projeto SpringBoot em `/src/main/java/SitematizacaoPooApplication.java`
6. Rode o front-end executando o arquivo `index.html` (`/src/view/index.html`) no navegador.
