require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Configuração do App
const app = express();
app.use(express.json());

// Configuração do Banco de Dados
mongoose.connect(process.env.MONGODB_URL);
const Tarefa = require("./models/tarefas");

// Rotas
// Inserção de Tarefa (POST)

app.post("/tarefas", async (req, res) => {  
    try {
        // Criando um novo documento no MongoDB
        const tarefa = new Tarefa(req.body);
        await tarefa.save();
        res.status(201).json(tarefa);

    } 
    
    catch (err) {
        console.log(err);
        res.status(500).json("Um erro aconteceu");
    }
});
// Listagem de todas as Tarefas (GET)

app.get("/tarefas", async (req, res) => {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
});

// Listagem de uma Tarefa (GET)

app.get("/tarefas/:id", async (req, res) => {
    try {
        const { id } = req.params
        const tarefa = await Tarefa.findById(id);
        if (tarefa) {
            res.json(tarefa);
        } else {
            res.status(404).json({ message: "Tarefa não encontrada"})
        }
    }

    catch (err) {
        console.log(err);
        res.status(500).json("Um erro aconteceu");
    }
});

// Atualização de uma Tarefa (PUT)

app.put("/tarefas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, status } = req.body;

        const atualizarTarefa = await Tarefa.findByIdAndUpdate(id, { titulo, descricao, status });

        if (atualizarTarefa) {
            res.json(atualizarTarefa);
        } else {
            res.status(404).json({ message: "Tarefa não encontrada"})
        }
    }

    catch (err) {
        console.log(err);
        res.status(500).json("Um erro aconteceu");
    }
});

// Remoção de uma Tarefa (DELETE)

app.delete("/tarefas/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletarTarefa = await Tarefa.findByIdAndDelete(id);

        if (deletarTarefa) {
            res.json({ message: "Tarefa excluída"});
        } else {
            res.status(404).json({ message: "Tarefa não encontrada"})
        }
    }

    catch (err) {
        console.log(err);
        res.status(500).json("Um erro aconteceu");
    }
});

// Escuta de eventos
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});
