const { response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customersAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customersAlreadyExists) {
    return response.status(400).json({ error: "Usúario já cadastrado!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

app.get("/account", (request, response) => {
    return response.json(customers)
})

app.listen(3333);
