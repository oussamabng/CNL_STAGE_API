'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Listes', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
      },
      ref: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      nbr_postulant: {
        type: Sequelize.NUMBER
      },
      code_project: {
        type: Sequelize.STRING
      },
      num_accuse: {
        type: Sequelize.STRING
      },
      date_accuse: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Listes');
  }
};