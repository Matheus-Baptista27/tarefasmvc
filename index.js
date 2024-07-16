const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();
const sequelize = require('./models/database');
const taskRoutes = require('./routes/taskRoutes');

// Configuração do Express
const app = express();
const PORT = process.env.PORT || 3000;

// Verifica e cria o diretório 'public/uploads' se não existir
const uploadsDir = 'public/uploads';

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuração do multer para armazenar os arquivos no diretório 'public/uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Renomeia o arquivo com a data atual para evitar conflitos
    }
});

const upload = multer({ storage: storage });

// Middlewares do Express
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Rota para criar uma nova tarefa com upload de imagem
app.post('/tasks', upload.single('image'), async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const task = await Task.create({ title, description, date, image });
        res.redirect('/tasks');
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Erro ao criar a tarefa');
    }
});

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

