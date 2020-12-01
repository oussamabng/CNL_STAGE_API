'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RevenueRejets', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
      },
      date_rejet_revenue: {
        type: Sequelize.DATE
      },
      rejet_revenue: {
        type: Sequelize.BOOLEAN
      },
      agent_revenue: {
        type: Sequelize.UUID,
        references:{
          model:"Agent",
          key:"id"
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
    await queryInterface.dropTable('RevenueRejets');
  }
};