'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Agents', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
      },
      email:{
        type:Sequelize.STRING,
    },
    username:{
        type: Sequelize.STRING,
    },
    password:{
        type: Sequelize.STRING
    },
    is_active:{
      type:Sequelize.BOOLEAN,
      defaultValue:true
    },
    is_admin:{
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Agents');
  }
};