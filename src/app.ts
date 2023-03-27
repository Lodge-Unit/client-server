import express, { Express, urlencoded } from "express";
import { graphqlHTTP } from "express-graphql";
import http from "http";
import cors from "cors";
import { connectDatabase } from "./config";
import dotenv from "dotenv";
import schema from "./schemas";
import { graphqlUploadExpress } from "graphql-upload-minimal";

dotenv.config();
const app: Express = express();

// Connect Database
connectDatabase();

// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(
  `/api/${process.env.API_VERSION}`,
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => res.send("Server Connected 😄"));

// const PORT: number | string = process.env.PORT;
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT} 🚀`);
});
