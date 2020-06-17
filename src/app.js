const express = require("express");
const {uuid, isUuid} = require('uuidv4');
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const likes = [];

app.get("/repositories", (request, response) => {
  // TODO
  const { title, url, techs} = request.body;
  const repositories ={id:uuid(), tile:"desafio nodejs", url:"https://github.com/ernestopmaria/gostack-template-conceitos-nodejs"}
});

app.post("/repositories", (request, response) => {
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
