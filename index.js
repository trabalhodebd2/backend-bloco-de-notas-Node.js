const express = require("express");
const cors = require("cors");

require('dotenv').config();
require('express-async-errors');

const routes = require("./src/routes");

const errorHandling = (err, req, res, next) => {
    res.status(500).json({
      msg: err.message,
      success: false,
    });
};

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandling);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Aplicação rodando em http://localhost:${port}`));