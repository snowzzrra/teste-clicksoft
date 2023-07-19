
# Teste Clicksoft - CRUD API AdonisJS

Uma API de um CRUD usando NodeJS e AdonisJS, com o banco de dados sendo PostgreSQL. A API simula o CRUD de uma escola, constando aluno, professor e salas, assim como relações entre os objetos.


## Instalação

1. Baixe os arquivos nesse repositório, instale o [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) e configure ele como desejar **e se lembre da senha, usuário e porta colocados!**

2. Instale o Adonis usando o npm:
```bash
npm i -g @adonisjs/cli
```

3. No arquivo .env.example, altere-o dessa forma e remova o ".example" do seu nome:
```
HOST=127.0.0.1
PORT=3333
NODE_ENV=development
APP_NAME=AdonisJs
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=MOih5uHwkhGzj7IlCf8e60FPPm8Y3qRx
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=SUA PORTA DO POSTGRES (default: 5432)
DB_USER=SEU USER DO POSTGRES (default: postgres)
DB_PASSWORD= SUA SENHA DO POSTGRES
DB_DATABASE=postgres
HASH_DRIVER=bcrypt
```

4. Quando o arquivo estiver corretamente alterado e com o nome .env, rode no terminal do código (no diretório /crud) esse comando:

```powershell
adonis migration:run
```

5. Com tudo isso feito, o projeto já está configurado e pronto para uso, faltando apenas abrir o servidor do Adonis com esse comando:

```powershell
adonis serve --dev
```

6. Tudo pronto! Agora só usar sua ferramenta de escolha para lançar requisições HTTP.
    
## Documentação da API

Rotas em [Arquivo JSON](/crud-clicksoft-insomnia.json) do Insomnia.



## Stack utilizada

**Back-end:** Node, Adonis

**Database:** Postgre


## Autores

- [Guiherme Paim Motta](https://github.com/snowzzrra)

