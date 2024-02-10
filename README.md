Aplicação criada com o intuito de publicar enquetes e votar em cada categoria

#Ferramentas utilizadas para o desenvolvimento da aplicação
- Nodejs
- Fastify
- Fastify websocket
- Redis
- Prisma
- Postgress
- Zod
- Typescript

Para iniciar o projeto instale as dependecias usando o comando 
```
npm install ou npm i
```

Rode o comando abaixo para baixar as imagens do docker e criar os containers
```
docker compose up -d ou docker compose up
```

Rode o comando do prisma para criar as tabelas no seu banco de dados do container do docker
```
npx prisma migrate dev
```

Para iniciar a aplicação execute o comando abaixo
```
npm run dev
```
