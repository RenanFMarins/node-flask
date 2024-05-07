const express = require('express');
const cors = require("cors");
const path = require("path");

require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');

const userRoutes = require('./routes/userRoutes'); 
const app = express();

const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware para aceitar JSON
app.use('/users', userRoutes);

app.use(express.static(path.join(__dirname, "../")));

app.get("/login", (req, res) => {
    const loginPagePath = path.join(__dirname, "/login.html");
    res.sendFile(loginPagePath);
});
// Rota de teste
app.get('/', (req, res) => {
  res.send('HOME');
});

// Iniciar o servidor
app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
});
