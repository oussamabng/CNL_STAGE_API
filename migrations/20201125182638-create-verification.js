'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Verifications', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
    },
    agent_verificateur:{
      type:Sequelize.UUID,
      references:{
        model:"Agents",
        key:"id"
      }
    },
    date_debut_verification:{
      type: Sequelize.DATE
    },
    is_piece_manque:{
      type: Sequelize.BOOLEAN
    },
    is_dossier_avec_reserve:{
      type: Sequelize.BOOLEAN
    },
    is_dossier_bloque:{
      type: Sequelize.BOOLEAN
    },
    date_fin_verification:{
      type: Sequelize.DATE
    },
    dossierId:{
      type: Sequelize.UUID,
      onDelete:"CASCADE",
      references:{
        model:"Dossiers",
        key:"id"
      }
    },
    date_bloque:{
      type: Sequelize.DATE
    },
    date_debloque:{
      type: Sequelize.DATE
    },
    agent_debloqueur:{
      type: Sequelize.UUID,
      onDelete:"CASCADE",
      references:{
        model:"Agents",
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
    await queryInterface.dropTable('Verifications');
  }
};