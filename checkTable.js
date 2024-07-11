const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH,
});

(async () => {
  try {
    const result = await sequelize.query("PRAGMA table_info(Tasks);");
    console.log(result);
  } catch (error) {
    console.error('Erro ao verificar a tabela:', error);
  } finally {
    await sequelize.close();
  }
})();
