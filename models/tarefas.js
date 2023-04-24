const { model, Schema } = require("mongoose");

const Tarefa = model("tarefa", // Nome do modelo (base p/ coleção)
new Schema( // Validação do documento
    {
        titulo: {
            type: String, // string, number, boolean
            required: true
        },

        descricao: {
            type: String, 
            required: true
        },

        status: {
            type: String,
            required: true,
            default: "Pendente"
        }
    }
));

module.exports = Tarefa;