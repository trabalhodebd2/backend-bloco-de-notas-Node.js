const express = require("express");
const cors = require("cors");
require('dotenv').config();

const routes = require("./src/routes");

const app = express();

app.use(express.json());
app.use(cors());
// app.use(routes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Aplicação rodando em http://localhost:${port}`));