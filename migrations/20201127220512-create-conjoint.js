'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Conjoints', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
    },
    first_name:{
      type: Sequelize.STRING,
  },
  last_name:{
      type: Sequelize.STRING,
  },
  first_name_father:{
      type: Sequelize.STRING,
  },
  first_name_mother:{
      type: Sequelize.STRING,
  },
  last_name_mother:{
      type: Sequelize.STRING,
  },
  place_of_birth:{
      type: Sequelize.STRING
  },
  date_of_birth:{
      type:Sequelize.DATE
  },
  gender:{
      type: Sequelize.ENUM,
      values:["M","F"]
  },
  phone1:{
      type: Sequelize.STRING,
      validate:{
          is:/^[0-9]{10}/i
      }
  },
  phone2:{
      type: Sequelize.STRING,
      validate:{
          is:/^[0-9]{10}/i
      }
  },
  email:{
      type:Sequelize.STRING,
      validate:{
          isEmail:true
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
    await queryInterface.dropTable('Conjoints');
  }
};