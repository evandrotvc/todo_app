# TODO app

## Instalando projeto

É necessário ter Docker e docker-compose. A aplicação roda o banco e o server tudo em docker.

Para instalar o projeto, siga estas etapas:

Setando o .env
```
copie o arquivo .env.test com o nome .env
```
depois rode
```
docker compose build
```

depois rode
```
docker compose up
```

Se tudo foi instalado com sucesso, estará rodando os containers postgres(port: 5432) e o server(port: 3000).
Agora é possível realizar os testes se todos os containers executaram corretamente


Rodando o front, basta entrar na pasta /front, instalar as dependências e rodar
```
yarn
```

e depois rode
```
yarn start
```

## Tests

No terminal, caso queira rodar os testes, basta entrar no container e rodar o comando a seguir.
```
docker exec -it app bash
```
e depois:
```
rspec
```