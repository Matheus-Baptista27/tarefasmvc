
const express = require('express');
const router = express.Router();
//const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const taskController = require('../controllers/taskController');

// Rota para listar todas as tarefas
router.get('/tasks', taskController.index);

// Rota para exibir o formulário de criação de tarefa
router.get('/tasks/new', taskController.create);

// Rota para criar uma nova tarefa
router.post('/tasks', taskController.store);

// Rota para exibir o formulário de edição de tarefa
router.get('/tasks/:id/edit', taskController.edit);

// Rota para atualizar uma tarefa
router.put('/tasks/:id', taskController.update);

// Rota para exibir uma tarefa específica
router.get('/tasks/:id', taskController.show);

// Rota para deletar uma tarefa
router.delete('/tasks/:id', taskController.destroy);


module.exports = router;
