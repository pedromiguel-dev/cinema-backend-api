# Cinema backend api

## Description

This is a backend api for a cinema app. It is built with node express and prisma. It is a REST api that allows users to create, read, update and delete movies, sessions and theatres. It also allows users to create, read, update and delete their bought sessions.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev
    
# production mode
$ npm run start
```

## Environment variables

```bash
# .env

DATABASE_URL= # Your database url, 
# make sure to modify the prisma schema to match your database
ACCESS_TOKEN_SECRETE= # Your jwt secret
REFRESH_TOKEN_SECRETE= # Your jwt secret

```
## API Documentation

```bash
# Swagger
$ http://localhost:8090/api/v1
```

## Stay in touch
    
- Author - [pedromiguel-dev](http://github.com/pedromiguel-dev)
- Twitter - [Quem amou?🏳️‍🌈](https://twitter.com/PrincesaSofiaQA)
- LinkedIn - [ Pedro Miguel (ele/dele) ](https://www.linkedin.com/in/pedro-miguel-276525207/)
```
