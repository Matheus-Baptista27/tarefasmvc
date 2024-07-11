const Task = require('../models/Task');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.index = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.render('tasks/index', { tasks });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.show = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    res.render('show', { task });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.create = async (req, res) => {
  res.render('tasks/new');
};

exports.store = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { title, description, date } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;
      await Task.create({ title, description, date, image });
      res.redirect('/tasks');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
];

exports.edit = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    res.render('tasks/edit', { task });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.update = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { title, description, date } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : req.body.currentImage;
      await Task.update({ title, description, date, image }, {
        where: { id: req.params.id }
      });
      res.redirect('/tasks');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
];

exports.destroy = async (req, res) => {
  try {
    await Task.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/tasks');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
