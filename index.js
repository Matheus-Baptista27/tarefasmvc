const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();
const sequelize = require('./models/database');
const taskRoutes = require('./routes/taskRoutes');

// Configuração do Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares do Express
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Rotas
app.use(taskRoutes);

// Sincronizar banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
