'use strict';
const Agent = require("../models/").Agent;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transmitions', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
    },
      date: {
        type: Sequelize.DATE
      },
      agent_id: {
        type: Sequelize.UUID,
        references: {
          model: Agent, 
          key: 'id'
        }
      },
      dossierId:{
        type: Sequelize.UUID,
        onDelete:"CASCADE",
        references:{
          model:"Dossier",
          key:"id"
        }
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
    await queryInterface.dropTable('Transmitions');
  }
};