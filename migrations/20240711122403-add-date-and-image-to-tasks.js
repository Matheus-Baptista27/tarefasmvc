'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar se a coluna "date" já existe
    const tableInfo = await queryInterface.describeTable('Tasks');
    if (!tableInfo.date) {
      await queryInterface.addColumn('Tasks', 'date', {
        type: Sequelize.DATE,
        allowNull: false,
      });
    } else {
      console.log('Coluna "date" já existe');
    }

    // Verificar se a coluna "image" já existe
    if (!tableInfo.image) {
      await queryInterface.addColumn('Tasks', 'image', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    } else {
      console.log('Coluna "image" já existe');
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'date');
    await queryInterface.removeColumn('Tasks', 'image');
  }
};
