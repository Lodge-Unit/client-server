import express, { Express, urlencoded } from "express";
import { graphqlHTTP } from 'express-graphql'; 
import http from "http";
import cors  from "cors"
import {connectDatabase} from "./config"
import dotenv from "dotenv"
import schema from "./schemas"

dotenv.config()

const app: Express = express();

// Connect Database
connectDatabase()

// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }))

app.use(`/api/${process.env.API_VERSION}`, graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT: number | string = process.env.PORT || 5000
const server = http.createServer(app);
server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT} 🚀`)
})