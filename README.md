# HandyVolunteers - Back-end

Para rodar o back-end, é necessário possuir o NodeJS instalado na máquina.

Ao pegar o repositório, vá ao diretório do projeto e execute o seguinte comando (para instalar as dependências)

```bash
npm install
```

Em seguinda, já é possível executar o projeto.

```bash
npm run start:dev
```

## Variáveis de ambiente

Por medidas de praticidade e segurança, uma variável de ambiente foi criada para apontar para configurar a API, porém, para configurar, é bem simples. 

Na RAIZ do projeto (onde há as pastas /src, /migrations, /node_modules), crie um arquivo chamado ".env". Em seguinda, dentro dele, cole o seguinte valor

```
DB_LOCAL_DIALECT="sqlite"
DB_STORAGE="./database.db"
```

Isto configurará as variáveis de ambiente e o banco de dados local (em SQLite) para o ambiente rodar sem problemas.

Caso queira testar unicamente o back-end, dentro deste repositório, um arquivo chamado insomnia.json estará disponível para importar no Insomnia, caso deseje testar somente as chamadas.

Para acessar o back-end, após iniciar o projeto, ele se encontrará no [localhost na porta 3001 (localhost:3001)](http://localhost:3001).