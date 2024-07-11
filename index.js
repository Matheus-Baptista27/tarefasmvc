const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();
const sequelize = require('./models/database');
const taskRoutes = require('./routes/taskRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

// Configuração do Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração da sessão
app.use(session({
    secret: 'secretpassword', // Defina uma chave secreta para assinar a sessão
    resave: false,
    saveUninitialized: false
}));

// Configuração do Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Definir estratégia de autenticação local (exemplo)
passport.use(new LocalStrategy(
    (username, password, done) => {
        // Implementar lógica de autenticação aqui
        // Exemplo simplificado:
        if (username === 'admin' && password === 'password') {
            return done(null, { id: 1, username: 'admin' });
        } else {
            return done(null, false);
        }
    }
));

// Serialização e desserialização do usuário (exemplo)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Recuperar informações do usuário do banco de dados, se necessário
    done(null, { id: id, username: 'admin' });
});

// Middlewares do Express
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views/', path.join(__dirname, 'views'));

// Middleware de autenticação
const { ensureAuthenticated } = authMiddleware;

// Rotas de autenticação
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/tasks', // Redireciona para as tarefas após o login
    failureRedirect: '/login', // Redireciona de volta para o login em caso de falha
}));

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

// Rotas das tarefas protegidas
app.use('/tasks', ensureAuthenticated, taskRoutes);

// Sincronizar banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
