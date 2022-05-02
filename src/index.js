const { response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];


// Middleware
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;


    const customer = customers.find((customer) => customer.cpf === cpf);


    if (!customer) {
        return response.status(400).json({ error: "Cliente não encontrado!" });
    }

    request.customer = customer;

    return next();
}

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

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    return response.json(customer.statement);
});

app.get("/account", (request, response) => {
    return response.json(
        customers.map((customer) => ({ id: customer.statement }))
    );
})

app.listen(3333);