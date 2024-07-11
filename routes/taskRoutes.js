// taskRoutes.js

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const taskController = require('../controllers/taskController');

// Rota para listar todas as tarefas
router.get('/tasks', taskController.index);

// Rota para exibir o formulário de criação de tarefa
router.get('/tasks/new', ensureAuthenticated, taskController.create);

// Rota para criar uma nova tarefa
router.post('/tasks', ensureAuthenticated, taskController.store);

// Rota para exibir o formulário de edição de tarefa
router.get('/tasks/:id/edit', ensureAuthenticated, taskController.edit);

// Rota para atualizar uma tarefa
router.put('/tasks/:id', ensureAuthenticated, taskController.update);

// Rota para exibir uma tarefa específica
router.get('/tasks/:id', taskController.show);

// Rota para deletar uma tarefa
router.delete('/tasks/:id', ensureAuthenticated, taskController.destroy);

// Rota para a página de login
router.get('/login', (req, res) => {
  res.render('login'); // Certifique-se de que 'login.ejs' existe na pasta 'views'
});

module.exports = router;
